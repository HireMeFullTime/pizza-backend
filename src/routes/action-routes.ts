import { Router } from 'express';
import { addAction, deleteAction, getActionDetails, getAllActionsNames, patchActionName } from '../controllers/action-controllers';
import { actionValidation } from '../middlewares/action-validator';
import { patchNameValidation } from '../middlewares/patch-name.validator';

const router = Router();

router.post('/new', actionValidation, addAction);
router.get('/get/all', getAllActionsNames)
router.get('/get/:actionName', getActionDetails);
router.patch('/:actionName', patchNameValidation, patchActionName);
router.delete('/:actionName', deleteAction)

export default router