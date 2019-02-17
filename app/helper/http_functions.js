module.exports = {
  errorResponse(res, code, message) {
    return res.status(code).json({ code: code, message: message });
  },

  successResponse(res, fnMessage) {
    return res.status(200).json({ code: 200, message: fnMessage });
  },

  singleDocumentResponse(res, doc) {
    return res.status(200).json({ code: 200, ...doc });
  },

  defaultMongoCallback(res, successMessage){
    return function(err){
      if (err)
        return res.status(500).json({ code: 500, err: err });

      return res.status(200).json({ code: 200, message: successMessage });
    }
  },

  defaultMongoListCallback(res){
    return function(err, docs){
      if (err)
        return res.status(500).json({ code: 500, err: err });

      return res.status(200).json({ code: 200, records: docs });
    }
  },

  badRequest(res, missing){
      return res.status(400).json({ code: 400, message: "Unable to perform request. Invalid request",  required: missing});
  },
}
