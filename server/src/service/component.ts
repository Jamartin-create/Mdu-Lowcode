import { CompSchema } from "../db/mongoDB/schema/business";
import { useModel } from '../db/mongoDB/index';
import { Request, Response, NextFunction } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { guid } from '../utils/strHandler';
import { initSchemaInfo } from "../utils/dataFilled";
import { getUserInfo } from '../utils/auth';
import mongoose from 'mongoose';
import Engine from '../plugin/lowcode-engine/index';

const compModel = useModel('comp', CompSchema);

async function getAllList() {
    return await compModel.find();
}

export default class ComponentService {
    //获取所有物料
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comps = await getAllList();
            const ret = Engine.translateSchema(comps);
            res.send({ code: 0, msg: 'success', data: ret });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }
    //获取物料列表
    static getTable = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comps = await getAllList();
            res.send({ code: 0, msg: 'success', data: comps });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }

    //根据id获取物料Props
    static getCompProps = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { query: { compId } } = req;
            if (!compId) return next(ErrCode.PARAM_EXCEPTION);
            const comp = await compModel.findOne({ compId });
            if (!comp) return next(ErrCode.COMP_NOT_FOUND_EXCEPTION);
            res.send({
                code: 0, msg: 'success', data: {
                    props: comp.compProps,
                    styles: comp.compStyles,
                    type: comp.compType,
                    dsId: comp.dataSourceId
                }
            });
        } catch (e) {

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