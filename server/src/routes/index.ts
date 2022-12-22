import { Router } from "express";
import user from './user';

const routes = Router();

routes.use('/api/user', user);
routes.get('/', (req, res) => {
    res.send('ok')
})

export default routes;