import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { findAll, find, create, update } from './controller';
import { validateCreateCompany, validateUpdateCompany } from './middleware';

const router = Router();

router.get('/', asyncHandler(findAll));
router.get('/:id', asyncHandler(find));
router.post('/', validateCreateCompany(), asyncHandler(create));
router.put('/:id', validateUpdateCompany(), asyncHandler(update));

export default router;
