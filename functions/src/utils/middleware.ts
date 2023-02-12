import * as functions from 'firebase-functions';

export type Middleware = (
  req: functions.https.Request,
  res: functions.Response<unknown>,
  next: () => void,
) => void;

export const applyMiddleware = (
  req: functions.https.Request,
  res: functions.Response<unknown>,
  middlewareList: Middleware[],
) => {
  if (middlewareList.length === 0) {
    return;
  }

  const [middleware, ...rest] = middlewareList;

  middleware(req, res, () => applyMiddleware(req, res, rest));
};
