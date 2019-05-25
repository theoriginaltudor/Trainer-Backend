const express = require("express");
const router = express.Router();
const { checkJwt, checkScopes } = require("./../auth0/auth0");

// This route doesn't need authentication
router.get("/public", function(req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

// This route need authentication
router.get("/private", checkJwt, function(req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this."
  });
});

router.get("/private-scoped", checkJwt, checkScopes, function(req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  });
});

// register user
// router.post("/users", function(req, res, next) {
//   const newUser = {
//     account: req.body.account,
//     password: req.body.password,
//     email: req.body.email
//   };

//   const response = {};

//   User.addUser(newUser, (err, addedUser) => {
//     if (err) {
//       response.msg = err.msg || "There was an error registering the new user";
//       res.json(response);
//     } else {
//       console.log("[%s] registered succesfully", addedUser.account);

//       response.success = true;
//       response.msg = "User registered successfuly";
//       response.user = addedUser;

//       res.json(response);
//     }
//   });
// });

module.exports = router;
