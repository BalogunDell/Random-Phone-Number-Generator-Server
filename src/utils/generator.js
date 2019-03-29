module.exports = {
  numberGenerator: (sizeOfPhoneNumersToGenerate) => {
    const generatedPhoneNumbers = new Set();

    while (sizeOfPhoneNumersToGenerate > generatedPhoneNumbers.size) {    
      const singlePhoneNumber = '0' + parseInt(Math.random() * 100000000 + 100000000, 10);
      generatedPhoneNumbers.add(singlePhoneNumber);
    }
    return Array.from(generatedPhoneNumbers);
  }
}