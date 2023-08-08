import { Router } from 'express';
import { addIngredient, deleteIngredient, getAllIngredientsNames, getIngredientDetails, patchIngredientName } from '../controllers/ingredient-controllers';

const router = Router();

router.post('/new', addIngredient);
router.get('/get/all', getAllIngredientsNames)
router.get('/get/:ingredientName', getIngredientDetails);
router.patch('/:ingredientName', patchIngredientName);
router.delete('/:ingredientName', deleteIngredient)


export default router