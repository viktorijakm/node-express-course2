const { writeFile, readFile } = require("fs").promises;

async function writer() {
  try {
    await writeFile("temp.txt", "Line 1: This is the first line\n");
    await writeFile("temp.txt", "Line 2: This is the second line\n", { flag: "a" });
    await writeFile("temp.txt", "Line 3: This is the third line\n", { flag: "a" });
    console.log("Writing completed!");
  } catch (error) {
    console.log("Error writing file:", error);
  }
}

async function reader() {
  try {
    const content = await readFile("temp.txt", "utf8");
    console.log("File contents:");
    console.log(content);
  } catch (error) {
    console.log("Error reading file:", error);
  }
}

async function readWrite() {
  await writer();
  await reader();
}

readWrite();