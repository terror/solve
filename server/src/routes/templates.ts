import express from 'express';
import isAuthenticated from '../middleware/auth';
import { templateController } from '../controllers/template';

const router = express.Router();

// @type GET
// @desc Route for retrieving a users templates
// @route /api/templates/:id
// @access public
router.get('/:id', templateController.index);

// @type POST
// @desc Route for adding a template
// @route /api/templates
// @access private
router.post('/', isAuthenticated, templateController.create);

// @type DELETE
// @desc Route for deleting a template
// @route /api/templates/:id
// @access private
router.delete('/:id', isAuthenticated, templateController.delete);

export default router;
