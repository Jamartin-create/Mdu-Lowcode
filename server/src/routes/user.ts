import { Router } from 'express'
import UserService from '../service/user';

const routes = Router();

routes.route('/check')
    .get(UserService.checkPwd)


export default routes;