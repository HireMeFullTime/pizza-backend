import { Ingredient } from './src/models/ingredient';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from 'mongoose';

import pizzaRoutes from './src/routes/pizza-routes'
import actionRoutes from './src/routes/action-routes'
import ingredientRoutes from './src/routes/ingredient-routes'

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

app.use('/pizza', pizzaRoutes)
app.use('/ingredient', ingredientRoutes)
app.use('/action', actionRoutes)

app.get('/', (_req, res) => {
  res.send('Welcome on my pizza-backend part 🍕🍕🍕');
});
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log('Hello pizza ♥')
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err.message));