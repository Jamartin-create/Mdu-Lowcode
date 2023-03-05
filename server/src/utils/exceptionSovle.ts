import { NextFunction, Request, Response } from "express";
import MyErr, { MyError } from '../common/exception';

export function catchException(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err) {
        let e = err instanceof MyError ? err : MyErr.EXCEUTE_EXCEPTION;
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            e = MyErr.FORBIDEN_TOKEN_EXCPETION;
        }
        const { code, msg } = e;
        res.send({ code, msg })
    }
    next(err);
}