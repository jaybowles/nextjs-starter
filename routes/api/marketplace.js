import { Router } from 'express';

const router = Router();

const STATIC_DATA = [
  {
    id: '100',
    name: 'Thing B',
    details: 'I will give this to you for money'
  }
];

router.get('/', (req, res) => res.json({ data: STATIC_DATA }));

export default router;
