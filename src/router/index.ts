import { Router, RouterHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { RouteMode } from '../enum';
import routes from './routes'

class MyRouter {
    private router: Router | undefined = undefined;

    constructor() {
        this.router = this.createRouter()
    }

    //根据配置文件定义路由模式
    private createRouterMode(): RouterHistory {
        if (import.meta.env.VITE_ROUTER_MODE == RouteMode.HISTORY) return createWebHistory();
        else return createWebHashHistory();
    }

    //生成Router
    private createRouter(): Router {
        return createRouter({
            history: this.createRouterMode(),
            routes: routes
        })
    }

    public getRouter(): Router {
        return this.router as Router;
    }
}

const router = new MyRouter();
export { router }
export default router.getRouter();