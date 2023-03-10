import { DataSourceSchema } from "../db/mongoDB/schema/business";
import { useModel } from '../db/mongoDB/index';
import { Request, Response, NextFunction } from 'express';
import { ErrCode, exceptionOnSave } from '../common/exception';
import { initSchemaInfo, updateSchemaInfo } from '../utils/dataFilled';
import { getUserInfo } from '../utils/auth';
import { guid } from '../utils/strHandler';

const dsModel = useModel("dataSource", DataSourceSchema);

export default class DataSourceService {
    //新增
    static saveDS = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { dsTitle, dsColumns, dsNumbers, dsStaticDatas, dsApiPath, dsPath } } = req;
        if (!dsTitle || !dsNumbers || !dsPath || !dsColumns || (!dsStaticDatas && !dsApiPath)) return next(ErrCode.PARAM_EXCEPTION);
        exceptionOnSave(new dsModel({
            dsId: guid(),
            dsTitle,
            dsNumbers,
            dsColumns,
            dsStaticDatas: dsStaticDatas || null,
            dsApiPath: dsApiPath || null,
            dsPath,
            ...initSchemaInfo(getUserInfo(req).userId)
        }), res, next);
    }

    /**
     * 静态数据新增、动态数据API地址、数据地址变动
     * @returns 
     */
    static editDS = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { dsStaticDatas, dsApiPath, dsPath, dsId } } = req;
        if (!dsStaticDatas && !dsApiPath && !dsPath) return next(ErrCode.PARAM_EXCEPTION);
        const [dataSource] = await dsModel.find({ dsId });
        if (!dataSource) return next(ErrCode.DATASOURCE_NOT_FOUND_EXCEPTION);
        try {
            await dsModel.updateOne({ dsId }, {
                dsStaticDatas: dataSource.dsStaticDatas.concat(dsStaticDatas) || dataSource.dsStaticDatas,
                dsApiPath: dsApiPath || dataSource.dsApiPath,
                dsPath: dsPath || dataSource.dsPath,
                ...updateSchemaInfo(getUserInfo(req).userId)
            });
            res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.error(e.message);
            return next(ErrCode.SELECT_MG_EXCEPTION);
        }
    }
}