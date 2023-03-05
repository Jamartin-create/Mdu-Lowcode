import crypto from 'crypto'

//密码md5加密
export function setPassword(pwd: string) {
    return crypto.createHash('md5').update(pwd).digest('hex');
}