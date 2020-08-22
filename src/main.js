import {TASK_COUNT} from "./const.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(main);

render(header, new MenuView(), RenderPosition.BEFOREEND);
render(main, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
