export type MyErroCode = {
    code: number;
    msg: string;
}

export class MyError extends Error {
    code: number;
    msg: string;
    constructor(errCode: MyErroCode) {
        super(errCode.msg)
        this.code = errCode.code;
        this.msg = errCode.msg;
        this.name = 'MyError'
    }
}

const PARAM_EXCEPTION: MyErroCode = { code: 90001, msg: '参数异常，请检查所传参数的完整性与正确性' }
const SELECT_MG_EXCEPTION: MyErroCode = { code: 90002, msg: 'MongoDB数据库查询异常' }
const SELECT_MQ_EXCEPTION: MyErroCode = { code: 90003, msg: 'MySQL数据库查询异常' }

export default {
    PARAM_EXCEPTION,
    SELECT_MG_EXCEPTION,
    SELECT_MQ_EXCEPTION
}