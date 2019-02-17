const constants = require('../helper/constants');
const mongojs = require('mongojs')
const db = mongojs(constants.MONGO_IP_DEV)

function CompanyRepository() {
  this.collection = db.companies
}

CompanyRepository.prototype.create = function(insertable, callback) {
  this.collection.insert(insertable, callback)
};

CompanyRepository.prototype.update = function() { 
};

CompanyRepository.prototype.readByName = function(name, callback) {
  this.collection.find({name: name}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    callback(err, docs)
  })
};

CompanyRepository.prototype.readByNamePromise = function(name, callback) {
  return new Promise((resolve, reject) => {
    this.collection.findOne({name: name}, (err, docs) => {
      if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
      resolve(docs)
    })
  })
};


CompanyRepository.prototype.readByNameAndCompany = function(name, company, callback) {
  this.collection.find({name: name, company:company}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    callback(err, docs)
  })
};

CompanyRepository.prototype.readByIdAndPassword = function(id, pass, callback) {
  this.collection.findOne({_id: mongojs.ObjectId(id), password: pass}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    callback(err, docs)
  })
};

CompanyRepository.prototype.readById = function(id, callback) {
  this.collection.findOne({_id: mongojs.ObjectId(id)}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    callback(err, docs)
  })
};

CompanyRepository.prototype.readAllByName = function(company, process) {
  this.collection.find({company: company}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err, docs)
  })
};

CompanyRepository.prototype.readAll = function(process) {
  this.collection.find({}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err, docs)
  })
};

CompanyRepository.prototype.delete = function(id, process) {
  this.collection.remove({_id: mongojs.ObjectId(id)}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err, docs)
  })
};

module.exports = {CompanyRepository};
