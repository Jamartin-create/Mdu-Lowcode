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
    //获取设备列表
    static getDeviceList(): PromiseRes {
        return Request.get(`${v1}/device/list`);
    }
    //获取数据列表 
    static getDataList(): PromiseRes {
        return Request.get(`${v1}/data/list`);
    }
}