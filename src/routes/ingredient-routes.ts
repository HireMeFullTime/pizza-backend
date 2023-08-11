import { Router } from 'express';
import { addIngredient, deleteIngredient, getAllIngredientsNames, getIngredientDetails, patchIngredientName } from '../controllers/ingredient-controllers';
import { ingredientValidation } from '../middlewares/ingredient-validator';
import { patchNameIngredientValidation } from '../middlewares/patch-name-ingredient.validator';

const router = Router();

router.post('/new', ingredientValidation, addIngredient);
router.get('/get/all', getAllIngredientsNames)
router.get('/get/:ingredientName', getIngredientDetails);
router.patch('/:ingredientName', patchNameIngredientValidation, patchIngredientName);
router.delete('/:ingredientName', deleteIngredient)


export default router