import { Router } from "express";
import test from './test';
import UserService from '../service/user';

const routes = Router();

routes.route('/api/v1/user/')
    .get(UserService.userLogin)
    .put(UserService.userRegister);

routes.use('/api/test', test);

export default routes;