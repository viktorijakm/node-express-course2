const { createReadStream } = require("fs");
const path = require("path");

const stream = createReadStream(
  path.join(__dirname, "../content/big.txt"),
  {
    encoding: "utf8",
    highWaterMark: 50,
  }
);

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount}:`, chunk);
});

stream.on("end", () => {
  console.log(`\nTotal chunks received: ${chunkCount}`);
});

stream.on("error", (err) => {
  console.error("An error occurred while reading the file:", err.message);
});
