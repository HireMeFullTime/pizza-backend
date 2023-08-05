import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from 'mongoose';




const app = express();
app.use(function (_req, res, next) {
    res.header(
        'Access-Control-Allow-Origin',
        '*',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    );
    next();
});
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => {
        console.log('Hello pizza ♥')
        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => console.log(err.message));