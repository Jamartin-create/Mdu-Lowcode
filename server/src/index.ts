import Server from "./plugin/server";

const server = new Server();

server.app.listen(8888, () => {
    console.log('Express Server lisenting on port 8888')
})

