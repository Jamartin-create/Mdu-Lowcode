import { Schema } from "mongoose";
import { BusinessBaseEntity } from './schemaType';

export class MySchema {
    private schema: Schema;
    constructor(options: any) {
        this.schema = new Schema({
            ...options,
            createTime: Number,
            createUser: String,
            updateTime: Number,
            updateUser: String,
            description: String,
        })
    }
    public getSchema() {
        return this.schema;
    }
}

//新建数据表
export function initSchemaInfo(userId: string, desc?: string): Partial<BusinessBaseEntity> {
    return {
        createTime: new Date().getTime(),
        createUser: userId,
        updateTime: new Date().getTime(),
        updateUser: userId,
        description: desc
    }
}

//更新数据表
export function updateSchemaInfo(userId: string): Partial<BusinessBaseEntity> {
    return {
        updateTime: new Date().getTime(),
        updateUser: userId
    }
}