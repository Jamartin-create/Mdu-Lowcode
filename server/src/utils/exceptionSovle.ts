import { NextFunction, Request, Response } from "express";
import MyErr, { MyError } from '../common/exception';

export function catchException(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err) {
        const { code, msg } = err instanceof MyError ? err : MyErr.EXCEUTE_EXCEPTION;
        res.send({ code, msg })
    }
    next(err);
}