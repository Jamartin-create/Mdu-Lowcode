import { Request, Response } from 'express'

export default class UserService {
    static checkPwd = async (req: Request, res: Response) => {
        console.log('check')
        res.send('ok')
    }
}