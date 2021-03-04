const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

const apiRouter = require('./router/api.router');
const { MONGO_URL, PORT } = require('./config/config');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const app = express();

_connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => console.log(`App listen ${PORT}`));

function _connectDb() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).catch((e) => console.log(e));

    const { connection } = mongoose;

    connection.on('error', (error) => console.log(error));
}
