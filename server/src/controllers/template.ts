import { Request, Response } from 'express';
import { statusCodes } from '../config/statusCodes';
import { db } from '../db/config';

export const templateController = {
  index: async (req: Request, res: Response) => {
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
  },

  create: async (req: Request, res: Response) => {
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
  },

  delete: async (req: Request, res: Response) => {
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
  },
};
