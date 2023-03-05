import jwt from "jsonwebtoken";
import { User } from '../db/mongoDB/schema/schemaType';

const secret = 'salt'
//过期时间，可选格式：1d、24h、1 days，若不写单位则默认为ms
const expiresTime = '5d'

//生成token
export function sign(userInfo: Partial<User>) {
    return 'Bearer ' + jwt.sign(userInfo, secret, { expiresIn: expiresTime })
}