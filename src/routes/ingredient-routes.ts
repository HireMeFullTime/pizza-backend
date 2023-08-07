import { Router } from 'express';
import { addIngredient, deleteIngredient, getIngredientDetails, patchIngredientName } from '../controllers/ingredient-controllers';

const router = Router();

router.post('/new', addIngredient);
router.get('/get/:ingredientName', getIngredientDetails);
router.patch('/:ingredientName', patchIngredientName);
router.delete('/:ingredientName', deleteIngredient)


export default router