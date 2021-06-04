import { Category, Distance, Score, Series } from "$/db/index.js";
import { verifyRequest } from "$/auth/auth.js";

export default {
    addScore: async (_, args, context) => {
        verifyRequest(context.req);

        let score = createNewScore(args);

        let distances = await getDistancesFromCategory(args.category_id);
        addDistancesToScore(distances, score);

        await createAllSeries(args.participant_id, args.category_id, distances);

        return await score.save();
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
                if (arrow === "X") {
                    args.score += 10;
                    args.Xs++;
                } else if (arrow === "10") {
                    args.score += parseInt(arrow);
                    args.tens++;
                } else {
                    args.score += parseInt(arrow);
                }
            }
        }

        return Series.findByIdAndUpdate(args._id, args, {
            new: true,
        });
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
        });
    }
}

async function updateScoreFromSeries(score, distance_id) {
    let allSeries = await Series.find({
        distance_id,
        participant_id: score.participant_id,
    });

    zeroScore();

    for (let series of allSeries) {
        for (
            let distance_idx = 0;
            distance_idx < score.distances.length;
            distance_idx++
        ) {
            if (
                score.distances[distance_idx].distance_id.toString() ===
                distance_id
            ) {
                countSeries(distance_idx, series);
            }
        }
    }

    function zeroScore() {
        for (let i = 0; i < score.distances.length; i++) {
            if (score.distances[i].distance_id.toString() === distance_id) {
                score.distances[i].score = 0;
            }
        }
    }
    function countSeries(distance_idx, series) {
        score.distances[distance_idx].score += series.score;
        series.was_counted = true;
    }
}

function generateCode() {
    return crypto.randomBytes(5).toString("hex");
}
