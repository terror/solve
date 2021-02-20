import { Request, Response } from 'express';
import { admin } from '../db/config';
import { statusCodes } from '../config/statusCodes';

export const userController = {
    index: async (_: Request, res: Response) => {
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
    },

    find: async (req: Request, res: Response) => {
        admin
            .auth()
            .getUser(req.params.id)
            .then((user) => {
                res.status(statusCodes.SUCCESS).send(user.toJSON());
            })
            .catch((err) => {
                res.status(statusCodes.SERVER_ERROR).send(err);
            });
    },

    create: async (req: Request, res: Response) => {
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
    },

    update: async (req: Request, res: Response) => {
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
    },

    delete: async (req: Request, res: Response) => {
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
    },
};
