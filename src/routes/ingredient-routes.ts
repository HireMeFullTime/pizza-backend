import { Router } from 'express';

const router = Router();

router.post('/new', () => console.log('pizzza'));
router.get('/all', (_req, res)=> res.status(200).json({ success: true, message: 'See you soon! :)' }));

export default router