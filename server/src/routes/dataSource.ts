import { Router } from 'express'
import DataSourceService from '../service/dataSource';

const routes = Router();

routes.route('/dataSource')
    .post(DataSourceService.saveDS)
    .put(DataSourceService.editDS);

export default routes;