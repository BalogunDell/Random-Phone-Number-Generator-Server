# Random-Phone-Number-Generator-Server
Random phone number generator server

This api geneates phone numbers in a file, saves the file and dishes out the content of the file when needed. 
Built with Node, Express, Filesystem.

#### Endpoints
- POST - /phone-numbers/generate - Generates phone numbers E.g of payload: `{sizeOfPhoneNumersToGenerate: 3}`
- GET - /phone-numbers/all-files - Returns an array of all file with phone numbers.
- GET - /phone-numbers/all-files/:name - Returns the content of the file with the name passed.
