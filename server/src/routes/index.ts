import { Router } from "express";
import UserService from '../service/user';
import { expressjwt } from "express-jwt";

const routes = Router();

routes.use(expressjwt({
    secret: 'salt',
    requestProperty: 'auth',
    algorithms: ['HS256']
}).unless({ path: ['/api/v1/login/', '/api/v1/register/'] }))

routes.get('/api/v1/login', UserService.userLogin)
routes.post('/api/v1/register', UserService.userRegister)
routes.route('/api/v1/user/')
    .get(UserService.userInfo)


export default routes;