import { Router } from 'express';
import { addAction, deleteAction, getActionDetails, patchActionName } from '../controllers/action-controllers';

const router = Router();

router.post('/new', addAction);
router.get('/get/:actionName', getActionDetails);
router.patch('/:actionName', patchActionName);
router.delete('/:actionName', deleteAction)

export default router