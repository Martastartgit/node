const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');
const { PORT, MONGO_URL } = require('./config/config');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => console.log(`Api listen ${PORT}`));

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => console.log(e));

    const { connection } = mongoose;

    connection.on('error', (error) => console.log(error));
}
