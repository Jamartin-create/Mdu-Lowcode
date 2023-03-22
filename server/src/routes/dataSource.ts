import { Router } from 'express'
import DataSourceService from '../service/dataSource';

const routes = Router();

routes.route('/dataSource')
    .get(DataSourceService.getList)
    .post(DataSourceService.saveDS)
    .put(DataSourceService.editDS);

export default routes;