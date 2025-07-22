const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello, hello everyone from the event server!");
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
