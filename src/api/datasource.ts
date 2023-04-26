import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

export interface DataSourceType {
    dsId: string,
    dsTitle: string,
    dsStaticDatas: Object,
    dsApiPath: string,
    devId: string[] | string | null,
    dataCode: string | null,
}

export default class DataSourceApi {
    //根据id获取数据源
    static getOneById(id: string): PromiseRes {
        return Request.get(`${v1}/dataSource/${id}`);
    }
    //获取数据源列表
    static getList(): PromiseRes {
        return Request.get(`${v1}/dataSource`);
    }
    //新增数据源
    static saveOne(params: Partial<DataSourceType>): PromiseRes {
        return Request.post(`${v1}/dataSource`, params);
    }
    //删除数据源
    static delOne(id: string): PromiseRes {
        return Request.delete(`${v1}/dataSource?dsId=${id}`);
    }
    //编辑数据源
    static updateOne(params: Partial<DataSourceType>): PromiseRes {
        return Request.put(`${v1}/dataSource`, params);
    }
}