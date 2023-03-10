import { Request, ResType } from '../utils/request';

const v1 = '/api/v1';
type PromiseRes = Promise<ResType>;

export interface ItemType {
    itemId: String,
    itemTitle: String,
    itemPublic: Boolean,
    itemDescription: String,
    itemPublicPage: String,
    userId: String,
    groupId: String,
}

export default class ItemApi {
    static getAllItem(): PromiseRes {
        return Request.get(`${v1}/item/list`);
    }
    static getItemById(id: string): PromiseRes {
        return Request.get(`${v1}/item/${id}`)
    }
    static saveItem(params: Partial<ItemType>): PromiseRes {
        return Request.post(`${v1}/item/`, params);
    }
}