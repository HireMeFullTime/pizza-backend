import { Router } from 'express';

const router = Router();

router.post('/new', () => console.log('pizzza'));
router.get('/all', ()=>console.log('get pizza'));

export default router