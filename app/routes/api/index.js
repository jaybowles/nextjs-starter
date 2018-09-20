import { Router } from 'express';

import marketplace from './marketplace';
import inventory from './inventory';

const router = Router();

router.get('/metrics/health', (req, res) => res.json({ status: 'ok' }));

router.use('/api/v1/marketplace', marketplace);
router.use('/api/v1/inventory', inventory);

export default router;
