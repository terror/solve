import express, { Request, Response } from 'express';
import { admin, db } from '../../index';
import isAuthenticated from '../middleware/auth';
import { statusCodes } from '../config/statusCodes';

const router = express.Router();

// @type POST
// @desc Route for adding a users workspace state
// @route /api/workspaces
// @access private
router.post('/', isAuthenticated, (req: Request, res: Response) => {
    const id: string = req.params.authId;
    const { editor, problem } = req.body;

    const workspaceObject = {
        userId: id,
        editor: editor,
        problem: problem,
    };

    try {
        admin.firestore().collection('/workspaces').add(workspaceObject);
        return res
            .status(statusCodes.SUCCESS)
            .send('Workspace saved successfully.');
    } catch (err) {
        return res.status(statusCodes.SERVER_ERROR).send(err);
    }
});

// @type GET
// @desc Route for fetching workspaces belonging to a specific user
// @route /api/workspaces/:id
// @access public
router.get('/:id', (req: Request, res: Response) => {
    const data: unknown[] = [];

    db.collection('workspaces')
        .where('userId', '==', req.params.id)
        .get()
        .then((snap) => {
            if (snap.empty) {
                res.status(statusCodes.NOT_FOUND).send(
                    'No such document exists.'
                );
                return;
            }
            snap.docs.forEach((doc) => {
                const docData = doc.data();
                docData.id = doc.id;
                data.push(docData);
            });
            return res.status(statusCodes.SUCCESS).send(data);
        })
        .catch((err) => {
            return res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

// @type DELETE
// @desc Route for deleting a workspace
// @route /api/workspaces/:id
// @access public
router.delete('/:id', isAuthenticated, (req: Request, res: Response) => {
    const id = req.params.id;
    db.collection('workspaces')
        .doc(id)
        .delete()
        .then((result) => {
            return res.status(statusCodes.SUCCESS).send(result);
        })
        .catch((err) => {
            return res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

export default router;
