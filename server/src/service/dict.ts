import { SgtSchema, SgeSchema } from '../db/mongoDB/schema/business';
import { NextFunction, Request, Response } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { useModel } from '../db/mongoDB/index';
import { guid } from '../utils/strHandler';
import { initSchemaInfo, updateSchemaInfo } from '../utils/dataFilled';
import { getUserInfo } from '../utils/auth';
import mongoose from 'mongoose';
import { SelectGroupType } from '../db/mongoDB/schema/schemaType';

const SgtModel = useModel('selectGroupType', SgtSchema);
const SgeModel = useModel('selectGroupEntry', SgeSchema);

export default class DictService {

    //查询字典
    static getDictType = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { sgtCode, sgtId } } = req;
        if (!sgtCode && !sgtId) {
            const ret = await SgtModel.find();
            res.send({ code: 0, msg: 'success', data: ret });
            return;
        }
        const options: { sgtCode?: string, sgtId?: string } = {};
        !!sgtCode && (options.sgtCode = sgtCode as string);
        !!sgtId && (options.sgtId = sgtId as string);
        const ret = await SgtModel.find(options);
        res.send({ code: 0, msg: 'success', data: ret });
    }

    //新增字典
    static saveDictType = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { sgtCode, sgtName } } = req;
        if (!sgtCode || !sgtName) return next(ErrCode.PARAM_EXCEPTION);
        const sgts = await SgtModel.find({ sgtCode });
        if (sgts.length > 1) return next(ErrCode.DICT_CODE_CONFILICT_EXCEPTION);
        exceptionOnSave(new SgtModel({
            sgtId: guid(),
            sgtName,
            sgtCode,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next)
    }

    //删除字典Type
    static delDict = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { sgtId } } = req;
        if (!sgtId) return next(ErrCode.PARAM_EXCEPTION);
        const session = await mongoose.connection.startSession();
        try {
            session.startTransaction();
            const sgt = await SgtModel.findOne({ sgtId }).session(session);
            if (sgt.createUser != getUserInfo(req).userId) return next(ErrCode.NO_PERMISSION_EXCEPTION);
            if (!sgt) return next(ErrCode.DICT_TYPE_NOT_FOUND_EXCEPTION);
            const sges = await SgeModel.find({ sgtId });
            if (sges.length != 0) await SgeModel.deleteMany({ sgtId }, { session });
            await sgt.delete();
            await session.commitTransaction();
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        } finally {
            session.endSession();
        }
    }

    //更新字典Type
    static updateDict = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body: { sgtCode, sgtName, sgtId } } = req;
            if (!sgtId) return next(ErrCode.PARAM_EXCEPTION);
            if (!sgtCode && !sgtName) return res.send({ code: 0, msg: 'success' });
            const sgt = await SgtModel.findOne({ sgtId });
            if (sgt.createUser != getUserInfo(req).userId) return next(ErrCode.NO_PERMISSION_EXCEPTION);
            if (!sgt) return next(ErrCode.DICT_TYPE_NOT_FOUND_EXCEPTION);
            const newOptions: {
                sgtCode?: string,
                sgtName?: string,
            } = {}
            sgtCode && (newOptions['sgtCode'] = sgtCode)
            sgtName && (newOptions['sgtName'] = sgtName)
            await SgtModel.updateOne({ sgtId }, {
                ...newOptions,
                ...updateSchemaInfo(getUserInfo(req).userId),
            })
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }

    //查询字典options
    static getDictEntry = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { sgtId, sgtCode } } = req;
        if (!sgtId && !sgtCode) return next(ErrCode.PARAM_EXCEPTION);
        let tempId = sgtId;
        if (!tempId) {
            const [sgt] = await SgtModel.find({ sgtCode });
            tempId = sgt.sgtId;
        }
        const ret = await SgeModel.find({ sgtId: tempId });
        res.send({ code: 0, msg: 'success', data: ret });
    }

    //新增字典option
    static saveDictEntry = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { sgeName, sgeCode, sgeValue, sgtId } } = req;
        if (!sgeName || !sgeCode || !sgeValue || !sgtId) return next(ErrCode.PARAM_EXCEPTION);
        const sges = await SgeModel.find({ sgeCode });
        const sgts = await SgtModel.find({ sgtId });
        if (sges.length > 1) return next(ErrCode.DICT_CODE_CONFILICT_EXCEPTION);
        if (sgts.length == 0) return next(ErrCode.DICT_TYPE_NOT_FOUND_EXCEPTION);
        exceptionOnSave(new SgeModel({
            sgeId: guid(),
            sgtId,
            sgeCode,
            sgeName,
            sgeValue,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next);
    }

    //批量新增字典options
    static saveBatchDictEntry = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { list, sgtId } } = req;
        if (!Array.isArray(list)) return next(ErrCode.PARAM_EXCEPTION);
        const dicts: any[] = [];
        const uid = getUserInfo(req).userId;
        list.forEach(item => {
            dicts.push({
                sgeId: guid(),
                sgtId,
                ...item,
                ...initSchemaInfo(uid)
            })
        })
        SgeModel.insertMany(dicts).then(v => res.send({ code: 0, msg: 'success' })).catch(err => next(ErrCode.SELECT_MG_EXCEPTION));
    }
}

export async function getDictTypeByCode(code: string) {
    try {
        const res = await SgtModel.findOne({ sgtCode: code });
        return res;
    } catch (e) {
        console.error(e);
    }
}
export async function getDictTypeById(id: string) {
    try {
        const res = await SgtModel.findOne({ sgtId: id });
        return res;
    } catch (e) {
        console.error(e);
    }
}