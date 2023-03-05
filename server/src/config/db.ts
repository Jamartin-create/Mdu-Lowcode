import dotenv from 'dotenv';
//加载
dotenv.config();

export const MG_URL = `mongodb://${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_NAME}`
