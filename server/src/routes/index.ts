import { Router } from "express";
import { expressjwt } from "express-jwt";
import userRoutes from "./user";
import itemRoutes from './items';
import groupRoutes from './group';
import componentRoutes from './component'
import dataSourceRoutes from './dataSource'
import DictRoutes from './dict'
import mysql_api from './mysql_api'
import example from './exampleAPI';

//v1版本路由
const v1 = Router();
v1.use(userRoutes);
v1.use(itemRoutes);
v1.use(groupRoutes);
v1.use(componentRoutes);
v1.use(dataSourceRoutes);
v1.use(DictRoutes);

//MySQL数据库部分路由
const MQ = Router();
MQ.use(mysql_api);

//示例数据
const EXAMP = Router();
EXAMP.use(example);

//路由
const routes = Router();

routes.use(expressjwt({
    secret: 'salt',
    requestProperty: 'auth',
    algorithms: ['HS256']
}).unless({ path: [/^\/api\/v1\/auth\/.*/, /^\/api\/MQ\/.*/, , /^\/api\/example\/.*/] }))


routes.use('/api/v1', v1);
routes.use('/api/MQ', MQ);
routes.use('/api/MQ/examp', EXAMP);

export default routes;