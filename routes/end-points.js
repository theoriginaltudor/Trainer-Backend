const express = require("express");
const router = express.Router();
const { checkJwt, checkScopes } = require("./../auth0/auth0");
const Clients = require("../models/clientModel");
const Diets = require("../models/dietModel");
const Measurements = require("../models/measurementModel");
const Exercises = require("../models/exerciseModel");
const Workouts = require("../models/workoutModel");
const History = require("../models/historyModel");
const Trainers = require("../models/trainerModel");

// This route doesn't need authentication
// router.get("/public", function(req, res) {
//   res.json({
//     message:
//       "Hello from a public endpoint! You don't need to be authenticated to see this."
//   });
// });

// // This route need authentication
// router.get("/private", checkJwt, function(req, res) {
//   res.json({
//     message:
//       "Hello from a private endpoint! You need to be authenticated to see this."
//   });
// });

// router.get("/private-scoped", checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message:
//       "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
//   });
// });

router.get("/test", (req, res) => {
  res.json("Yesee");
});

router.get("/trainer-id/:email", /*checkJwt,*/ function(req, res) {
  const email = req.params.email;
  console.log("getting id for trainer:", email);
  const response = {};
  Trainers.trainerByEmail(email, (err, trainer) => {
    if (err) {
      response.msg = err || "There was an error getting the trainer";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = trainer;

      res.json(response);
    }
  });
});

router.get("/client-id/:email", /*checkJwt,*/ function(req, res) {
  const email = req.params.email;
  console.log("getting id for client:", email);
  const response = {};
  Clients.clientByEmail(email, (err, client) => {
    if (err) {
      response.msg = err || "There was an error getting the client";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = client;

      res.json(response);
    }
  });
});

router.get("/clients-for-trainer/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("getting clients for trainer:", id);
  const response = {};
  Clients.clientsWithTrainer(id, (err, clients) => {
    if (err) {
      response.msg = err || "There was an error getting the clients";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = clients;

      res.json(response);
    }
  });
});

router.get("/diets-for-client/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("getting diets for client:", id);
  const response = {};
  Diets.dietsForClient(id, (err, diets) => {
    if (err) {
      response.msg = err || "There was an error getting the diets";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = diets;

      res.json(response);
    }
  });
});

router.post("/new-diet/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("new diet for client:", id);
  const body = req.body;
  // console.log(body);
  const response = {};
  Diets.addNew(id, body, (err, diets) => {
    if (err) {
      response.msg = err || "There was an error saving the diets";
      res.json(response);
    } else {
      console.log("POST request succeeded");
      response.success = true;
      response.data = diets;

      res.json(response);
    }
  });
});

router.get("/diet-goal-for-client/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("getting diet goals for client:", id);
  const response = {};
  Diets.goalForClient(id, (err, diets) => {
    if (err) {
      response.msg = err || "There was an error getting the diets";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = diets;

      res.json(response);
    }
  });
});

router.get("/measurements-for-client/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("getting measurements for client:", id);
  const response = {};
  Measurements.measurementsForClient(id, (err, measurements) => {
    if (err) {
      response.msg = err || "There was an error getting the measurements";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = measurements;

      res.json(response);
    }
  });
});

router.post("/new-measurement/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("new measurement for client:", id);
  const body = req.body;
  // console.log(body);
  const response = {};
  Measurements.addNew(id, body, (err, measurements) => {
    if (err) {
      response.msg = err || "There was an error saving the measurements";
      res.json(response);
    } else {
      console.log("POST request succeeded");
      response.success = true;
      response.data = measurements;

      res.json(response);
    }
  });
});

router.get("/exercises/", /*checkJwt,*/ function(req, res) {
  console.log("getting exercises list");
  const response = {};
  Exercises.allExercises((err, exercises) => {
    if (err) {
      response.msg = err || "There was an error getting the exercises";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = exercises;

      res.json(response);
    }
  });
});

