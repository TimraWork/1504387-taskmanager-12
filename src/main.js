import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import LoadMoreView from "./view/load-more.js";

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
// renderTemplate(main, createFilterTemplate(filters), `beforeend`);
renderElement(main, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);


const boardComponent = new BoardView();
renderElement(main, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);


const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
renderTemplate(taskListComponent.getElement(), createTaskEditTemplate(tasks[0]), RenderPosition.BEFOREEND);


for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTemplate(taskListComponent.getElement(), createTaskTemplate(tasks[i]), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreView();
  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(taskListComponent.getElement(), createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
