import { Request, Response, NextFunction } from 'express';
import { useModel } from '../db/mongoDB'
import { UserSchema } from "../db/mongoDB/schema/business";
import { ErrCode, exceptionOnSave } from '../common/exception';
import { setPassword, guid } from '../utils/strHandler';
import { User } from '../db/mongoDB/schema/schemaType';
import { sign, getUserInfo } from '../utils/auth';
import { initSchemaInfo } from '../utils/dataFilled';

const UserModel = useModel('user', UserSchema);

function fillUserInfo(): Partial<User> {
    const uid = guid();
    return {
        userId: uid,
        userAge: null,
        userEmail: null,
        userGender: '未知',
        ...initSchemaInfo(uid)
    }
}

export default class UserService {

    //注册
    static userRegister = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { userName, userPwd } } = req;
        if (!userName || !userPwd) return next(ErrCode.PARAM_EXCEPTION);
        const user = await UserModel.find({ 'userName': userName });
        if (user.length != 0) return next(ErrCode.USERNAME_CONFILICT_EXCEPTION);
        exceptionOnSave(new UserModel({
            userName: userName,
            userPwd: setPassword(userPwd),
            ...fillUserInfo()
        }), res, next);
    }

    //登录
    static userLogin = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { userName, userPwd } } = req;
        if (!userName || !userPwd) return next(ErrCode.PARAM_EXCEPTION);
        const user = await UserModel.find({ 'userName': userName });
        if (user.length == 0) return next(ErrCode.USER_NOT_FOUND_EXCEPTION);
        if (user[0].userPwd != setPassword(userPwd as string)) return next(ErrCode.FORBIDEN_PWD_EXCEPTION);
        const { userId, userAge, userEmail, userGender } = user[0];
        //生成token
        const userInfo: Partial<User> = { userId, userAge, userEmail, userGender, userName: userName as string }
        const token = sign(userInfo);
        res.send({
            code: 0, msg: '登录成功', data: { token }
        })
    }

    //获取用户信息
    static userInfo = async (req: Request, res: Response) => {
        res.send(getUserInfo(req))
    }
}