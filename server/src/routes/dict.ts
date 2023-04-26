import { Router } from 'express';
import DictService from '../service/dict';

const routes = Router();

routes.route('/dict/type')
    .get(DictService.getDictType)
    .post(DictService.saveDictType)
    .put(DictService.updateDict)
    .delete(DictService.delDict);

routes.route('/dict/entry')
    .get(DictService.getDictEntry)
    .post(DictService.saveDictEntry);

routes.post('/dict/entry/saveBatch', DictService.saveBatchDictEntry);

export default routes;