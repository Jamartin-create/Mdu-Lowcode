import dotenv from 'dotenv';
import { Options } from 'sequelize';
//加载
dotenv.config();

//MongoDB配置
export const MG_URL = `mongodb://${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_NAME}`

/**
 * @description 数据库实例配置项
 * @type {Sequelize}
 */
export const MQ_OPTIONS: Options = {
    database: process.env.MQ_DB_NAME,
    username: process.env.MQ_USER_NAME,
    password: process.env.MQ_PWD,
    host: process.env.MQ_HOST,
    port: process.env.MQ_PORT as unknown as number,
    dialect: "mysql",
    timezone: process.env.MQ_TIMEZONE,
    logging: console.log,
};