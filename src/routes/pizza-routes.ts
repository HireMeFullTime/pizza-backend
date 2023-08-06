import { Router } from 'express';
import { addPizza } from '../controllers/pizza-controllers';

const router = Router();

router.post('/new', addPizza);

export default router