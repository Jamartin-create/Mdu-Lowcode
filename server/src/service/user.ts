import { Request, Response, NextFunction } from 'express';
import { useModel } from '../db/mongoDB'
import { UserSchema } from "../db/mongoDB/schema/business";
import { Document } from "mongodb";
import ErrCode from '../common/exception'
import { setPassword } from '../utils/strHandler';

const UserModel = useModel('user', UserSchema);

export default class UserService {

    //注册
    static userRegister = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { userName, userPwd } } = req;
        if (!userName || !userPwd) return next(ErrCode.PARAM_EXCEPTION);
        const user = await UserModel.find({ 'userName': userName });
        if (user.length != 0) return next(ErrCode.USERNAME_CONFILICT_EXCEPTION);
        const entity = new UserModel({
            userName: userName,
            userPwd: setPassword(userPwd)
        });
        entity.save(err => {
            if (err) return next(ErrCode.SELECT_MG_EXCEPTION);
            res.send({ code: 0, msg: '成功' });
        })
    }

    //登录
    static userLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body: { userName, userPwd } } = req;
            const user = await UserModel.find({ 'userName': userName });
            if (user.length == 0) return next(ErrCode.USER_NOT_FOUND_EXCEPTION);
            if (user[0].userPwd != setPassword(userPwd)) return next(ErrCode.FORBIDEN_PWD_EXCEPTION);
            res.send({ code: 0, msg: '登录成功', data: user[0] })
        } catch (e) {

        }
    }
}