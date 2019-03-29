import fs from 'fs';
import path from 'path';
import moment from 'moment';
import {
  phoneNumbersGenerated,
  writeFileError,
  phoneNumberFiles,
  fileNotFound,
  fetchedPhoneNumbers } from '../utils/responses';
import { numberGenerator } from '../utils/generator';

/*
*  Get all phone number files
*/
exports.getAllPhoneNumbers = (req, res) => {
  const filePath = path.join(__dirname, '../generatedPhoneNumbers' )
  fs.readdir(filePath, (error, files) => {
    if (error) {
      return res.status(500).json({ message: writeFileError });
    }
    return res.status(200).json(
      { 
        message: phoneNumberFiles,
        files
      }
  );
  });
};

/*
*  Get file content
*/
exports.getFileContent = (req, res) => {
  const { name } = req.params;
  const filePath = path.join(__dirname, `../generatedPhoneNumbers/${name}`);
  console.log(filePath);
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      return res.status(400).json({ message: fileNotFound });
    }
    return res.status(200).json(
      { 
        message: fetchedPhoneNumbers(name),
        phoneNumbers: data.split(',')
      }
  );
  })
} 

/*
* Generate phone-numbers
*
*/
exports.generatePhoneNumbers = (req, res) => {
    const { sizeOfPhoneNumersToGenerate } = req.body;
    const generatedPhoneNumbers = numberGenerator(sizeOfPhoneNumersToGenerate);

    const timeOfFileGeneration = moment().format();
    const fileName = `${sizeOfPhoneNumersToGenerate}-numbers-generated-at-${timeOfFileGeneration}`
    const filePath = path.resolve(
        __dirname, 
        `../generatedPhoneNumbers/${fileName}.txt`
      );
    fs.writeFile(filePath, generatedPhoneNumbers, (error) => {
      if (error) {
        return res.status(500).json({ message: writeFileError });
      }
      return res.status(200).json(
          { 
            message: phoneNumbersGenerated(sizeOfPhoneNumersToGenerate),
            generatedPhoneNumbers,
            fileName:fileName + '.txt',
          }
      );
    });
};

