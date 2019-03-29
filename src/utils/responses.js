module.exports = {
  requestBodyIncorrect: 'The format of the request should be sizeOfPhoneNumersToGenerate: 123',
  limitError: (limit) => `You can only generate ${limit} phone numbers at a go.`,
  phoneNumbersGenerated: (total) => `Successfully generated ${total} phone numbers.`,
  writeFileError: 'An error occured.',
  phoneNumberFiles: 'All generated files',
  noFileName: 'Please provide filename',
  fileNotFound: 'Specified file not found.',
  fetchedPhoneNumbers: (filename) => `All phone numbers in ${filename}.`
};