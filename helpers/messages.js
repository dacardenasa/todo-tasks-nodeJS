require("colors");

function showMenu() {
  return new Promise((resolve) => {
    console.clear();
    console.log("================================".green);
    console.log("       Select one option:       ".green);
    console.log("================================".green);

    console.log(`${"1.".green} Create task`);
    console.log(`${"2.".green} List tasks`);
    console.log(`${"3.".green} List acomplished tasks`);
    console.log(`${"4.".green} List pending tasks`);
    console.log(`${"5.".green} Complete task`);
    console.log(`${"6.".green} Delete task`);
    console.log(`${"0.".green} exit \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question("Select one option: ", (opt) => {
      resolve(opt);
      readline.close();
    });
  });
}

function pause() {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPress ${"ENTER".green} to continue\n`, () => {
      readline.close();
      resolve();
    });
  });
}

module.exports = {
  showMenu,
  pause
};
