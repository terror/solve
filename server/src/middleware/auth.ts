import { admin } from '../db/config';
import { Response, Request, NextFunction } from 'express';

const getAuthToken = (req: Request, _: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  )
    req.params.authToken = req.headers.authorization.split(' ')[1];
  else req.params.authToken = '';
  next();
};

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | void => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req.params;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.params.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

export default isAuthenticated;
