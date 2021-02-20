import express from 'express';
import isAuthenticated from '../middleware/auth';
import { userController } from '../controllers/user';

const router = express.Router();

// @type GET
// @desc Route for retrieving all users
// @route /api/users
// @access public
router.get('/', userController.index);

// @type GET
// @desc Route for retrieving a single user
// @route /api/users/:id
// @access public
router.get('/:id', userController.find);

// @type POST
// @desc Route for creating a new user
// @route /api/users
// @access public
router.post('/', userController.create);

// @type PUT
// @desc Route for updating a user
// @route /api/users/:id
// @access private
router.put('/', isAuthenticated, userController.update);

// @type DELETE
// @desc Route for deleting a user
// @route /api/users/:id
// @access private
router.delete('/', isAuthenticated, userController.delete);

export default router;
