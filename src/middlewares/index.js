
import { requestBodyIncorrect, limitError } from '../utils/responses';

/**
 * Validates the body of the request
 * 
 */
exports.validateLengthOfNumbersToGenerate = (req, res, next) => {
  const { sizeOfPhoneNumersToGenerate } = req.body;
  const limit = 2000;

  console.log(req.body);
  if (parseInt(sizeOfPhoneNumersToGenerate) > limit) {
    return res.status(400).json({ message: limitError(limit) });
  }

  if (!sizeOfPhoneNumersToGenerate) {
    return res.status(400).json({ message: requestBodyIncorrect});
  }
  next();
};
