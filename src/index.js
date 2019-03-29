import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const baseAPI = '/phone-numbers';

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(baseAPI, router);

app.listen(port, () => console.log(`Server started on ${port}`));
