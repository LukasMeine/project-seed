const constants = require('../helper/constants');
const mongojs = require('mongojs')
const db = mongojs(constants.MONGO_IP_DEV)

function ClientsRepository() {
  this.collection = db.clients
}

ClientsRepository.prototype.create = function(insertable, callback) {
  this.collection.insert(insertable, callback)
};

ClientsRepository.prototype.update = function() {
};

ClientsRepository.prototype.updateLastVisit = function(clientName, lastVisit, phone, process) {
  this.collection.update({name: clientName}, {$set:{last_visit: lastVisit, phone: phone}}, (err) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err)
  })
};

ClientsRepository.prototype.readAllByCompany = function(company, process){
  this.collection.find({company: company}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err, docs)
  })
};


ClientsRepository.prototype.readAll = function(process){
  this.collection.find({}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err, docs)
  })
};

ClientsRepository.prototype.delete = function(id, process) {
  this.collection.remove({_id: mongojs.ObjectId(id)}, (err, docs) => {
    if (err) console.log("[ERROR] MongoDB Error: " + JSON.stringify(err))
    process(err, docs)
  })
};

module.exports = {ClientsRepository};
