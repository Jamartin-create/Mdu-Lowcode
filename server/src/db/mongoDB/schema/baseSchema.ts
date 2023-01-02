import { Schema } from "mongoose";

export class MySchema {
    private schema: Schema;
    constructor(options: any) {
        this.schema = new Schema({
            ...options,
            createTime: Number,
            createUser: String,
            updateTime: Number,
            updateUser: String,
            description: String,
        })
    }
    public getSchema() {
        return this.schema;
    }
}