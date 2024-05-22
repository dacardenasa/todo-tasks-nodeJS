const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "what do you wish to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`
      },
      {
        value: "2",
        name: `${"2.".green} List all tasks`
      },
      {
        value: "3",
        name: `${"3.".green} List completed tasks`
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`
      },
      {
        value: "5",
        name: `${"5.".green} Complete task`
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`
      },
      {
        value: "0",
        name: `${"0.".green} exit`
      }
    ]
  }
];

async function inquirerMenu() {
  console.clear();
  console.log("================================".green);
  console.log("       Select one option:       ".green);
  console.log("================================".green);

  const { option } = await inquirer.prompt(questions);
  return option;
}

async function pause() {
  await inquirer.prompt([
    {
      type: "input",
      name: "confirm",
      message: `Press ${"ENTER".green} to continue...`
    }
  ]);
}

async function readInput(message = "") {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "description is empty!";
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

async function createDeleteTasksUI(tasks = []) {
  if (!tasks.length) return null;
  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${index + 1}.`.green + ` ${task.desc}`
  }));

  choices.push({
    value: "0",
    name: "0.".green + " Cancelar"
  });

  const questionsToDelete = [
    {
      type: "list",
      name: "id",
      message: "delete",
      choices
    }
  ];

  const { id } = await inquirer.prompt(questionsToDelete);
  return id;
}

async function confirm(message = "") {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message
    }
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
}

async function createCheckListUI(tasks = []) {
  if (!tasks.length) return null;
  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${index + 1}.`.green + ` ${task.desc}`,
    checked: !!task.endDate
  }));

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices
    }
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  createDeleteTasksUI,
  confirm,
  createCheckListUI
};
