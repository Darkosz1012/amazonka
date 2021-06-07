import { Category, Distance, Score, Series } from "$/db/index.js";
import { verifyRequest } from "$/auth/auth.js";
import crypto from "crypto";

export default {
    addScore: async (_, args, context) => {
        verifyRequest(context.req);

        let score = createNewScore(args);

        let distances = await getDistancesFromCategory(args.category_id);
        addDistancesToScore(distances, score);

        await createAllSeries(args.participant_id, args.category_id, distances);

        try {
            await score.save();
        } catch (err) {
            Series.deleteMany({
                participant_id: args.participant_id,
                category_id: args.category_id,
            });

            throw new Error("Couldn't add score.");
        }
        return score;
    },

    updateScore: async (_, args, context) => {
        verifyRequest(context.req);

        return Score.findByIdAndUpdate(args._id, args);
    },

    deleteScore: async (_, args, context) => {
        verifyRequest(context.req);

        return Score.findOneAndDelete(args);
    },

    updateSeries: async (_, args, context) => {
        verifyRequest(context.req);

        if (args.arrows !== undefined) {
            args.score = 0;
            args.Xs = 0;
            args.tens = 0;
            for (let arrow of args.arrows) {
                countArrow(arrow);
            }
        }

        return Series.findByIdAndUpdate(args._id, args, {
            new: true,
        });

        function countArrow(arrow) {
            if (arrow === "X") {
                args.score += 10;
                args.Xs++;
            } else if (arrow === "10") {
                args.score += 10;
                args.tens++;
            } else if (arrow === "M") {
            } else {
                args.score += parseInt(arrow);
            }
        }
    },

    saveScoresFromSeries: async (_, args, context) => {
        verifyRequest(context.req);

        let scores = await Score.find({
            category_id: args.category_id,
        });

        for (let score of scores) {
            await updateScoreFromSeries(score, args.distance_id);
            await score.save();
        }

        return scores;
    },

    generatePlacements: async (_, args, context) => {
        verifyRequest(context.req);

        let category = await Category.findById(args.category_id);
        let scores = await Score.find(args);

        let startStand = category.start_stand;
        let endStand = category.end_stand;

        let pos = startStand;
        let order = "A".charCodeAt(0);

        for (let score of scores) {
            score.stand = pos;
            score.order = String.fromCharCode(order);
            score.save();

            pos = pos + 1;
            if (pos > endStand) {
                pos = startStand;
                order = order + 1;
            }
        }

        return scores;
    },
};

function createNewScore(args) {
    return new Score({
        ...args,
        distances: [],
        pre_elimination_score: 0,
        access_code: generateCode(),
    });
}

async function getDistancesFromCategory(category_id) {
    let category = await Category.findById(category_id);
    return category.distances;
}

function addDistancesToScore(distances, score) {
    for (let distance of distances) {
        addDistanceToScore(score, distance);
    }

    function addDistanceToScore(score, distance) {
        score.distances.push({
            distance_id: distance.distance_id,
            name: distance.name,
            score: 0,
        });
    }
}

async function createAllSeries(participant_id, category_id, distances) {
    for (let d of distances) {
        let distance = await Distance.findById(d.distance_id);
        for (let i = 0; i < distance.series_type; i++) {
            await createSeries(distance._id, i);
        }
    }

    async function createSeries(distance_id, series_no) {
        await Series.create({
            participant_id,
            category_id,
            distance_id,
            series_no,
            was_counted: false,
            score: 0,
            arrows: [],
            pre_elimination_score: 0,
        });
    }
}

async function updateScoreFromSeries(score, distance_id) {
    clearScore();

    let allSeries = await Series.find({
        distance_id,
        participant_id: score.participant_id,
    });

    for (let series of allSeries) {
        countSeries(series);
    }

    sumPreEliminationScore();

    function clearScore() {
        for (let distance of score.distances) {
            distance.score = 0;
        }
    }

    function countSeries(series) {
        for (let distance of score.distances) {
            if (distance.distance_id.toString() === distance_id) {
                addSeriesToScore(distance, series);
            }
        }

        function addSeriesToScore(distance, series) {
            distance.score += series.score;
            series.was_counted = true;
        }
    }

    function sumPreEliminationScore() {
        score.pre_eliminations_score = 0;
        for (let distance of score.distances) {
            score.pre_eliminations_score += distance.score;
        }
    }
}

function generateCode() {
    return crypto.randomBytes(5).toString("hex");
}
