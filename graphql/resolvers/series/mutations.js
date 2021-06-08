import { Category, Distance, Score, Series } from "$/db/index.js";
import { verifyRequest } from "$/auth/auth.js";
import crypto from "crypto";

export default {
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

        await calculateFinalsPlacement(args.category_id);

        return scores;
    },
};

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
            if (distance.distance_id.toString() === distance_id)
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

async function calculateFinalsPlacement(category_id) {
    let scores = await Score.find({ category_id });
    scores.sort((score1, score2) => {
        if (score1.score === score2.score) {
            if (score1.Xs + score1.tens === score2.Xs + score2.tens) {
                return score1.Xs > score2.Xs;
            }
            return score1.Xs + score1.tens === score2.Xs + score2.tens;
        }
        return score1.score > score2.score;
    });

    for (let i = 0; i < scores.length; i++) {
        scores[i].finals_initial_placement = i + 1;
        scores[i].save();
    }
}
