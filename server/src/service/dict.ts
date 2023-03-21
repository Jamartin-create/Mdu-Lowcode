import { SgtSchema, SgeSchema } from '../db/mongoDB/schema/business';
import { NextFunction, Request, Response } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { useModel } from '../db/mongoDB/index';
import { guid } from '../utils/strHandler';
import { initSchemaInfo } from '../utils/dataFilled';
import { getUserInfo } from '../utils/auth';

const sgtModel = useModel('selectGroupType', SgtSchema);
const sgeModel = useModel('selectGroupEntry', SgeSchema);

export default class DictService {

    //查询字典
    static getDictType = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { sgtCode, sgtId } } = req;
        if (!sgtCode && !sgtId) {
            const ret = await sgtModel.find();
            res.send({ code: 0, msg: 'success', data: ret });
            return;
        }
        const options: { sgtCode?: string, sgtId?: string } = {};
        !!sgtCode && (options.sgtCode = sgtCode as string);
        !!sgtId && (options.sgtId = sgtId as string);
        const ret = await sgtModel.find(options);
        res.send({ code: 0, msg: 'success', data: ret });
    }

    //新增字典
    static saveDictType = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { sgtCode, sgtName } } = req;
        if (!sgtCode || !sgtName) return next(ErrCode.PARAM_EXCEPTION);
        const sgts = await sgtModel.find({ sgtCode });
        if (sgts.length > 1) return next(ErrCode.DICT_CODE_CONFILICT_EXCEPTION);
        exceptionOnSave(new sgtModel({
            sgtId: guid(),
            sgtName,
            sgtCode,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next)
    }

    //查询字典options
    static getDictEntry = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { sgtId, sgtCode } } = req;
        if (!sgtId && !sgtCode) return next(ErrCode.PARAM_EXCEPTION);
        let tempId = sgtId;
        if (!tempId) {
            const [sgt] = await sgtModel.find({ sgtCode });
            tempId = sgt.sgtId;
        }
        const ret = await sgeModel.find({ sgtId: tempId });
        res.send({ code: 0, msg: 'success', data: ret });
    }

    //新增字典option
    static saveDictEntry = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { sgeName, sgeCode, sgeValue, sgtId } } = req;
        if (!sgeName || !sgeCode || !sgeValue || !sgtId) return next(ErrCode.PARAM_EXCEPTION);
        const sges = await sgeModel.find({ sgeCode });
        const sgts = await sgtModel.find({ sgtId });
        if (sges.length > 1) return next(ErrCode.DICT_CODE_CONFILICT_EXCEPTION);
        if (sgts.length == 0) return next(ErrCode.DICT_TYPE_NOT_FOUND_EXCEPTION);
        exceptionOnSave(new sgeModel({
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
        sgeModel.insertMany(dicts).then(v => res.send({ code: 0, msg: 'success' })).catch(err => next(ErrCode.SELECT_MG_EXCEPTION));
    }
}