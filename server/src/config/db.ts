const MG_PORT = 27017
const MG_HOST = '127.0.0.1'
const MG_NAME = 'martin-lowcode'
export const MG_URL = `mongodb://${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_NAME}`
