import { MySchema } from './baseSchema';

/**
 * 测试Schema
 */
export const TestSchema = new MySchema({
    name: String,
    age: Number,
    gender: String,
}).getSchema();

/**
 * 用户Schema
 */
export const UserSchema = new MySchema({
    userName: String,
    userAge: Number,
    userGender: String,
    userPwd: String,
    userEmail: String
}).getSchema();
