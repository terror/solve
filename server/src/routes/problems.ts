import express from 'express';
import { problemController } from '../controllers/problem';

const router = express.Router();

// @type GET
// @desc Fetch problem information from a contest website
// @route /api/problems
// @access public
router.get('/', problemController.index);

export default router;
