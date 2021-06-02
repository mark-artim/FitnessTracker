const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const ExerciseSchema = new Schema({
    workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout"
    },
    name: String,
    type: String,
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;