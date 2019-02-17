var express = require('express')
var router = express.Router()
const auth = require('../repository/auth.js');
const Authentication = new auth();

router.use('/login', require('./login'))
router.use('/users', require('./users'))
router.use('/clients', require('./clients'))
router.use('/company', require('./companies'))

router.get('/', function(req, res) {
  res.send('Home page')   
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router
