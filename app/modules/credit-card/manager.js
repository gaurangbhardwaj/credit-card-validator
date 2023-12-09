const CryptoJS = require("crypto-js");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

class Manager {
  validateCreditCard = (creditCardNumber) => {
    const cardNumber = CryptoJS.AES.decrypt(
      creditCardNumber,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    if (!cardNumber) throw new Error("Invalid credit card number");

    const digits = cardNumber.toString().split("").map(Number);
    digits.reverse();

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];

      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return { is_valid: !!(sum && sum % 10 === 0) };
  };
}

module.exports = Manager;
