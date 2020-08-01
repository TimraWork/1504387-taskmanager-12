import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTaskTemplate} from "./view/task.js";
import {createBoardTemplate} from "./view/board.js";
import {createSortTemplate} from "./view/sort.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreTemplate} from "./view/load-more.js";

const TASK_COUNT = 3;

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createMenuTemplate(), `beforeend`);
render(main, createFilterTemplate(), `beforeend`);
render(main, createBoardTemplate(), `beforeend`);

const board = main.querySelector(`.board`);
const taskList = board.querySelector(`.board__tasks`);

render(board, createSortTemplate(), `afterbegin`);
render(taskList, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskList, createTaskTemplate(), `beforeend`);
}

render(board, createLoadMoreTemplate(), `beforeend`);
