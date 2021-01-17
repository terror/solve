import express, { Request, Response } from 'express';
import isAuthenticated from '../middleware/auth';
import { admin } from '../../index';
import { statusCodes } from '../config/statusCodes';

const router = express.Router();

// @type GET
// @desc Route for retrieving all users
// @route /api/users
// @access public
router.get('/', (_: unknown, res: Response) => {
    admin
        .auth()
        .listUsers(1000)
        .then((result) => {
            const response: unknown[] = [];
            result.users.forEach((user) => {
                response.push(user.toJSON());
            });
            res.status(statusCodes.SUCCESS).send(response);
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

// @type GET
// @desc Route for retrieving a single user
// @route /api/users/:id
// @access public
router.get('/:id', (req: Request, res: Response) => {
    admin
        .auth()
        .getUser(req.params.id)
        .then((user) => {
            res.status(statusCodes.SUCCESS).send(user.toJSON());
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

// @type POST
// @desc Route for creating a new user
// @route /api/users
// @access public
router.post('/', (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    admin
        .auth()
        .createUser({
            email: email,
            emailVerified: false,
            password: password,
            displayName: `${firstName} ${lastName}`,
        })
        .then((user) => {
            res.status(statusCodes.SUCCESS).send(user);
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

// @type PUT
// @desc Route for updating a user
// @route /api/users/:id
// @access private
router.put('/', isAuthenticated, (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    admin
        .auth()
        .updateUser(req.params.authId, {
            email: email,
            emailVerified: true,
            password: password,
            displayName: `${firstName} ${lastName}`,
        })
        .then((user) => {
            res.status(statusCodes.SUCCESS).send(user.toJSON());
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

// @type DELETE
// @desc Route for deleting a user
// @route /api/users/:id
// @access private
router.delete('/', isAuthenticated, (req: Request, res: Response) => {
    admin
        .auth()
        .deleteUser(req.params.authId)
        .then(() => {
            res.status(statusCodes.SUCCESS).send(
                `Successfully deleted user with id: ${req.params.id}`
            );
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

export default router;
