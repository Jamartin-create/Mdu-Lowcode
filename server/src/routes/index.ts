import { Router } from "express";
import { expressjwt } from "express-jwt";
import userRoutes from "./user";
import itemRoutes from './items';
import groupRoutes from './group';
import componentRoutes from './component'
import dataSourceRoutes from './dataSource'

//v1版本路由
const v1 = Router();
v1.use(userRoutes);
v1.use(itemRoutes);
v1.use(groupRoutes);
v1.use(componentRoutes);
v1.use(dataSourceRoutes);


//路由
const routes = Router();

routes.use(expressjwt({
    secret: 'salt',
    requestProperty: 'auth',
    algorithms: ['HS256']
}).unless({ path: [/^\/api\/v1\/auth\/.*/] }))


routes.use('/api/v1', v1);

export default routes;