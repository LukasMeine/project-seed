const tokens = require("../modules/json-web-tokens/tokens.js");
const constants = require('../helper/constants');
const mongojs = require('mongojs')
const db = mongojs(constants.MONGO_IP_DEV)
const tokenObject = new tokens("mmmkasnmjas125ax");

function Authentication() {}

Authentication.prototype.get_credentials = function(req) {
  if (tokenObject.verify(req.headers.authorization)) {
    return tokenObject.decode(req.headers.authorization);
  } else {
    return false;
  }
};

Authentication.prototype.authorization_ajax = function(req, res, next) {
  if (tokenObject.verify(req.headers.authorization)) {
    next();
  } else {
    error_message(res);
  }
};

function error_message(res) {
  let message = '{ "code": 403, "message":"invalid credentials" }';

  res.writeHead(403, {
    "Content-Type": "application/json;charset=UTF-8"
  });
  res.end(message);
}

function check_tokens(req, next, res) {
  const auth = new Authentication();
  const claims = auth.get_credentials(req);

  db.tokens
    .find({ user: claims.user})
    .toArray(function(err, docs) {
      if (!err && docs.length > 0) {
        console.log(docs);
        next();
      } else {
        console.log(docs);
        error_message(res);
      }
    });
}

Authentication.prototype.authorization = function(req, res, next) {
  if (tokenObject.verify(req.headers.authorization)) {
    next();
  } else {
    res.redirect("login");
  }
};

Authentication.prototype.authorization_cookie = function(req, res, next) {
  if (tokenObject.verify(req.cookies.authorization)) {
    next();
  } else {
    res.redirect("login");
  }
};

Authentication.prototype.login_authorization = function(req, res, next) {
  if (tokenObject.verify(req.cookies.authorization)) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = Authentication;
