'use strict';

class APIError extends Error {
  constructor (status, message, errorCode, title) {
    message = message || 'Error';

    super(message);

    // Error.captureStackTrace is V8 exclusive, being extra careful here
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);

    // Saving class name
    this.name = this.constructor.name;

    // this will be http status to be set in the response headers
    // `500` is the default value if not specified.
    this.status = status || 500;

    // Unique error code for each error
    this.errorCode = errorCode;

    // Title of error dispalyed
    this.title = title || 'Error';

    this.toString = () => {
      return '' + this.message;
    };
  }
}

module.exports = APIError;
