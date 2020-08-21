import AbstractView from "./abstract.js";

const createLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class classLoadMore extends AbstractView {
  getTemplate() {
    return createLoadMoreTemplate();
  }
}
