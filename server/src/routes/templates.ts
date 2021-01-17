import express, { Request, Response } from 'express';
import isAuthenticated from '../middleware/auth';
import { db } from '../../index';
import { statusCodes } from '../config/statusCodes';

const router = express.Router();

// @type GET
// @desc Route for retrieving a users templates
// @route /api/templates/:id
// @access public
router.get('/:id', (req: Request, res: Response) => {
    const data: unknown[] = [];

    db.collection('templates')
        .where('userId', '==', req.params.id)
        .get()
        .then((snap) => {
            if (snap.empty) {
                return res
                    .status(statusCodes.NOT_FOUND)
                    .send('No such document exists.');
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

// @type POST
// @desc Route for adding a template
// @route /api/templates
// @access private
router.post('/', isAuthenticated, (req: Request, res: Response) => {
    const id = req.params.authId;

    const {
        name,
        body,
        lang,
    }: { name: string; body: string; lang: string } = req.body;

    db.collection('templates')
        .add({
            userId: id,
            name: name,
            body: body,
            lang: lang,
        })
        .then((result) => {
            return res.status(statusCodes.SUCCESS).send(result);
        })
        .catch((err) => {
            return res.status(statusCodes.NOT_FOUND).send(err);
        });
});

// @type DELETE
// @desc Route for deleting a template
// @route /api/templates/:id
// @access private
router.delete('/:id', isAuthenticated, (req: Request, res: Response) => {
    const id = req.params.id;
    db.collection('templates')
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
