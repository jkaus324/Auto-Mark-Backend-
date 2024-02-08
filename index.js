const express = require('express');
const cors = require('cors');
const {  } = require("./config/database.js");
const dotenv = require('dotenv');
const api = require('./routes/api.js');
const { default: dbConnect } = require('./config/db.connect.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api", api);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);   
});
