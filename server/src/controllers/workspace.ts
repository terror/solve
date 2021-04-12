import { Request, Response } from 'express';
import { admin, db } from '../db/config';
import { statusCodes } from '../config/statusCodes';

export const workspaceController = {
  index: async (req: Request, res: Response) => {
    const data: unknown[] = [];

    db.collection('workspaces')
      .where('userId', '==', req.params.id)
      .get()
      .then((snap) => {
        if (snap.empty) {
          res.status(statusCodes.NOT_FOUND).send('No such document exists.');
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
  },

  update: async (req: Request, res: Response) => {
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
  },

  delete: async (req: Request, res: Response) => {
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
  },
};
