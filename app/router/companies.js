const express = require("express");
const router = express.Router();
const companiesRepo = require("../repository/companies.js");
const auth = require("../repository/auth.js");
const Authentication = new auth();
const httpHelper = require("../helper/http_functions")
const { Validator, ValidationError } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});

const createCompanySchema = {
  type: 'object',
  required: ['name', 'admin_users', 'professional_users', 'password'],
  properties:{
    cliente: {
      type: 'string',
      message: {
           "required": "Date of Birth is Required Property",
           "pattern": "Correct format of Date Of Birth is dd-mmm-yyyy"
       }
    },
    admin_users: {
      type: 'number',
      message: {
           "required": "Date of Birth is Required Property",
           "pattern": "Correct format of Date Of Birth is dd-mmm-yyyy"
       }
    },
    professional_users: {
      type: 'number',
      message: {
           "required": "Date of Birth is Required Property",
           "pattern": "Correct format of Date Of Birth is dd-mmm-yyyy"
       }
    },
    password : {
      type: 'string',
      message: {
        "required": "Missing password"
      }
    }
  }
}

router.post("/", validator.validate({body: createCompanySchema}), async (req, res, next) => {

    const companyRepository = new companiesRepo.CompanyRepository()
    const agenda = req.body;

    companyRepository.create(agenda, httpHelper.defaultMongoCallback(res, "Company criada com sucesso"))
});

router.get("/", Authentication.authorization_ajax, (req, res, next) => {

    const companyRepository = new companiesRepo.CompanyRepository()
    const name = req.query.name;

    if (!name) companyRepository.readAll(httpHelper.defaultMongoListCallback(res))
    else companyRepository.readByName(name, httpHelper.defaultMongoListCallback(res))
});

/**
{
	"id":"5b7b48e75e17be57af904e5a"
}
*/
router.put("/delete", (req, res, next) => {

    const companyRepository = new companiesRepo.CompanyRepository()
    const id = req.body.id;

    if (id) companyRepository.delete(id, httpHelper.defaultMongoListCallback(res))
    else httpHelper.badRequest(res, "id")
});

module.exports = router;
