import { Sequelize, Options } from "sequelize";
import { MQ_OPTIONS } from "../../config/db";

/**
 * @description 创建数据库实例
 * @type {Sequelize}
 */
export const sequelize = new Sequelize(MQ_OPTIONS);

//初始化数据库并连接
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

//初始化Model
export function initModel(tableName: string, columns: any, options?: any) {
    return sequelize.define(tableName, columns, {
        timestamps: false,
        ...options,
        tableName: tableName,
    });
}