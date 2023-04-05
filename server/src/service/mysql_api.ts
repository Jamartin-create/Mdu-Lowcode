import { NextFunction, Request, Response } from 'express'
import { initModel } from '../db/mysql'
import { deviceModelOptions, dataModelOptions, valueModelOptions } from '../db/mysql/model/models'
import { guid } from '../utils/strHandler';
import { ErrCode } from '../common/exception';
import { error } from 'console';

const deviceModel = initModel('device', deviceModelOptions);
const dataModel = initModel('data', dataModelOptions);
const valueModel = initModel('value', valueModelOptions);

export default class MysqlApiService {
    //新增设备
    static async saveDevice(req: Request, res: Response, next: NextFunction) {
        const { dev_code, dev_name, dev_type } = req.body;
        if (!dev_code || !dev_name || !dev_type) return next(ErrCode.PARAM_EXCEPTION);
        const id = guid();
        try {
            await deviceModel.create({
                dev_code,
                dev_name,
                dev_type,
                id,
            });
            return res.send({ code: 0, msg: 'success', data: id });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

    //删除设备
    static async deleteDevice(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (!id) return next(ErrCode.PARAM_EXCEPTION);
        try {
            await deviceModel.destroy({ where: { id } });
            return res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

    //编辑设备
    static async editDevice(req: Request, res: Response, next: NextFunction) {
        const { id, dev_code, dev_name, dev_type } = req.body;
        if (!id || (!dev_code && !dev_name && !dev_type)) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const newOptions: {
                dev_code?: string,
                dev_name?: string,
                dev_type?: string
            } = {}
            dev_code && (newOptions['dev_code'] = dev_code)
            dev_name && (newOptions['dev_name'] = dev_name)
            dev_type && (newOptions['dev_type'] = dev_type)
            await deviceModel.update(newOptions, { where: { id } });
            return res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }


    //新增数据
    static async saveData(req: Request, res: Response, next: NextFunction) {
        const { data_code, data_label, data_name, dev_id } = req.body;
        if (!data_code || !data_label || !data_name || !dev_id) return next(ErrCode.PARAM_EXCEPTION);
        const id = guid();
        try {
            await dataModel.create({
                data_code,
                data_label,
                data_name,
                dev_id,
                id,
            });
            return res.send({ code: 0, msg: 'success', data: id });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

    //删除数据
    static async deleteData(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (!id) return next(ErrCode.PARAM_EXCEPTION);
        try {
            await dataModel.destroy({ where: { id } });
            return res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

    //编辑数据
    static async editData(req: Request, res: Response, next: NextFunction) {
        const { id, data_code, data_label, data_name, dev_id } = req.body;
        if (!id || (!data_code && !data_label && !data_name && !dev_id)) return next(ErrCode.PARAM_EXCEPTION);
        try {
            const newOptions: {
                data_code?: string,
                data_label?: string,
                data_name?: string,
                dev_id?: string
            } = {}
            data_code && (newOptions['data_code'] = data_code)
            data_label && (newOptions['data_label'] = data_label)
            data_name && (newOptions['data_name'] = data_name)
            dev_id && (newOptions['dev_id'] = dev_id)

            await dataModel.update(newOptions, { where: { id } });
            return res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

    //新增值
    static async saveValue(req: Request, res: Response, next: NextFunction) {
        const { val_value, val_time, data_id } = req.body;
        if (!val_value || !val_time || !data_id) return next(ErrCode.PARAM_EXCEPTION);
        const id = guid();
        try {
            await valueModel.create({
                val_value,
                val_time,
                data_id,
                id,
            });
            return res.send({ code: 0, msg: 'success', data: id });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

    //删除值
    static async deleteValue(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (!id) return next(ErrCode.PARAM_EXCEPTION);
        try {
            await valueModel.destroy({ where: { id } });
            return res.send({ code: 0, msg: 'success' });
        } catch (e) {
            console.log(e);
            return next(ErrCode.SELECT_MQ_EXCEPTION);
        }
    }

}