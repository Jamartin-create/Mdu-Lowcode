/**
 * 针对项目中的组件列表进行存储
 */

import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

//字典分类接口
export interface GroupType {
    groupId: string,
    groupTitle: string,
    groupJson: any[]
}

export default class GroupApi {
    //查询物料
    static getGroup(groupId: string): PromiseRes {
        return Request.get(`${v1}/group/${groupId}`);
    }
    //保存物料组
    static saveGroup(params: Partial<GroupType>): PromiseRes {
        return Request.post(`${v1}/group`, params);
    }
    //编辑物料组
    static editGroup(params: Partial<GroupType>): PromiseRes {
        return Request.put(`${v1}/group`, params);
    }
}