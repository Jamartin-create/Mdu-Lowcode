import { Router } from "express";
import ItemService from "../service/items";

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

export default routes;