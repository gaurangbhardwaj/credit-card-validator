const Utils = require("../../utils");
const {
  httpConstants,
  apiSuccessMessage,
  apiFailureMessage,
} = require("../../common/constants");
const CreditCardManager = require("./manager");

class Controller {
  /**
   * Validate credit card
   * @param {*} req
   * @param {*} res
   * @returns {Promise<void | {is_valid: boolean}>}
   */
  validateCreditCard = (req, res) => {
    if (!req.body || !req.body.cc_number)
      return Utils.response(
        res,
        {},
        apiFailureMessage.INVALID_REQUEST,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    try {
      const response = new CreditCardManager().validateCreditCard(
        req.body.cc_number
      );
      if (!response)
        return Utils.response(
          res,
          {},
          apiFailureMessage.CC_VALIDATION,
          httpConstants.RESPONSE_STATUS.FAILURE,
          httpConstants.RESPONSE_CODES.SERVER_ERROR
        );
      Utils.response(
        res,
        response,
        apiSuccessMessage.CC_VALIDATION,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (err) {
      Utils.response(
        res,
        {},
        err.message ? err.message : apiFailureMessage.CC_VALIDATION,
        httpConstants.RESPONSE_STATUS.FAILURE,
        err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
      );
    }
  };
}

module.exports = Controller;
