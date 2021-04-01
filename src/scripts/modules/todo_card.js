import '../../style/todo_card.css';

function generateTodoCard(todo) {
  const title = `
    <h4>Brush Teeth</h4>`;
  const check = `
  <label class="container">
    <input type="checkbox">
  </label>`;
  const leftDiv = `<div class="cardContainer cardContainerLeft">${check}${title}</div>`;

  const detailsButton = `<button class="detailsButton">DETAILS</button>`;
  const dueDate = `<p>Dec 15th</p>`;
  const edit = `
    <img
      class="editIcon"
      src="./assets/images/edit.svg"
      alt="Edit todo icon"
    />`;
  const remove = `
    <img
      class="removeIcon"
      src="./assets/images/remove.svg"
      alt="Delete todo icon"
  />`;
  const rightDiv = `
    <div class="cardContainer cardContainerRight">
      ${detailsButton}${dueDate}${edit}${remove}
    </div>`;

  const todoCardDiv = `
    <div class="todoCard">
    ${leftDiv}${rightDiv}
    </div>`;

  return todoCardDiv;
}

export default generateTodoCard;
