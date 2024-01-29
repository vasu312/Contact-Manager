const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  var title = "No Error";
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      title = "Validation Failed";
      break;
    case constants.FORBIDDEN:
      title = "Forbidden";
      break;
    case constants.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    case constants.NOT_FOUND:
      title = "Not Found";
      break;
    case constants.SERVER_ERROR:
      title = "Server Error";
      break;
    default:
      title = "No Error";
      break;
  }
  res.json({ title: title, message: err.message, 
    stackTrace: err.stack 
  });
};

module.exports = errorHandler;
