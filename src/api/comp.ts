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
}

export default class CompApi {
    //查询物料列表
    static getCompList(): PromiseRes {
        return Request.get(`${v1}/comp/list`);
    }
    //查询物料配置项
    static getCompProps(id: string): PromiseRes {
        return Request.get(`${v1}/comp/options?compId=${id}`);
    }
    //新增物料
    static saveComp(params: Partial<CompType>): PromiseRes {
        return Request.post(`${v1}/comp/`, params)
    }
    //删除物料
    static delComp(id: string): PromiseRes {
        return Request.delete(`${v1}/comp/?compId=${id}`);
    }
}