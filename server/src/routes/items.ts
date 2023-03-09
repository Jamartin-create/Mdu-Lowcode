import { Router } from "express";
import ItemService from "../service/items";

const routes = Router();

//获取项目列表
routes.get('/item/list', ItemService.getList)

//项目的CU
routes.route('/item')
    .post(ItemService.saveItem)
    .put(ItemService.editItem)
    .delete(ItemService.delItem);

export default routes;