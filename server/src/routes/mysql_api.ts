import { Router } from 'express';
import MysqlApiService, { getLineChartData } from '../service/mysql_api';
import { ErrCode } from '../common/exception';

const routes = Router();

routes.route('/device')
    .post(MysqlApiService.saveDevice)
    .delete(MysqlApiService.deleteDevice)
    .put(MysqlApiService.editDevice)

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
            return res.send({ code: 0, msg: 'success', data });
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