const express = require("express");
const router = express.Router();
const clientsRepo = require("../repository/clients.js");
const auth = require("../repository/auth.js");
const Authentication = new auth();
const httpHelper = require("../helper/http_functions");
const {
  Validator,
  ValidationError
} = require("express-json-validator-middleware");

const validator = new Validator({ allErrors: true });

const createClientSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    },
    last_visit: {
      type: "string"
    },
    phone: {
      type: "string"
    }
  }
};

const updateClientSchema = {
  type: "object",
  required: ["name", "last_visit"],
  properties: {
    name: {
      type: "string"
    },
    last_visit: {
      type: "string"
    },
    phone: {
      type: "string"
    }
  }
};

/**
{
	"name": "Arthur vinagrete",
	"last_visit":"11/10/2015"
}
*/
router.post(
  "/",
  validator.validate({ body: createClientSchema }),
  (req, res, next) => {
    const clientsRepository = new clientsRepo.ClientsRepository();
    const clients = req.body;

    clientsRepository.create(
      clients,
      httpHelper.defaultMongoCallback(res, "Cliente criado com sucesso")
    );
  }
);

/**
  {
	 "name":"Arthur vinagrete",
	  "last_visit": "11/11/2015"
  }
*/
router.put(
  "/",
  validator.validate({ body: updateClientSchema }),
  (req, res, next) => {
    const clientsRepository = new clientsRepo.ClientsRepository();
    const clientName = req.body.name;
    const lastVisit = req.body.last_visit;
    const phone = req.body.phone;

    clientsRepository.updateLastVisit(
      clientName,
      lastVisit,
      phone,
      httpHelper.defaultMongoCallback(res, "Visita registrada com sucesso")
    );
  }
);

router.get("/", (req, res, next) => {
  const clientsRepository = new clientsRepo.ClientsRepository();


  clientsRepository.readAllByCompany(req.query.company, httpHelper.defaultMongoListCallback(res));
});

router.delete("/", (req, res, next) => {
  const clientsRepository = new clientsRepo.ClientsRepository();
  const id = req.query.id;

  clientsRepository.delete(id, httpHelper.defaultMongoListCallback(res));
});

module.exports = router;
