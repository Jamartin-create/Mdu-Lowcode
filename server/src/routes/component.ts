import { Router } from 'express'
import ComponentService from '../service/component'

const routes = Router();

routes.get('/comp/list', ComponentService.getList);
routes.route('/comp')
    .get(ComponentService.getTable)
    .post(ComponentService.saveOne)
    .delete(ComponentService.delOne);

routes.route('/comp/options')
    .get(ComponentService.getCompProps);

routes.post('/comp/save', ComponentService.saveOneNew);

export default routes;