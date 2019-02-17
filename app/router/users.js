const express = require("express");
const router = express.Router();
const usersController = require("../repository/users.js");
const auth = require("../repository/auth.js");
const Authentication = new auth();

/**
{
	"username":"teste@teste.com",
	"password":"123456789aa",
	"name":"andre",
	"surname":"pico"
}
*/
router.post(
  "/",
  function(req, res, next) {
    const users = new usersController(req, res);
    users.create();
  }
);

router.put(
  "/",
  function(req, res, next) {
    const users = new usersController(req, res);
    users.update();
  }
);


router.get(
  "/:username",
  Authentication.authorization_ajax,
  validate_read_user,
  function(req, res, next) {
    const users = new usersController(req, res);
    users.read();
  }
);

// validations below

function validate(req, res) {
  const errors = req.validationErrors(req);
  if (!errors) {
    return true;
  }
  return false;
}

function validate_create_user(req, res, next) {
  req.checkBody("username").notEmpty();
  req.checkBody("password").notEmpty();
  req.checkBody("name").notEmpty();
  req.checkBody("role").notEmpty();
  req.checkBody("imageUrl").notEmpty();

  req.validatedPackage = req.body;

  if (validate(req, res)) {
    next();
  } else {
    error_response(res);
  }
}

function validate_read_user(req, res, next) {
  if (req.params.username !== "") {
    req.validatedPackage = {
      username: req.params.username
    };
    next();
  } else {
    error_response(res);
  }
}

function error_response(res) {
  return res.status(400).json({ code: 400, message: "incorrect fields" });
}

module.exports = router;
