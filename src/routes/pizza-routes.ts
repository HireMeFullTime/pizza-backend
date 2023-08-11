import { patchNameValidation } from '../middlewares/patch-name.validator';
import { Router } from 'express';
import { addPizza, deletePizza, getAllPizzasNames, getPizzaDetails, patchPizzaName } from '../controllers/pizza-controllers';
import { pizzaValidation } from '../middlewares/pizza-validator';

const router = Router();

router.post('/new', pizzaValidation, addPizza);
router.get('/get/all', getAllPizzasNames)
router.get('/get/:pizzaName', getPizzaDetails);
router.patch('/:pizzaName', patchNameValidation, patchPizzaName);
router.delete('/:pizzaName', deletePizza)


export default router