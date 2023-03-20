import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

export default class CompApi {
    //查询物料列表
    static getCompList(): PromiseRes {
        return Request.get(`${v1}/comp/list`);
    }
}