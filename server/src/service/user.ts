import { Request, Response } from "express";
import { useModel } from '../db/mongoDB'
import { UserSchema } from "../db/mongoDB/schema/business";
import { Document } from "mongodb";

const UserModel = useModel('user', UserSchema);

export default class UserService {
    static userRegister = async (req: Request, res: Response) => {
        const { body } = req;
        const entity = new UserModel({
            userName: body.userName,
            userPwd: body.password
        });
        entity.save(err => {
            if (err) res.send({ code: -1, msg: '失败' });
            res.send({ code: 0, msg: '成功' });
        })
    }
    static userLogin = async (req: Request, res: Response) => {
        const { body } = req;
        UserModel.find({
            userName: body.userName,
            userPwd: body.password
        }, (err: any, docs: Document[]) => {
            if (err) {
                res.send(err);
                return;
            }
            res.send(docs)
        })
    }
}