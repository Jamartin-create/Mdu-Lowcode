import { Request, Response, NextFunction } from 'express';
import { useModel } from '../db/mongoDB'
import { UserSchema } from "../db/mongoDB/schema/business";
import ErrCode from '../common/exception'
import { setPassword, guid } from '../utils/strHandler';
import { User } from '../db/mongoDB/schema/schemaType';
import { sign } from '../utils/auth';

const UserModel = useModel('user', UserSchema);

function fillUserInfo(): Partial<User> {
    return {
        userId: guid(),
        userAge: null,
        userEmail: null,
        userGender: '未知',
    }
}

export default class UserService {

    //注册
    static userRegister = async (req: Request, res: Response, next: NextFunction) => {
        const { body: { userName, userPwd } } = req;
        if (!userName || !userPwd) return next(ErrCode.PARAM_EXCEPTION);
        const user = await UserModel.find({ 'userName': userName });
        if (user.length != 0) return next(ErrCode.USERNAME_CONFILICT_EXCEPTION);
        const entity = new UserModel({
            userName: userName,
            userPwd: setPassword(userPwd),
            ...fillUserInfo()
        });
        entity.save(err => {
            if (err) {
                console.log(err.message);
                return next(ErrCode.SELECT_MG_EXCEPTION);
            }
            res.send({ code: 0, msg: '成功' });
        })
    }

    //登录
    static userLogin = async (req: Request, res: Response, next: NextFunction) => {
        const { query: { userName, userPwd } } = req;
        if (!userName || !userPwd) return next(ErrCode.PARAM_EXCEPTION);
        const user = await UserModel.find({ 'userName': userName });
        if (user.length == 0) return next(ErrCode.USER_NOT_FOUND_EXCEPTION);
        if (user[0].userPwd != setPassword(userPwd as string)) return next(ErrCode.FORBIDEN_PWD_EXCEPTION);
        const { userId, userAge, userEmail, userGender } = user[0];
        //生成token
        const userInfo: User = { userId, userAge, userEmail, userGender, userName: userName as string }
        const token = sign(userInfo);
        res.send({
            code: 0, msg: '登录成功', data: { token }
        })
    }

    //获取用户信息
    static userInfo = async (req: Request, res: Response, next: NextFunction) => {
        res.send(req['auth' as keyof typeof req])
    }
}