import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

export interface DataSourceType {
    dsId: string,
    dsTitle: string,
    dsStaticDatas: Object,
    dsApiPath: string,
}

export default class DataSourceApi {
    //获取数据源列表
    static getList(): PromiseRes {
        return Request.get(`${v1}/dataSource`);
    }
    //新增数据源
    static saveOne(params: Partial<DataSourceType>): PromiseRes {
        return Request.post(`${v1}/dataSource`, params);
    }
}