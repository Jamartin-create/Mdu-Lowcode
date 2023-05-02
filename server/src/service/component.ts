import { CompSchema } from "../db/mongoDB/schema/business";
import { useModel } from '../db/mongoDB/index';
import { Request, Response, NextFunction } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { guid } from '../utils/strHandler';
import { initSchemaInfo, updateSchemaInfo } from "../utils/dataFilled";
import { getUserInfo } from '../utils/auth';
import mongoose from 'mongoose';
import Engine from '../plugin/lowcode-engine/index';
import { Props } from "../plugin/lowcode-engine/schemaTrans";

const compModel = useModel('comp', CompSchema);

async function getAllList(isSort?: boolean, options: any = {}) {
    if (!isSort) return await compModel.find(options);
    // 以下代码为了解决物料排序问题
    return await compModel.find({}).sort({ createTime: -1 });
}

export default class ComponentService {
    //获取所有物料
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comps = await getAllList(false);
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
            const comps = await getAllList(true);
            res.send({ code: 0, msg: 'success', data: comps });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }

    //根据id获取物料
    static getCompById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { query: { compId } } = req;
            if (!compId) return next(ErrCode.PARAM_EXCEPTION);
            const comp = await compModel.findOne({ compId });
            if (!comp) return next(ErrCode.COMP_NOT_FOUND_EXCEPTION);
            res.send({ code: 0, msg: 'success', data: comp });
        } catch (e) {
            console.log(e);
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
                    dts: comp.compDts
                }
            });
        } catch (e) {
            console.log(e);
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


    //新增物料（new）
    //compDts：数据源配置项
    static saveOneNew = (req: Request, res: Response, next: NextFunction) => {
        const { body: { compName, compTitle, compType, compProps, compStyles, compDts } } = req;
        if (!compTitle || !compType || !compProps || !compStyles || (compType == "visual" && !compDts)) return next(ErrCode.PARAM_EXCEPTION);
        exceptionOnSave(new compModel({
            compId: guid(),
            compName,
            compTitle,
            compType,
            compProps,
            compStyles,
            compDts,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next);
    }

    //更新物料
    static updateOne = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { compId, compName, compTitle, compType, compProps, compStyles, compDts } } = req;
        if (!compId || !compName || !compTitle || !compType || !compProps || !compStyles || (compType == "visualize" && !compDts)) return next(ErrCode.PARAM_EXCEPTION);
        const session = await mongoose.connection.startSession();
        try {
            const comp = await compModel.findOne({ compId });
            if (comp.createUser != getUserInfo(req).userId) return next(ErrCode.NO_PERMISSION_EXCEPTION);
            if (!comp) return next(ErrCode.COMP_NOT_FOUND_EXCEPTION);
            session.startTransaction();
            const editParams: any = {};
            if (compName) editParams.compName = compName;
            if (compTitle) editParams.compTitle = compTitle;
            if (compType) editParams.compType = compType;
            if (compProps) editParams.compProps = compProps;
            if (compStyles) editParams.compStyles = compStyles;
            if (compDts) editParams.compDts = compDts;
            await compModel.updateOne({ compId }, {
                ...editParams,
                ...updateSchemaInfo(getUserInfo(req).userId)
            }).session(session);
            await session.commitTransaction();
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e);
            next(ErrCode.EXCEUTE_EXCEPTION);
        } finally {
            session.endSession();
        }
    }

    //删除物料
    static delOne = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { compId } } = req;
        console.log(compId);
        if (!compId) return next(ErrCode.PARAM_EXCEPTION);
        const session = await mongoose.connection.startSession();
        try {
            session.startTransaction();
            const comp = await compModel.findOne({ compId }).session(session);
            if (comp.createUser != getUserInfo(req).userId) return next(ErrCode.NO_PERMISSION_EXCEPTION);
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