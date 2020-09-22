import {TASK_COUNT, MenuItem, UpdateType, FilterType} from "./const.js";
import MenuView from "./view/menu.js";

import {generateTask} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";

import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(main, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, tasksModel);
const siteMenuComponent = new MenuView();

render(header, siteMenuComponent, RenderPosition.BEFOREEND);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();
