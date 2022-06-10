// 1.
class ValidationError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  ValidationError,
};

// 2.
// function createError(status, message) {
// const e = new Error();
// e.status = status;
// e.message = message;
// return e;
// }
