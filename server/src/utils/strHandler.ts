import crypto from 'crypto'

//密码md5加密
export function setPassword(pwd: string) {
    return crypto.createHash('md5').update(pwd).digest('hex');
}

//guid
export function guid() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}