router.get("/exercise/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("getting exercise for:", id);
  const response = {};
  Exercises.oneExercise(id, (err, exercises) => {
    if (err) {
      response.msg = err || "There was an error getting the exercises";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = exercises;

      res.json(response);
    }
  });
});

router.post("/exercise-list/", /*checkJwt,*/ function(req, res) {
  const idList = req.body;
  const response = {};
  
  Exercises.listExercises(idList, (err, exercises) => {
    if (err) {
      response.msg = err || "There was an error getting the exercises";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = exercises;

      res.json(response);
    }
  });
});

router.get("/workouts-for-client/:id", /*checkJwt,*/ function(req, res) {
  const id = req.params.id;
  console.log("getting workouts for client:", id);
  const response = {};
  Workouts.workoutForClient(id, (err, workouts) => {
    if (err) {
      response.msg = err || "There was an error getting the workouts";
      res.json(response);
    } else {
      console.log("GET request succeeded");
      response.success = true;
      response.data = workouts;

      res.json(response);
    }
  });
});

router.post("/create-workout", /*checkJwt,*/ function(req, res) {
  const workout = req.body;
  console.log(workout);

  const response = {};
  Workouts.createNewWorkout(workout, (err, workouts) => {
    if (err) {
      response.msg = err || "There was an error creating the workouts";
      res.json(response);
    } else {
      console.log("POST request succeeded");
      response.success = true;

      res.json(response);
    }
  });
});

router.get(
  "/history-for-trainer/:clientId/for-exercise/:exerciseId",
  // checkJwt,
  function(req, res) {
    const clientId = req.params.clientId;
    const exerciseId = req.params.exerciseId;
    console.log(
      "getting history for trainer:",
      clientId,
      "for exercise:",
      exerciseId
    );
    const response = {};
    History.historyForTrainer(clientId, exerciseId, (err, history) => {
      if (err) {
        response.msg = err || "There was an error getting the history";
        res.json(response);
      } else {
        console.log("GET request succeeded");
        response.success = true;
        response.data = history;

        res.json(response);
      }
    });
  }
);

router.get(
  "/history-for-workout/:workoutId/for-exercise/:exerciseId",
  // checkJwt,
  function(req, res) {
    const workoutId = req.params.workoutId;
    const exerciseId = req.params.exerciseId;
    console.log(
      "getting history for workout:",
      workoutId,
      "for exercise:",
      exerciseId
    );
    const response = {};
    History.historyForExerciseInWorkout(workoutId, exerciseId, (err, history) => {
      if (err) {
        response.msg = err || "There was an error getting the history";
        res.json(response);
      } else {
        console.log("GET request succeeded");
        response.success = true;
        response.data = history;

        res.json(response);
      }
    });
  }
);

router.get(
  "/history-for-client/:clientId/for-workout/:workoutId",
  // checkJwt,
  function(req, res) {
    const clientId = req.params.clientId;
    const workoutId = req.params.workoutId;
    console.log(
      "getting history for client:",
      clientId,
      "for workout:",
      workoutId
    );
    const response = {};
    History.historyForClient(clientId, workoutId, (err, history) => {
      if (err) {
        response.msg = err || "There was an error getting the history";
        res.json(response);
      } else {
        console.log("GET request succeeded");
        response.success = true;
        response.data = history;

        res.json(response);
      }
    });
  }
);

router.post(
  "/new-history-entry/:clientId/:workoutId/:exerciseId",
  // checkJwt,
  function(req, res) {
    const clientId = req.params.clientId;
    const workoutId = req.params.workoutId;
    const exerciseId = req.params.exerciseId;
    console.log("new history for client:", clientId);
    const body = req.body;
    // console.log(body);
    const response = {};
    History.addNew(clientId, workoutId, exerciseId, body, (err, history) => {
      if (err) {
        response.msg = err || "There was an error saving the history";
        res.json(response);
      } else {
        console.log("POST request succeeded");
        response.success = true;
        response.data = history;

        res.json(response);
      }
    });
  }
);

module.exports = router;
