import { NextFunction, Response, Router } from 'express'
import Pie from './pie';
import Line from './line';
import { Request } from 'express-jwt';
import { ErrCode } from '../../common/exception';
import Scatter from './scatter';
import Bar from './bar';
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
pieRouter.get('/normalPie', (req, res, next) => functionRes(req, res, next, Pie.normalPie));
pieRouter.get('/customPie', (req, res, next) => functionRes(req, res, next, Pie.customPie));
pieRouter.get('/basicRosePie', (req, res, next) => functionRes(req, res, next, Pie.basicRosePie));

const lineRouter = Router();
lineRouter.get('/oneWeekRainRate', (req, res, next) => functionRes(req, res, next, Line.oneWeekRainRate));
lineRouter.get('/lastFiveDaysRain', (req, res, next) => functionRes(req, res, next, Line.lastFiveDaysRain));
lineRouter.get('/stackLine', (req, res, next) => functionRes(req, res, next, Line.stackLine));
lineRouter.get('/stackAreaChart', (req, res, next) => functionRes(req, res, next, Line.stackAreaChart));
lineRouter.get('/gradientStackedAreaChart', (req, res, next) => functionRes(req, res, next, Line.gradientStackedAreaChart));
lineRouter.get('rainfallVsEvaporation', (req, res, next) => functionRes(req, res, next, Line.rainfallVsEvaporation));

const scatterRouter = Router();
scatterRouter.get('/baseScatter', (req, res, next) => functionRes(req, res, next, Scatter.baseScatter));
scatterRouter.get('/rippleScatter', (req, res, next) => functionRes(req, res, next, Scatter.rippleScatter));
scatterRouter.get('/getScatter1Option', (req, res, next) => functionRes(req, res, next, Scatter.getScatter1Option));
scatterRouter.get('/shanghaiIndexKLine', (req, res, next) => functionRes(req, res, next, Scatter.shanghaiIndexKLine));
scatterRouter.get('/touchKLine', (req, res, next) => functionRes(req, res, next, Scatter.touchKLine));

const barRouter = Router();
barRouter.get('/rainfallVsEvaporation', (req, res, next) => functionRes(req, res, next, Bar.rainfallVsEvaporation));
barRouter.get('/multiYAxis', (req, res, next) => functionRes(req, res, next, Bar.multiYAxis));
barRouter.get('/mixLineBar', (req, res, next) => functionRes(req, res, next, Bar.mixLineBar));
barRouter.get('/globalEconomy', (req, res, next) => functionRes(req, res, next, Bar.globalEconomy));

routes.use('/pie', pieRouter);
routes.use('/line', lineRouter);
routes.use('/bar', barRouter);
routes.use('/scatter', scatterRouter);

export default routes;