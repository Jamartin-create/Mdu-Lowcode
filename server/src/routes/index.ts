import { Router } from "express";
import UserService from '../service/user';

const routes = Router();

routes.route('/api/v1/user/')
    .get(UserService.userLogin)
    .post(UserService.userRegister);


export default routes;