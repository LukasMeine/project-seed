const express = require('express');
const router = express.Router();
const Login = require('../modules/login-node-mongo/login.js');
const auth = require('../repository/auth.js');
const Authentication = new auth();

/**
{
	"username": "re@ra.com",
	"password":"1"
}
*/
router.post('/', function(req, res, next) {
   let login = new Login(req,res);
   login.login();
});

router.get('/', function(req, res, next) {

  //res.render('login', { title: 'Login' });

});




module.exports = router;
