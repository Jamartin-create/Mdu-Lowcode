import { Request, ResType } from '../utils/request';

const api = '/api/v1'

export default class UserApi {
    static register(params: any): Promise<ResType> {
        return Request.post(`${api}/register/`, params)
    }
}