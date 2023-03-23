import { CompSchema } from "../db/mongoDB/schema/business";
import { useModel } from '../db/mongoDB/index';
import { Request, Response, NextFunction } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { guid } from '../utils/strHandler';
import { initSchemaInfo } from "../utils/dataFilled";
import { getUserInfo } from '../utils/auth';
import mongoose from 'mongoose';
import Engine from '../plugin/lowcode-engine/index'
import { CompProp } from '../db/mongoDB/schema/schemaType';

const compModel = useModel('comp', CompSchema);

export default class ComponentService {
    //获取所有物料
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comps = await compModel.find();
            const ret = Engine.translateSchema(comps);
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
        exceptionOnSave(new compModel({
            compId: guid(),
            compName,
            compTitle,
            compType,
            compProps,
            compStyles,
            dataSourceId,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next);
    }
    //删除物料
    static delOne = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { compId } } = req;
        if (!compId) return next(ErrCode.PARAM_EXCEPTION);
        const session = await mongoose.connection.startSession();
        try {
            session.startTransaction();
            const comp = await compModel.findOne({ compId }).session(session);
            if (!comp) return next(ErrCode.COMP_NOT_FOUND_EXCEPTION);
            await comp.delete();
            await session.commitTransaction();
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e);
            next(ErrCode.EXCEUTE_EXCEPTION);
        } finally {
            session.endSession();
        }
    }
}