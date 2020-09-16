import {TASK_COUNT} from "./const.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";

import {generateTask} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";

import BoardPresenter from "./presenter/board.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
// const filters = generateFilter(tasks);
const filters = [
  {
    type: `all`,
    name: `ALL`,
    count: 0
  }
];

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(main, tasksModel);

render(header, new MenuView(), RenderPosition.BEFOREEND);
render(main, new FilterView(filters, `all`), RenderPosition.BEFOREEND);

boardPresenter.init();
