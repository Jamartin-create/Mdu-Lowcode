import { CompSchema } from "../db/mongoDB/schema/business";
import { useModel } from '../db/mongoDB/index';
import { Request, Response, NextFunction } from 'express';
import { ErrCode } from '../common/exception';
import { guid } from '../utils/strHandler';
import { initSchemaInfo } from "../utils/dataFilled";
import { getUserInfo } from '../utils/auth';

const compModel = useModel('comp', CompSchema);

export default class ComponentService {
    //获取所有物料
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ret = await compModel.find();
            res.send({ code: 0, msg: 'success', data: ret });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }

    //新增物料
    static saveOne = (req: Request, res: Response, next: NextFunction) => {
        const { body: { compName, compTitle, compType, compProps, compStyles, dataSourceId } } = req;
        if (!compTitle || !compType || !compProps || !compStyles || (compType == "visualize" && !dataSourceId)) return next(ErrCode.PARAM_EXCEPTION);
        new compModel({
            compId: guid(),
            compName,
            compTitle,
            compType,
            compProps,
            compStyles,
            dataSourceId,
            ...initSchemaInfo(getUserInfo(req).userId)
        }).save(err => {
            if (err) {
                console.error(err.message);
                next(ErrCode.SELECT_MG_EXCEPTION);
                return;
            }
            res.send({ code: 0, msg: 'success' });
        })
    }
}