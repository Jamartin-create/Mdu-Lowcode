import { Sequelize, Options } from "sequelize";
import { MQ_OPTIONS } from "../../config/db";

/**
 * @description 创建数据库实例
 * @type {Sequelize}
 */
const sequelize = new Sequelize(MQ_OPTIONS);

export function mySQLInit() {
    sequelize
        .authenticate()
        .then(() => {
            console.log("Mysql 连接成功！");
        })
        .catch((e) => {
            console.error("Unable to connect to MySql", e);
        });
}

