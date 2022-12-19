import axios from '../plugins/axios'
import qs from 'qs'

export class Request {
    static get = (url: string, params?: any) => {
        return new Promise((reso, reje) => {
            axios.get(url, { params: params }).then(res => {
                reso(res);
            }).catch(err => {
                reje(err);
            })
        })
    }
    static post = (url: string, params?: any) => {
        return new Promise((reso, reje) => {
            axios.post(url, qs.stringify(params)).then(res => {
                reso(res);
            }).catch(err => {
                reje(err);
            })
        })
    }
}