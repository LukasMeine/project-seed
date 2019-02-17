const mongojs = require("mongojs");
const constant = require('../helper/constants')
const db = mongojs(constant.MONGO_IP_DEV)
const users = db.collection("users");
const bcrypt = require("bcrypt");
const auth = require("./auth.js");
const Authentication = new auth();

const saltRounds = 5;

function Users(req, res) {
  this.req = req;
  this.res = res;
}

Users.prototype.create = function() {
  const userSchema = this.req.body;
  const req = this.req;
  const res = this.res;

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (!err) {
      userSchema.password = hash;
      userSchema.username = req.body.username;
      userSchema.company = req.body.company;

      db.users.insert(userSchema, function(error, doc) {
        if (!error) {
          return success_response(res, "User created successfully");
        }
        return error_response(res);
      });
    } else {
      return error_response(res);
    }
  });
};

Users.prototype.read = function() {
  const res = this.res;
  const req = this.req;
  let query = {};

  if (req.validatedPackage.username !== "all") {
    query = { username: req.validatedPackage.username };
  }

  db.users.find(query).toArray(function(err, docs) {
    if (!err) {
      success_response(res, docs);
    } else {
      error_response(res);
    }
  });
};

Users.prototype.read_logged_user = function() {
  const res = this.res;
  const credentials = Authentication.get_credentials(this.req);
  db.users
    .find({ username: credentials.user, company: credentials.company })
    .toArray(function(err, docs) {
      if (!err) {
        success_response(res, docs);
      } else {
        error_response(res);
      }
    });
};

function error_response(res) {
  return res.status(400).json({ code: 400, message: "incorrect fields" });
}

function success_response(res, fnMessage) {
  return res.status(200).json({ code: 200, message: fnMessage });
}

module.exports = Users;
