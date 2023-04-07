import { Request, ResType } from '../utils/request';

const v1 = '/api/MQ';
type PromiseRes = Promise<ResType>;

export interface MQAPIType {
    url: string;
    options: any;
}

export default class MQAPIApi {
    //获取接口数据
    static getUrlData(params: MQAPIType): PromiseRes {
        return Request.get(`${v1}${params.url}`, params.options);
    }
}