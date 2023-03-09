import { Response, NextFunction, Request } from 'express';

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

/**
 * 生成错误码
 * @param {MyErrorCode} code 异常码与异常信息
 * @returns 
 */
function generatorError(code: MyErrorCode): MyError {
    return new MyError(code);
}

export const ErrCode = {
    PARAM_EXCEPTION: generatorError({ code: 90001, msg: '参数异常，请检查所传参数的完整性与正确性' }),
    SELECT_MG_EXCEPTION: generatorError({ code: 90002, msg: 'MongoDB数据库查询异常' }),
    SELECT_MQ_EXCEPTION: generatorError({ code: 90003, msg: 'MySQL数据库查询异常' }),
    FORBIDEN_PWD_EXCEPTION: generatorError({ code: 90004, msg: '密码错误' }),
    FORBIDEN_TOKEN_EXCPETION: generatorError({ code: 90005, msg: 'token验证失败' }),
    USER_NOT_FOUND_EXCEPTION: generatorError({ code: 90006, msg: '用户未找到' }),
    USERNAME_CONFILICT_EXCEPTION: generatorError({ code: 90007, msg: '用户名冲突' }),
    EXCEUTE_EXCEPTION: generatorError({ code: 90008, msg: '执行异常' }),
    GROUP_NOT_FOUD_EXCEPTION: generatorError({ code: 90009, msg: '未找到组件组' }),
    ITEM_NOT_FOUND_EXCEPTION: generatorError({ code: 90010, msg: '未找到项目' })
}

//请求异常捕获（链式调用结尾）
export function catchException(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err) {
        let e = err instanceof MyError ? err : ErrCode.EXCEUTE_EXCEPTION;
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            e = ErrCode.FORBIDEN_TOKEN_EXCPETION;
        }
        const { code, msg } = e;
        res.send({ code, msg })
    }
    next(err);
}