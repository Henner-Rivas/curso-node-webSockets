exports.success = function (req, res, status, response) {
  res.status(status || 200).send({
    error: "",
    body: response,
  });
};

exports.error = function (req, res, status, response) {
  res.status(status || 500).send({
    error: response,
    body: "",
  });
};
