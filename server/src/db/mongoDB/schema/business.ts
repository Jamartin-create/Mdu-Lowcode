import { Schema } from "mongoose";

export const TestSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
})