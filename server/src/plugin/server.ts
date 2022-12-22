import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import routes from '../routes/index'

export default class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.initServer();
    }
    /**
     * @description 初始化服务器
     */
    private initServer() {
        this.app.use(cors())
        this.app.use(json())
        this.app.use(urlencoded({ extended: false }))
        this.app.use(morgan('dev'))
        this.app.use(routes)
    }
}