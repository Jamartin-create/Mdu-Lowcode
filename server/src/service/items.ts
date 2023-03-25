import { useModel } from "../db/mongoDB";
import { ItemSchema } from '../db/mongoDB/schema/business';
import { NextFunction, Request, Response } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { getUserInfo } from '../utils/auth';
import { Item } from '../db/mongoDB/schema/schemaType';
import { guid } from '../utils/strHandler';
import { initSchemaInfo, updateSchemaInfo } from '../utils/dataFilled';

const ItemModel = useModel('item', ItemSchema);

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
    //查询列表
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        const user = getUserInfo(req);
        const ret = await ItemModel.find({ 'userId': user.userId });
        res.send({ code: 0, msg: 'success', data: ret });
    }

    //根据Id查询项目
    static getById = async (req: Request, res: Response, next: NextFunction) => {
        const { params: { itemId } } = req;
        try {
            const [item] = await ItemModel.find({ "itemId": itemId });
            console.log(item);
            if (!item) return next(ErrCode.ITEM_NOT_FOUND_EXCEPTION);
            res.send({ code: 0, msg: 'success', data: item });
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
                itemPublic: itemPublic || item.itemPublic,
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
        const { body: { itemId } } = req;
        if (!itemId) return next(ErrCode.PARAM_EXCEPTION);
        const [item] = await ItemModel.find({ itemId });
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