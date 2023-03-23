import { Router } from 'express'
import ComponentService from '../service/component'

const routes = Router();

routes.get('/comp/list', ComponentService.getList);
routes.route('/comp')
    .post(ComponentService.saveOne)
    .delete(ComponentService.delOne);

routes.route('/comp/options')
    .get(ComponentService.getCompProps);

export default routes;