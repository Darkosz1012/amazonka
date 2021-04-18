const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    competitons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competiton",
        },
    ],
});

const CompetitonSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        unique: true,
    },
    description: { type: String },
    timetable: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    location: { type: String },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});

const AdditionalCompetitonSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        unique: true,
    },
    description: { type: String },
    timetable: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    location: { type: String },
});

const CategorySchema = new mongoose.Schema({
    name: { type: String },
    gender: { type: String },
    start_stand: { type: Number },
    end_stand: { type: Number },
    distance: [
        {
            name: { type: String },
            series_type: { type: Number },
        },
    ],
});

const ParticipantSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    birth_year: { type: String },
    license: { type: String },
    gender: { type: String },
});

const ResultSchema = new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
    },
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competiton",
    },
    elimination_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Elimination",
    },
    Category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    stand: { type: Number },
    order: { type: String },
    final_result: { type: Number },
    start_position: { type: Number },
    distance: [
        {
            name: { type: String },
            sum: { type: Number },
        },
    ],
});

const FullResultSchema = new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
    },
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competiton",
    },
    final_result: { type: Number },
    start_position: { type: Number },
    distance: [
        {
            name: { type: String },
            sum: { type: Number },
            series: [
                {
                    sum: { type: Number },
                    arrows: [
                        {
                            type: String,
                        },
                    ],
                },
            ],
        },
    ],
});

const TeamSchema = new mongoose.Schema({
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competiton",
    },
    name: {
        type: String,
        unique: true,
    },
    category: { type: String },
    final_result: { type: Number },
    start_position: { type: Number },
    end_position: { type: Number },
    participants: [
        {
            participant_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Participant",
            },
            name: { type: String },
            surname: { type: String },
        },
    ],
    elimination: [
        {
            round: { type: String },
            opponent_name: { type: String },
            opponent_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TeamSchema",
            },
            result: {
                my: { type: Number },
                opponent: { type: Number },
            },
        },
    ],
});

const EliminationSchema = new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
    },
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competiton",
    },
    final_result: { type: Number },
    start_position: { type: Number },
    end_position: { type: Number },
    elimination: [
        {
            round: { type: String },
            opponent_name: { type: String },
            opponent_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EliminationSchema",
            },
            result: {
                my: { type: Number },
                opponent: { type: Number },
            },
        },
    ],
});
