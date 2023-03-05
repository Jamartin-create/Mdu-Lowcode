import Server from "./plugin/server";
import { connect } from "./db/mongoDB";

connect();

const server = new Server();
server.startServer();