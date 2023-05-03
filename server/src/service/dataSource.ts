import { DataSourceSchema } from "../db/mongoDB/schema/business";
import { useModel } from '../db/mongoDB/index';
import { Request, Response, NextFunction } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { initSchemaInfo, updateSchemaInfo } from '../utils/dataFilled';
import { getUserInfo } from '../utils/auth';
import { guid } from '../utils/strHandler';

const dsModel = useModel("dataSource", DataSourceSchema);

export default class DataSourceService {
    //根据id获取数据源
    static getDSById = async (req: Request, res: Response, next: NextFunction) => {
        const { params: { id } } = req;
        if (!id) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const ds = await dsModel.findOne({ dsId: id });
            if (!ds) return next(ErrCode.DATASOURCE_NOT_FOUND_EXCEPTION);
            res.send({ code: 0, msg: 'success', data: ds });
        } catch (e) {
            console.log(e);
            next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }
    //获取
    static getList = async (req: Request, res: Response, next: NextFunction) => {
        const ds = await dsModel.find({}, {}, { sort: { createTime: -1 } });
        res.send({ code: 0, msg: 'success', data: ds });
    }

    //新增
    static saveDS = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { dsTitle, dsStaticDatas, dsApiPath, devId, dataCode } } = req;
        if (!dsTitle || (!dsStaticDatas && !dsApiPath)) return next(ErrCode.PARAM_EXCEPTION);
        exceptionOnSave(new dsModel({
            dsId: guid(),
            dsTitle,
            dsStaticDatas: dsStaticDatas || null,
            dsApiPath: dsApiPath || null,
            devId: devId || null,
            dataCode: dataCode || null,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next);
    }

    /**
     * 静态数据新增、动态数据API地址、数据地址变动
     * @returns 
     */
    static editDS = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { dsTitle, dsStaticDatas, dsApiPath, dsPath, dsId, devId, dataCode } } = req;
        if (!dsStaticDatas && !dsApiPath && !dsPath) return next(ErrCode.PARAM_EXCEPTION);
        const dataSource = await dsModel.findOne({ dsId });
        if (dataSource.createUser !== getUserInfo(req).userId) return next(ErrCode.NO_PERMISSION_EXCEPTION);
        if (!dataSource) return next(ErrCode.DATASOURCE_NOT_FOUND_EXCEPTION);
        try {
            await dsModel.updateOne({ dsId }, {
                dsStaticDatas: dataSource.dsStaticDatas.concat(dsStaticDatas) || dataSource.dsStaticDatas,
                dsApiPath: dsApiPath || dataSource.dsApiPath,
                dsPath: dsPath || dataSource.dsPath,
                devId: devId || dataSource.devId,
                dataCode: dataCode || dataSource.dataCode,
                dsTitle: dsTitle || dataSource.dsTitle,
                ...updateSchemaInfo(getUserInfo(req).userId)
            });
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e.message);
            return next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }

    /**
     * 删除数据源
     */
    static delDS = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { dsId } } = req;
        if (!dsId) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const ds = await dsModel.findOne({ dsId });
            if (ds.createUser !== getUserInfo(req).userId) return next(ErrCode.NO_PERMISSION_EXCEPTION);
            if (!ds) return next(ErrCode.DATASOURCE_NOT_FOUND_EXCEPTION);
            await dsModel.deleteOne({ dsId });
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e.message);
            return next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }
}