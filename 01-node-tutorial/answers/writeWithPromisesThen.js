const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "Line 1: This is the first line\n")
  .then(() => {
    console.log("Wrote line 1");
    return writeFile("temp.txt", "Line 2: This is the second line\n", { flag: "a" });
  })
  .then(() => {
    console.log("Wrote line 2");
    return writeFile("temp.txt", "Line 3: This is the third line\n", { flag: "a" });
  })
  .then(() => {
    console.log("Wrote line 3");
    return readFile("temp.txt", "utf8");
  })
  .then((data) => {
    console.log("File contents:");
    console.log(data);
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
