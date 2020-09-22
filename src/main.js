import {TASK_COUNT, MenuItem} from "./const.js";
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
  // console.log('handle = ', );
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      boardPresenter.createTask(handleTaskNewFormClose);
      // Убрать выделение с ADD NEW TASK после сохранения
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();
