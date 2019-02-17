module.exports = Login;
const jwt = require("../json-web-tokens/tokens.js");
const bcrypt = require("bcrypt");
const constants = require('../../helper/constants');
const mongojs = require('mongojs')
const db = mongojs(constants.MONGO_IP_DEV)
const tokens = new jwt("mmmkasnmjas125ax");

function Login(request, res) {
  this.request = request;
  this.response = res;
}

Login.prototype.login = function() {
  try {
    const user = this.request.body.username;
    const submitedPassword = this.request.body.password;
    const response = this.response;

    db.users.find({ username: user}).toArray(function(err, docs) {
            if (!err && docs.length > 0) {
                check_password(submitedPassword, docs[0].password, response, user);
            } else {
              response.writeHead(403, {
                "Content-Type": "application/json;charset=UTF-8"
              });
              response.end('{ "code": 403, "message":"invalid credentials" }');
            }
    });
  } catch (error) {
    response.writeHead(403, {
      "Content-Type": "application/json;charset=UTF-8"
    });
    response.end('{ "code": 403, "message":"invalid credentials" }');
  }
};

function check_password(submitedPassword, hash, response, user, professional, is_master_admin, company) {
  bcrypt.compare(submitedPassword, hash, function(err, res) {
    if (res) {
      let token = tokens.issue({user:user,timestamp:new Date()});
      save_token(user, token);

      response.writeHead(200, {
        "Content-Type": "application/json;charset=UTF-8"
      });

      response.end(JSON.stringify({ code: 200, token}));
    } else {
      response.writeHead(403, {
        "Content-Type": "application/json;charset=UTF-8"
      });
      response.end('{ "code": 403, "message":"invalid credentials" }');
    }
  });
}

function save_token(user, token) {
  db.tokens.insert({ user: user, token: token, timestamp: new Date() });
}
