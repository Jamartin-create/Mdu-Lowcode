import { MG_URL } from "../../config/db";
import mongoose, { Schema } from "mongoose";
/**
 * @description 连接MongoDB服务
 */
export function connect(): void {
    mongoose.connect(MG_URL, err => {
        if (err) console.log(err);
        else console.log('MongoDB连接成功')
    })
}

/**
 * @description 创建Model
 * @param collectionName 集合名称
 * @param schema 集合格式
 * @returns Model
 */
export function useModel(collectionName: string, schema: Schema) {
    return mongoose.model(collectionName, schema);
}

