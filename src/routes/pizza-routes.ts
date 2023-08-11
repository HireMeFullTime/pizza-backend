import { Request, Response, Router } from 'express';
import { addPizza, deletePizza, getAllPizzasNames, getPizzaDetails, patchPizzaName } from '../controllers/pizza-controllers';
import { Pizza } from '../models/pizza';
import { pizzaValidation } from '../middlewares/pizza-validator';

const router = Router();

router.post('/new', pizzaValidation, addPizza);
router.get('/get/all', getAllPizzasNames)
router.get('/get/:pizzaName', getPizzaDetails);
router.patch('/:pizzaName', patchPizzaName);
router.delete('/:pizzaName', deletePizza)


export default router