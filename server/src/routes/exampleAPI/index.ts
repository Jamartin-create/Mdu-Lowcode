import { NextFunction, Response, Router } from 'express'
import Pie from './pie';
import Line from './line';
import { Request } from 'express-jwt';
import { ErrCode } from '../../common/exception';
const routes = Router();
function functionRes(req: Request, res: Response, next: NextFunction, callBack: Function) {
    try {
        const ret = callBack();
        res.send({ code: 0, msg: 'success', data: ret })
    } catch (e) {
        console.log(e);
        return next(ErrCode.EXCEUTE_EXCEPTION);
    }
}

const pieRouter = Router();
pieRouter.get('/firstNameRate', (req, res, next) => functionRes(req, res, next, Pie.firstNameRate));

const lineRouter = Router();
lineRouter.get('/oneWeekRainRate', (req, res, next) => functionRes(req, res, next, Line.oneWeekRainRate));

routes.use('/pie', pieRouter);
routes.use('/line', lineRouter);

export default routes;