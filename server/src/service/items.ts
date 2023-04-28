import { useModel } from "../db/mongoDB";
import { ItemSchema } from '../db/mongoDB/schema/business';
import { NextFunction, Request, Response } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { getUserInfo } from '../utils/auth';
import { Item } from '../db/mongoDB/schema/schemaType';
import { guid } from '../utils/strHandler';
import { initSchemaInfo, updateSchemaInfo } from '../utils/dataFilled';
import { getGROUP_BYID } from "./group";
import { UserModel } from "./user";

export const ItemModel = useModel('item', ItemSchema);

/**
 * 项目基础信息填充
 * @param uid 所属用户id
 * @param groupId 组件组合id
 * @returns 
 */
function fillItemInfo(uid: string, groupId: string): Partial<Item> {
    return {
        itemId: guid(),
        itemPublic: false,
        itemPublicPage: null,
        userId: uid,
        groupId: groupId,
        ...initSchemaInfo(uid)
    }
}

export default class ItemService {
    //获取已发布的项目列表
    static getPublishList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ret: any[] = await ItemModel.find({ 'itemPublic': true }, {}, { sort: { createTime: -1 } });
            Promise.all(ret.map(item => {
                //获取项目所属用户基本信息
                return new Promise(async (resolve, reject) => {
                    try {
                        const user = await UserModel.findOne({ 'userId': item.userId }, { 'userName': 1 });
                        const v = JSON.parse(JSON.stringify(item));
                        v.userName = user.userName;
                        resolve(v);
                    } catch (e) {
                        reject(e);
                    }
                });
            })).then((r: any[]) => {
                console.log(r[0])
                res.send({ code: 0, msg: 'success', data: r });
            }).catch(e => {
                console.error(e);
                next(ErrCode.EXCEUTE_EXCEPTION);
            });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }
    //查询列表
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        const user = getUserInfo(req);
        const ret = await ItemModel.find({ 'userId': user.userId }, {}, { sort: { createTime: -1 } });
        res.send({ code: 0, msg: 'success', data: ret });
    }

    //根据Id查询项目
    static getById = async (req: Request, res: Response, next: NextFunction) => {
        const { params: { itemId } } = req;
        try {
            const item = await ItemModel.findOne({ "itemId": itemId });
            if (!item) return next(ErrCode.ITEM_NOT_FOUND_EXCEPTION);
            const group = await getGROUP_BYID(item.groupId);
            if (!group) return next(ErrCode.GROUP_NOT_FOUD_EXCEPTION);
            res.send({ code: 0, msg: 'success', data: { item, group } });
        } catch (e) {
            console.error(e);
            next(ErrCode.EXCEUTE_EXCEPTION);
        }
    }

    //新增
    static saveItem = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { itemTitle, itemDescription, groupId } } = req;
        if (!itemTitle) return next(ErrCode.PARAM_EXCEPTION);
        const user = getUserInfo(req);
        const itemOptions = {
            itemTitle: itemTitle,
            itemDescription: itemDescription || '',
            ...fillItemInfo(user.userId, groupId),
        }
        exceptionOnSave(new ItemModel(itemOptions), res, next, (options: any) => {
            res.send({
                ...options,
                data: itemOptions
            })
        });
    }

    //编辑
    static editItem = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { itemTitle, itemDescription, itemId, itemPublic, itemPublicPage } } = req;
        if (!itemId) return next(ErrCode.PARAM_EXCEPTION);
        const [item] = await ItemModel.find({ itemId });
        if (!item) return next(ErrCode.ITEM_NOT_FOUND_EXCEPTION);
        try {
            await ItemModel.updateOne({ itemId }, {
                itemTitle: itemTitle || item.itemTitle,
                itemDescription: itemDescription || item.itemDescription,
                itemPublic: typeof itemPublic != 'boolean' ? item.itemPublic : itemPublic,
                itemPublicPage: itemPublicPage || item.itemPublicPage,
                ...updateSchemaInfo(getUserInfo(req).userId)
            })
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e.message);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }

    //删除
    static delItem = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { itemId } } = req;
        if (!itemId) return next(ErrCode.PARAM_EXCEPTION);
        const item = await ItemModel.findOne({ itemId });
        if (!item) return next(ErrCode.ITEM_NOT_FOUND_EXCEPTION);
        try {
            await ItemModel.deleteOne({ itemId });
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e.message);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }
}