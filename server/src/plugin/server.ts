import morgan from 'morgan'
import express from 'express'
import { catchException } from '../utils/exceptionSovle'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import routes from '../routes/index'
import dotenv from 'dotenv'
dotenv.config()

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
        this.app.use(catchException)
    }
    /**
     * @description 启动服务
     */
    public startServer() {
        this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`Express Server lisenting on port ${process.env.SERVER_PORT}`)
        })
    }
}