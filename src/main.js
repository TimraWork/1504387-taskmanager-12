import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import TaskView from "./view/task.js";
import TaskEditView from "./view/task-edit.js";
import NoTaskView from "./view/no-task.js";
import LoadMoreView from "./view/load-more.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition, replace, remove} from "./utils/render.js";

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToCard = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);


const renderBoard = (boardContainer, boardTasks) => {

  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView(), RenderPosition.BEFOREEND);
    return;
  }
  // render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent, new SortView(), RenderPosition.AFTERBEGIN);
  render(boardComponent, taskListComponent, RenderPosition.BEFOREEND);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreView();
    render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(taskListComponent.getElement(), task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

};

render(header, new MenuView(), RenderPosition.BEFOREEND);
render(main, new FilterView(filters), RenderPosition.BEFOREEND);

renderBoard(main, tasks);
