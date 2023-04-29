import { Router } from "express";
import ItemService from "../service/items";
import multer from 'multer';
import path from "path";


function fileFilter(req: any, file: any, cb: Function) {
    const ext = path.extname(file.originalname)
    const whiteList = ['.json']
    if (whiteList.includes(ext)) {
        cb(null, true)
    } else {
        cb(new Error(`your ext ${ext} is not be supported`))
    }
}

const upload = multer({
    fileFilter,
})

const routes = Router();

//获取项目列表
routes.get('/item/list', ItemService.getList)

//获取已发布的项目列表
routes.get('/item/publish', ItemService.getPublishList)

//项目的CU
routes.get('/item/:itemId', ItemService.getById)
routes.route('/item')
    .post(ItemService.saveItem)
    .put(ItemService.editItem)
    .delete(ItemService.delItem);

//项目的json导出导入
routes.get('/item/:itemId/json', ItemService.exportJson);
routes.post('/item/json', upload.single('json'), ItemService.importJson);
export default routes;