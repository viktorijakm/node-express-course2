const EventEmitter = require("events");

const emitter = new EventEmitter();

// listen  "greeting" event
emitter.on("greeting", (name) => {
  console.log(`Hello, ${name}!`);
});

// listen "math" event
emitter.on("math", (a, b) => {
  console.log(` ${a} + ${b} = ${a + b}`);
});

// listen "delayed" event after set timeout
emitter.on("delayed", (msg) => {
  console.log(`⏱Delayed message: ${msg}`);
});

emitter.emit("greeting", "Viktorija");
emitter.emit("math", 10, 7);

// setTimeout delay the "delayed" event
setTimeout(() => {
  emitter.emit("delayed", "This came in 2 seconds later!");
}, 2000);

emitter.on("first", () => {
  console.log("First event triggered!");
  emitter.emit("second");
});

emitter.on("second", () => {
  console.log("Second event triggered because of the first one!");
});

emitter.emit("first");
