import { Router } from 'express';
import { NoveltyController } from './controller';
import { authenticateToken } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';

const router = Router();

router.get('/', NoveltyController.getNovelties);
router.get('/mine', authenticateToken, NoveltyController.getUserNovelties);
// router.post('/', createNovelty)
router.put('/:id', [authenticateToken, PermissionMiddleware.canManageNovelty], NoveltyController.update)
router.delete('/:id', [authenticateToken, PermissionMiddleware.canManageNovelty], NoveltyController.deleteNovelty)

module.exports = router;