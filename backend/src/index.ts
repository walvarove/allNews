import { populateDBDemo } from './demo/index';

import express from 'express';
import cors from 'cors';
import { router } from './api/routes';
import { adminRouter, adminJs } from './admin';
import { initializeDB } from './config/mongoose';

require('dotenv').config()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
const port = process.env.PORT;

initializeDB(populateDBDemo);

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api', router)
app.use(adminJs.options.rootPath, adminRouter)

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
