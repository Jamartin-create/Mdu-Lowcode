import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

export interface DataSourceType {
    dsId: string,
    dsTitle: string,
    dsNumbers: number,
    dsColumns: string[],
    dsStaticDatas: number[][],
    dsApiPath: string,
    dsPath: string,
}

export default class DataSourceApi {
    //获取数据源列表
    static getList(): PromiseRes {
        return Request.get(`${v1}/dataSource`);
    }
}