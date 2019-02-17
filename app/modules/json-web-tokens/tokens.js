module.exports = Tokens;
const jwt = require("jsonwebtoken");

function Tokens(signature) {
  this.signature = signature;
}

Tokens.prototype.issue = function(claims) { 
  const signature = this.signature;

  return issue_token(signature, claims);
};

function issue_token(signature, claims) {
  if (typeof claims == "object") {
    claims.exp = Math.floor(Date.now() / 1000) + 60 * 60;
  } else {
    claims = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    };
  }

  let issuedToken = jwt.sign(claims, signature);

  return issuedToken;
}

Tokens.prototype.decode = function(token){
    try{
        return jwt.verify(token, this.signature)
    } catch (exc) {
        console.log("[ERROR] Issued an error: " + exc)
        return {}
    }
}

Tokens.prototype.verify = function(token) {
  try {
    let decoded = jwt.verify(token, this.signature);
    return true;
  } catch (err) {
    return false;
  }
};
