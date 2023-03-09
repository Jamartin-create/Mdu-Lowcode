import jwt from "jsonwebtoken";
import { User } from '../db/mongoDB/schema/schemaType';
import { Request } from "express";

const secret = 'salt'
//过期时间，可选格式：1d、24h、1 days，若不写单位则默认为ms
const expiresTime = '5d'

//生成token
export function sign(userInfo: Partial<User>) {
    return 'Bearer ' + jwt.sign(userInfo, secret, { expiresIn: expiresTime })
}

//根据 req 中的 auth 获取用户信息
export function getUserInfo(req: Request): Partial<User> {
    return req['auth' as keyof typeof req];
}