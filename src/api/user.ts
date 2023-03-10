import { Request, ResType } from '../utils/request';

const v1 = '/api/v1'
type PromiseRes = Promise<ResType>;

export default class UserApi {
    static register(params: any): PromiseRes {
        return Request.post(`${v1}/auth/register/`, params)
    }
    static login(params: any): PromiseRes {
        return Request.post(`${v1}/auth/login/`, params)
    }
    static getUserInfo(): PromiseRes {
        return Request.get(`${v1}/user`)
    }
}