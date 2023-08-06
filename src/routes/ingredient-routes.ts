import { Router } from 'express';
import { addIngredient } from '../controllers/ingredient-controllers';

const router = Router();

router.post('/new', addIngredient);


export default router