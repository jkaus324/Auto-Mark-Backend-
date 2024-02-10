import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/api.js';
import {dbConnect} from './config/db.connect.js'

dotenv.config();    

const app = express();
app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api", api);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);   
});
