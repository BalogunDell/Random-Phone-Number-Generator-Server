
import chai from 'chai';
import supertest from 'supertest';
import app from '../src/index';
import {
  phoneNumbersGenerated,
  fileNotFound,
  requestBodyIncorrect,
  limitError,
  fetchedPhoneNumbers } from '../src/utils/responses'; 

const expect = chai.expect;
const request = supertest(app);
const baseAPI = '/phone-numbers';
const routes = [
  baseAPI + '/all-files',
  baseAPI +'aall-files/:name',
  baseAPI + 'generate'
];
describe('Phone generator app', () => {
  it('should return list of generated phone number files', () => {
    request.get(`${baseAPI}/all-files`)
    .set("Content-Type", "application/json")
    .end((err, res) => {
      expect(res.status).to.eql(200);
      expect(res.body.files).to.an('array');
    })
  });

  it('should return 400 if file name does not exist', () => {
    request.get(`${baseAPI}/all-files/gibberish.txt`)
    .set("Content-Type", "application/json")
    .end((err, res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(fileNotFound);
    })
  });

  it('should return 400 if  no paramter is given', () => {
    request.post(`${baseAPI}/generate`)
    .set("Content-Type", "application/json")
    .send({ '': 5})
    .end((err, res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(requestBodyIncorrect);
    })
  });

  it('should return 400 if number of phone number to generate > 2000', () => {
    const number = parseInt(Math.random() * 100 + 100, 10);
    const total = { sizeOfPhoneNumersToGenerate: number };
    request.post(`${baseAPI}/generate`, total)
    .set("Content-Type", "application/json")
    .send(total)
    .end((err, res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(limitError(2000));
    })
  });

  it('should generate file with phone numbers', () => {
    const number = parseInt(Math.random() * 10 + 10, 10);
    const total = { sizeOfPhoneNumersToGenerate: number };
    request.post(`${baseAPI}/generate`)
    .set("Content-Type", "application/json")
    .send(total)
    .end((err, res) => {
      expect(res.status).to.eql(200);
      expect(res.body.message).to.eql(phoneNumbersGenerated(number));
      expect(res.body.generatedPhoneNumbers.length).to.eql(number);
    })
  });

  it('should get a file content', () => {
    const fileName = '11-numbers-generated-at-2019-03-29T18:54:45+01:00.txt';
    request.get(`${baseAPI}/all-files/${fileName}`)
    .set("Content-Type", "application/json")
    .end((err, res) => {
      expect(res.status).to.eql(200);
      expect(res.body.message).to.eql(fetchedPhoneNumbers(fileName));
      expect(res.body.phoneNumbers.length).to.eql(Number(fileName.split('-')[0]));
    })
  });
});