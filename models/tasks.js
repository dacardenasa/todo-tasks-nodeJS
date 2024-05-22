require("colors");
const {
  mapObjectIntoArray,
  mapArrayIntoObject
} = require("../helpers/transforms");
const Task = require("./task");

class Tasks {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get taskListAsArray() {
    return mapObjectIntoArray(this._listado);
  }

  loadTasksFromArray(tasks = []) {
    const tasksAsObject = mapArrayIntoObject(tasks);
    this._listado = tasksAsObject;
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._listado[task.id] = task;
  }

  listAll() {
    this.taskListAsArray.forEach(({ desc, endDate }, index) =>
      console.log(
        `${index + 1}.`.green + ` ${desc} :: ${endDate?.green ?? "Pending".red}`
      )
    );
    console.log(`\n`);
  }

  listPending() {
    this.taskListAsArray.forEach(({ desc, endDate }, index) => {
      if (!endDate)
        console.log(`${index + 1}.`.green + ` ${desc} :: ${"Pending".red}`);
    });
    console.log(`\n`);
  }

  listCompleted() {
    this.taskListAsArray.forEach(({ desc, endDate }, index) => {
      if (endDate)
        console.log(`${index + 1}.`.green + ` ${desc} :: ${endDate.green}`);
    });
    console.log(`\n`);
  }

  deleteTask(id = "") {
    if (!this._listado[id]) return;
    delete this._listado[id];
  }

  markAsCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._listado[id];
      if (!task.endDate) {
        task.endDate = new Date().toISOString();
      }
    });

    this.taskListAsArray.forEach(({ id }) => {
      if (!ids.includes(id)) {
        this._listado[id].endDate = null;
      }
    });
  }
}

module.exports = Tasks;
