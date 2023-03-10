import { Request, ResType } from '../utils/request';

const api = '/api/v1'
type PromiseRes = Promise<ResType>;

export default class UserApi {
    static register(params: any): PromiseRes {
        return Request.post(`${api}/register/`, params)
    }
    static login(params: any): PromiseRes {
        return Request.post(`${api}/login/`, params)
    }
    static getUserInfo(): PromiseRes {
        return Request.get(`${api}/user`)
    }
}