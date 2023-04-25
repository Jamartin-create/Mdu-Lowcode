import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

export interface CompType {
    compId: string | null;
    compName: string | null;
    compTitle: string | null;
    compType: string | null;
    dataSourceId: string | null;
    compProps: any[];
    compStyles: any[];
    compDts: any[];
}

export default class CompApi {
    //查询物料列表（物料管理界面调用）
    static getCompTable(): PromiseRes {
        return Request.get(`${v1}/comp/table`)
    }
    //查询物料列表（项目初始化时调用）
    static getCompList(): PromiseRes {
        return Request.get(`${v1}/comp/list`);
    }
    //查询物料配置项
    static getCompProps(id: string): PromiseRes {
        return Request.get(`${v1}/comp/options?compId=${id}`);
    }
    //查询物料
    static getComp(id: string): PromiseRes {
        return Request.get(`${v1}/comp?compId=${id}`);
    }
    //新增物料
    static saveComp(params: Partial<CompType>): PromiseRes {
        return Request.post(`${v1}/comp/`, params)
    }
    //新增物料2
    static saveComp2(params: Partial<CompType>): PromiseRes {
        return Request.post(`${v1}/comp/save`, params)
    }
    //更新物料
    static updateComp(params: Partial<CompType>): PromiseRes {
        return Request.put(`${v1}/comp`, params);
    }
    //删除物料
    static delComp(id: string): PromiseRes {
        return Request.delete(`${v1}/comp?compId=${id}`);
    }
}