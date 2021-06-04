import { Finals, Score } from "$/db/index.js";
import is_pow_2 from "$/utils/is_pow_2.js";

export default {
    generateFinals: async (parent, args, context, info) => {
        let { competition_id, category_id, first_round } = args;

        if (first_round < 1 && !is_pow_2(first_round)) {
            throw "first round must be a power of 2 and cannot be less than 1.";
        }

        let scores = await Score.find({ competition_id, category_id })
            .populate("participant_id")
            .sort({ pre_eliminations_score: -1 });

        let finals = [];

        await createFinalsForFirstRound(first_round, finals, scores);

        await createFinalsForNextRounds(first_round, finals);

        return await Finals.find({ category_id });
    },

    updateFinals: async (parent, args, context, info) => {
        let { _id, score1, score2 } = args;
        let result = Finals.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    "participant1.score": score1,
                    "participant2.score": score2,
                },
            }
        );

        let palacement = result.participant1.placement;
        if (score1 >= 6 && score2 >= 6) {
            let participant = {};
            if (score1 >= 6) {
                participant = result.participant1;
            } else {
                participant = result.participant2;
            }
            participant.score = 0;

            let $set = {};
            if (result.round / 2 >= palacement) {
                $set = {
                    participant1: participant,
                };
            } else {
                $set = {
                    participant2: participant,
                };
            }

            await Finals.updateOne(
                {
                    category_id: result.category_id,
                    round: result.round / 2,
                },
                {
                    $set,
                }
            );
        }
        return Finals.findOne({ _id: args._id });
    },

    deleteAllFinals: async (parent, args, context, info) => {
        return await Finals.deleteMany({ category_id: args.category_id });
    },
};

async function createFinalsForFirstRound(first_round, finals, scores) {
    for (let i = 0; i < first_round; i++) {
        let participant1 = createParticipant(scores, i);

        let opponent_index = round * 2 - i - 1;
        let participant2 = createParticipant(scores, opponent_index);

        finals[0].push({
            competition_id,
            category_id,
            participant1,
            participant2,
            round,
        });
    }
    await Finals.create(finals[0]);
}

async function createFinalsForNextRounds(first_round, finals) {
    for (
        let round = first_round / 2, iter = 0;
        round >= 1;
        round /= 2, iter++
    ) {
        for (let i = 0; i < round; i++) {
            let prev1 = finals[iter][i];
            let participant1 = createParticipantFromPrevFinals(prev1, i);

            let prev2 = finals[iter][round - i - 1];
            let opponent_index = round * 2 - i - 1;
            let participant2 = createParticipantFromPrevFinals(
                prev2,
                opponent_index
            );

            finals[iter + 1].push({
                competition_id,
                category_id,
                participant1,
                participant2,
                round,
            });
        }
        await Finals.create(finals[iter + 1]);
    }
}

function createParticipant(scores, index) {
    let participants_number = scores.length;
    let participant = {
        full_name: "BYE",
        placement: index + 1,
        score: 0,
    };
    if (index < participants_number) {
        participant.participant_id = scores[index].participant_id._id;
        participant.full_name = scores[index].participant_id.full_name;
    }
    return participant;
}

function createParticipantFromPrevFinals(prev_finals, index) {
    let participant = {
        full_name: "",
        placement: index + 1,
        score: 0,
    };
    if (prev_finals.participant2.participant_id == undefined) {
        participant.participant_id = prev_finals.participant1.participant_id;
        participant.full_name = prev_finals.participant1.full_name;
    }
    return participant;
}
