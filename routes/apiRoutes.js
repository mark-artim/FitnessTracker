var db = require("../models");
const Workout = require("../models/workout");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .sort({ _id: 1 })
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
          });
  
    app.post("/api/workouts", ({body}, res) => {
        db.Workout.create(body)
        .then(dbTest => {
            console.log('>>>>>>>>In Workout create. ', dbTest);
        })
        .catch(({ message }) => {
            console.log(message);
        });
        });

    app.put("/api/workouts/:id", function(req, res) {
        var upd = db.Workout.updateOne({ _id: req.params.id }, { $push: {exercises: req.body}});
        upd.exec(function (err, workoutData) {
            if (err) {
                console.log("There was an error: ",err);
                return res.send(err);
            }
            console.log("Updated: ",req.body);
            return res.json(workoutData);
        });
    });

    // FINISH THIS - GET BY RANGE
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .sort({ _id: -1 })
          .then(dbWorkouts => {
              console.log('>>>>>>>>dbWorkouts: ',dbWorkouts)
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
          });
}

    



//   app.put("/api/images/:id", function(req, res) {
//     db.Image.updateOne({ _id: req.params.id }, { rating: req.body.rating }).then(function(dbImage) {
//       res.json(dbImage);
//     });
//   });
// };