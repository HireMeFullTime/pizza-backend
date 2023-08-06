import { Router } from 'express';
import { addAction } from '../controllers/action-controllers';

const router = Router();

router.post('/new', addAction);


export default router