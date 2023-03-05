import { BusinessBaseEntity } from '../db/mongoDB/schema/schemaType';


//新建数据表填充
export function initSchemaInfo(userId: string, desc?: string): Partial<BusinessBaseEntity> {
    return {
        createTime: new Date().getTime(),
        createUser: userId,
        updateTime: new Date().getTime(),
        updateUser: userId,
        description: desc
    }
}

//更新数据表填充
export function updateSchemaInfo(userId: string): Partial<BusinessBaseEntity> {
    return {
        updateTime: new Date().getTime(),
        updateUser: userId
    }
}