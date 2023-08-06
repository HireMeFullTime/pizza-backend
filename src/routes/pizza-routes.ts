import { Request, Response, Router } from 'express';
import { addPizza, deletePizza, getPizzaDetails, patchPizzaName } from '../controllers/pizza-controllers';
import { Pizza } from '../models/pizza';

const router = Router();

router.post('/new', addPizza);
router.get('/get/:pizzaName', getPizzaDetails);
router.patch('/:pizzaName', patchPizzaName);
router.delete('/:pizzaName', deletePizza)


export default router