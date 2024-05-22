require("colors");

const { saveFile, readFile } = require("./helpers/file");
const {
  inquirerMenu,
  pause,
  readInput,
  confirm,
  createDeleteTasksUI,
  createCheckListUI
} = require("./helpers/inquirer");
const Tasks = require("./models/tasks");

console.clear();

async function main() {
  let opt = "";
  const tasks = new Tasks();
  const tasksList = readFile();

  if (tasksList) {
    tasks.loadTasksFromArray(tasksList);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.listAll();
        break;
      case "3":
        tasks.listCompleted();
        break;
      case "4":
        tasks.listPending();
        break;
        case "5":
          const ids = await createCheckListUI(tasks.taskListAsArray);
          tasks.markAsCompleted(ids);
        break;
      case "6":
        const id = await createDeleteTasksUI(tasks.taskListAsArray);
        if (id && id !== "0") {
          const canDeleteQuestion = await confirm(
            "Are you sure you want to delete?"
          );
          if (canDeleteQuestion) {
            tasks.deleteTask(id);
            console.log("Task deleted".green);
          }
        }
        break;
      default:
        continue;
    }
    saveFile(tasks.taskListAsArray);
    if (opt !== 0) await pause();
  } while (opt !== "0");
}

main();
