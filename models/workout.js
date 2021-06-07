const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: { type: String },
            name: { type: String },
            weight: { type: Number },
            sets: { type: Number },
            reps: { type: Number },
            duration: { type: Number} ,
            distance: { type: Number},
        }
    ],
    },
    {
        toJSON: {virtuals: true}
    });

// WorkoutSchema.virtual('totalDuration').get(function () {
//     console.log('duration>>>>>>',this.exercises.duration);
//     return '999';
//     // const sum = this.exercises.duration.reduce((accumulator, currentValue) => {
//     //     return accumulator + currentValue;
//     // }, 0);
//     //     return sum;
//     })

// FROM WORKOUT.JS: const tallied = exercises.reduce((acc, curr) => {

    WorkoutSchema.virtual('totalDuration')
        .get(function() {
        return this.exercises.reduce((total, { duration }) => {
            return total + duration
        },0)
    });
    
    // let aggregate = WorkoutSchema.aggregate([
    //     {
    //         $addFields: {totalDuration: 
    //         { $add: ["$duration"]}}
    //     }
    // ])

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;

// WorkoutSchema.aggregate([
//     {$group: {
//         _id: '$duration', totalDuration: { $sum: duration}
//         }
//     },
//     { $project: { duration: '$_id', totalDuration: 1, _id: 0}}
// ])




