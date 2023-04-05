import Server from "./plugin/server";
import { connect } from "./db/mongoDB";
import { mySQLInit } from "./db/mysql";

connect();
mySQLInit();

const server = new Server();
server.startServer();