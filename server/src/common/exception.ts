export type MyErrorCode = {
    code: number;
    msg: string;
}

export class MyError extends Error {
    code: number;
    msg: string;
    constructor(errCode: MyErrorCode) {
        super(errCode.msg)
        this.code = errCode.code;
        this.msg = errCode.msg;
        this.name = 'MyError'
    }
}

function generatorError(code: MyErrorCode): MyError {
    return new MyError(code);
}

export default {
    PARAM_EXCEPTION: generatorError({ code: 90001, msg: '参数异常，请检查所传参数的完整性与正确性' }),
    SELECT_MG_EXCEPTION: generatorError({ code: 90002, msg: 'MongoDB数据库查询异常' }),
    SELECT_MQ_EXCEPTION: generatorError({ code: 90003, msg: 'MySQL数据库查询异常' }),
    FORBIDEN_PWD_EXCEPTION: generatorError({ code: 90004, msg: '密码错误' }),
    FORBIDEN_TOKEN_EXCPETION: generatorError({ code: 90005, msg: 'token验证失败' }),
    USER_NOT_FOUND_EXCEPTION: generatorError({ code: 90006, msg: '用户未找到' }),
    USERNAME_CONFILICT_EXCEPTION: generatorError({ code: 90007, msg: '用户名冲突' }),
    EXCEUTE_EXCEPTION: generatorError({ code: 90008, msg: '执行异常' })
}