const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const PORT = 5000;
const mongoDbUrl = 'mongodb://localhost:27017/myDataBase';

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => console.log('Api listen 5000'));

function _connectDB() {
    mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).catch((e) => console.log(e));

    const { connection } = mongoose;

    connection.on('error', (error) => console.log(error));
}
