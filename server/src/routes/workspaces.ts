import express from 'express';
import isAuthenticated from '../middleware/auth';
import { workspaceController } from '../controllers/workspace';

const router = express.Router();

// @type POST
// @desc Route for saving a users workspace state
// @route /api/workspaces
// @access private
router.post('/', isAuthenticated, workspaceController.update);

// @type GET
// @desc Route for fetching workspaces belonging to a specific user
// @route /api/workspaces/:id
// @access public
router.get('/:id', workspaceController.index);

// @type DELETE
// @desc Route for deleting a workspace
// @route /api/workspaces/:id
// @access public
router.delete('/:id', isAuthenticated, workspaceController.delete);

export default router;
