import express from 'express';
import { getAllPhoneNumbers, generatePhoneNumbers, getFileContent } from '../controllers/phoneNumberGenerator';
import { validateLengthOfNumbersToGenerate } from '../middlewares';

const router = express.Router();

router.get('/all-files', getAllPhoneNumbers);
router.get('/all-files/:name', getFileContent);
router.post('/generate', validateLengthOfNumbersToGenerate, generatePhoneNumbers);

export default router;