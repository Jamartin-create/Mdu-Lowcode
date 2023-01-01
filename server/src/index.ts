import dotenv from 'dotenv'
dotenv.config()
import Server from "./plugin/server";
import { connect } from "./db/mongoDB";

connect();

const server = new Server();

server.app.listen(process.env.SERVER_PORT, () => {
    console.log(`Express Server lisenting on port ${process.env.SERVER_PORT}`)
})

