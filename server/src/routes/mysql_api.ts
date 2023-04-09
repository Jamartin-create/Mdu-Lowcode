import { Router } from 'express';
import MysqlApiService, { getBarChartData, getLineChartData, getMultiLineChartSql, getMultipleDevice } from '../service/mysql_api';
import { ErrCode } from '../common/exception';

const routes = Router();

routes.get('/device/list', MysqlApiService.getDeviceList)
routes.route('/device')
    .post(MysqlApiService.saveDevice)
    .delete(MysqlApiService.deleteDevice)
    .put(MysqlApiService.editDevice)

routes.get('/data/list', MysqlApiService.getDataList)
routes.route('/data')
    .post(MysqlApiService.saveData)
    .delete(MysqlApiService.deleteData)
    .put(MysqlApiService.editData)

routes.route('/value')
    .post(MysqlApiService.saveValue)
    .delete(MysqlApiService.deleteValue)

routes.get('/statistics', MysqlApiService.getStatistics)

//单一数据源折线图（按时间分类）
routes.get('/line/singleData', async function (req, res, next) {
    try {
        const { dev_id, data_code, start_time, end_time } = req.query;
        if (!dev_id || !data_code) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const data = await getLineChartData(dev_id as string, data_code as string, start_time as string, end_time as string, next);
            res.send({ code: 0, msg: 'success', data });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    } catch (e) {
        console.log(e);
        return next(ErrCode.SELECT_MQ_EXCEPTION);
    }
});

//多数据源折线图（按时间分类）
routes.get('/line/multiData', async function (req, res, next) {
    try {
        const { dev_id, data_code, start_time, end_time } = req.query;
        if (!dev_id || !data_code) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const data = await getMultiLineChartSql((dev_id as string).split(","), data_code as string, start_time as string, end_time as string, next);
            res.send({ code: 0, msg: 'success', data });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    } catch (e) {
        console.log(e);
        return next(ErrCode.SELECT_MQ_EXCEPTION);
    }
});

//单设备多数据字段条形图（近一周数据）
routes.get('/pie/multiData', async function (req, res, next) {
    try {
        const { dev_id } = req.query;
        if (!dev_id) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const data = await getBarChartData(dev_id as string);
            res.send({ code: 0, msg: 'success', data });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    } catch (e) {
        console.log(e);
        return next(ErrCode.SELECT_MQ_EXCEPTION);
    }
});

//多设备多数据字段条形图（近一个月数据）
routes.get('/pie/multiDevice', async function (req, res, next) {
    try {
        const { dev_id } = req.query;
        if (!dev_id) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const data = await getMultipleDevice(dev_id as string);
            res.send({ code: 0, msg: 'success', data });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    } catch (e) {
        console.log(e);
        return next(ErrCode.SELECT_MQ_EXCEPTION);
    }
});

export default routes;