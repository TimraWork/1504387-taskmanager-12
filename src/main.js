import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";
import MenuView from "./view/menu.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import LoadMoreView from "./view/load-more.js";

import {createFilterTemplate} from "./view/filter.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

renderElement(header, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilterTemplate(filters), `beforeend`);


const boardComponent = new BoardView();
// renderTemplate(main, createBoardTemplate(), `beforeend`);
renderElement(main, boardComponent.getElement(), RenderPosition.BEFOREEND);
// const board = main.querySelector(`.board`);
// renderTemplate(board, createSortTemplate(), `afterbegin`);
renderElement(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);


const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
// const taskList = board.querySelector(`.board__tasks`);
// renderTemplate(taskList, createTaskEditTemplate(tasks[0]), `beforeend`);
renderTemplate(taskListComponent.getElement(), createTaskEditTemplate(tasks[0]), RenderPosition.BEFOREEND);


for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  // renderTemplate(taskList, createTaskTemplate(tasks[i]), `beforeend`);
  renderTemplate(taskListComponent.getElement(), createTaskTemplate(tasks[i]), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreView();
  // renderTemplate(board, createLoadMoreTemplate(), `beforeend`);
  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);


  // const loadMoreButton = board.querySelector(`.load-more`);
  // loadMoreButton.addEventListener(`click`, (evt) => {
  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(taskListComponent.getElement(), createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      // loadMoreButton.remove();
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
