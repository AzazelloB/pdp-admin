import * as functions from 'firebase-functions';
import * as cors from 'cors';

import { applyMiddleware, Middleware } from './middleware';

const corsHandler = cors({ origin: true });

type Handler = (
  req: functions.https.Request,
  res: functions.Response<unknown>
) => Promise<unknown>;

export const createRequest = (handler: Handler, middlewareList: Middleware[] = []) => {
  return functions.region('europe-west2').https.onRequest((req, res) => {
    corsHandler(req, res, () => {
      const target = async () => {
        const result = await handler(req, res);

        res.send(result);
      };

      applyMiddleware(req, res, [...middlewareList, target]);
    });
  });
};
