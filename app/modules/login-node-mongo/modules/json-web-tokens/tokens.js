module.exports = Tokens;
const jwt = require("jsonwebtoken");

function Tokens(request, res) {
  this.signature = "aYnBqgJKhLqc";
}

Tokens.prototype.issue = function() {
  const signature = this.signature;

  return issue_token(signature);
};

function issue_token(signature) {
  let issuedToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    signature
  );

  return issuedToken;
}

Tokens.prototype.verify = function() {
  try {
    let decoded = jwt.verify(this.request.body.token, this.signature);
    return true;
  } catch (err) {
    return false;
  }
};
