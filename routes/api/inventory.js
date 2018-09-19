import { Router } from 'express';

const router = Router();

const STATIC_DATA = [
  {
    id: '1',
    name: 'Thing A',
    details: 'You definitely need this!'
  }
];

router.get('/', (req, res) => res.json({ data: STATIC_DATA }));

export default router;
