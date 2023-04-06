import { Router } from 'express';
import MysqlApiService from '../service/mysql_api';

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


export default routes;