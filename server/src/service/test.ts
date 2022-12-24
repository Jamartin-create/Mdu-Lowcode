import { Request, Response } from 'express'
import { TestSchema } from '../db/mongoDB/schema/business'
import { model } from '../db/mongoDB'
import { Document } from 'mongoose';

const TestModel = model('test', TestSchema);

export default class TestService {
    static testGet = async (req: Request, res: Response) => {
        TestModel.find({}, (err: any, docs: Document[]) => {
            if (err) {
                res.send(err);
            }
            res.send(docs);
        })
    }
    static testPost = async (req: Request, res: Response) => {
        const entity = new TestModel(req.body)
        entity.save(err => {
            if (err) res.send({ code: -1, msg: '失败' })
            res.send({ code: 0, msg: '成功' })
        })
    }
}