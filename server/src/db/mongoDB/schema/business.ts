import { Schema } from "mongoose";
import { User, BusinessBaseEntity, Test } from './schemaType';

/**
 * 测试Schema
 */
export const TestSchema = new Schema<Test>()

/**
 * 用户Schema
 */
export const UserSchema = new Schema({
    userName: String,
    userAge: Number,
    userGender: String,
    userPwd: String,
    userEmail: String
})
