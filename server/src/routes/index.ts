import { Router } from "express";
import test from './test';

const routes = Router();

routes.use('/api/test', test);

export default routes;