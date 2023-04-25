import { Router } from 'express'
import ComponentService from '../service/component'

const routes = Router();

routes.get('/comp/table', ComponentService.getTable);
routes.get('/comp/list', ComponentService.getList);
routes.route('/comp')
    .get(ComponentService.getCompById)
    .post(ComponentService.saveOne)
    .put(ComponentService.updateOne)
    .delete(ComponentService.delOne);

routes.route('/comp/options')
    .get(ComponentService.getCompProps);

routes.post('/comp/save', ComponentService.saveOneNew);

export default routes;