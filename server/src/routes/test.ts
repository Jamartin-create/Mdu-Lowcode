import { Router } from 'express'
import TestService from '../service/test';

const routes = Router();

routes.route('/')
    .get(TestService.testGet)
    .post(TestService.testPost)


export default routes;