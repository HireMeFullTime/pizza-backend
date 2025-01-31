import { Router } from 'express';
import { addIngredient, deleteIngredient, getAllIngredientsNames, getIngredientDetails, patchIngredientName } from '../controllers/ingredient-controllers';
import { ingredientValidation } from '../middlewares/ingredient-validator';
import { patchNameValidation } from '../middlewares/patch-name.validator';

const router = Router();

router.post('/new', ingredientValidation, addIngredient);
router.get('/get/all', getAllIngredientsNames)
router.get('/get/:ingredientName', getIngredientDetails);
router.patch('/:ingredientName', patchNameValidation, patchIngredientName);
router.delete('/:ingredientName', deleteIngredient)


export default router