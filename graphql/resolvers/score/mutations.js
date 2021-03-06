import { Category, Distance, Score, Series } from "$/db/index.js";
import { verifyRequest } from "$/auth/auth.js";
import crypto from "crypto";

export default {
    addScore: async (_, args, context) => {
        verifyRequest(context.req);

        let score = createNewScore(args);

        let distances = await getDistancesFromCategory(args.category_id);
        addDistancesToScore(distances, score);

        try {
            let { _id } = await score.save();
            await createAllSeries(
                _id,
                args.participant_id,
                args.category_id,
                distances
            );
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

async function createAllSeries(
    score_id,
    participant_id,
    category_id,
    distances
) {
    for (let d of distances) {
        let distance = await Distance.findById(d.distance_id);
        for (let i = 0; i < distance.number_of_series; i++) {
            await createSeries(score_id, distance._id, i);
        }
    }

    async function createSeries(score_id, distance_id, series_no) {
        await Series.create({
            score_id,
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
function generateCode() {
    return crypto.randomBytes(5).toString("hex");
}
