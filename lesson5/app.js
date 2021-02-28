const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => console.log('Api listen 5000'));

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/myDataBase', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).catch((e) => console.log(e));

    const { connection } = mongoose;

    connection.on('error', (error) => console.log(error));
}
