import { Router } from 'express';
import UserService from '../service/user';

const routes = Router();

//登录注册
routes.post('/auth/login', UserService.userLogin)
routes.post('/auth/register', UserService.userRegister)

//用户信息CRUD
routes.route('/user')
    .get(UserService.userInfo);

export default routes;