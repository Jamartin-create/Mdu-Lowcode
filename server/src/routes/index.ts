import { Router } from "express";
import { expressjwt } from "express-jwt";
import userRoutes from "./user";
import itemRoutes from './items'

//v1版本路由
const v1 = Router();
v1.use(userRoutes);
v1.use(itemRoutes);


//路由
const routes = Router();

routes.use(expressjwt({
    secret: 'salt',
    requestProperty: 'auth',
    algorithms: ['HS256']
}).unless({ path: ['/api/v1/login/', '/api/v1/register/'] }))


routes.use('/api/v1', v1);

export default routes;