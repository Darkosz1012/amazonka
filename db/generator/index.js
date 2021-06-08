
import createUser from "./user.js";
import createCompetition from "./competition.js";
import createCategory from "./category.js";
import createDistance from "./distance.js";
import createParticipant from "./participant.js";
import createScore from "./score.js";
import mongoose from "mongoose";

export async function generate(req, option) {
    var setup = {
        participant: 20,
        user: 1,
        competition: 1,
        category: 1,
        distance: 4,
    }
    setup = Object.assign(setup, option);
    console.log(setup)

    let conn = await mongoose.connect(process.env.DATABASE_LINK);
    await conn.connection.db.dropDatabase();

    try {
        let participants = [];
        for(var i = 0; i<setup.participant;i++){
            participants.push(await createParticipant(req));
        }

        for (var i = 0; i < setup.user; i++) {
            var user = await createUser();
            for (var j = 0; j < setup.competition; j++) {
                var competition = await createCompetition(req, user._id);
                for (var k = 0; k < setup.category; k++) {
                    var category = await createCategory(req, competition._id);
                    for (var l = 0; l < setup.distance; l++) {
                        var distance = await createDistance(req, competition._id, category._id);
                    }
                    await participants.forEach(async(item)=>{
                        await createScore(req, item._id, competition._id, category._id);
                    })
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}