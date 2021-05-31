function getTodoCardHTML(todoData) {
  const todo = { ...todoData.todoObject };

  const title = `
    <h4 class="cardText">${todo.title}</h4>`;
  const check = `
    <label class="container">
      <input type="checkbox">
    </label>`;
  const leftDiv = `
    <div class="cardContainer cardContainerLeft">
      ${check}${title}
    </div>`;

  const detailsButton = `<button class="detailsButton">DETAILS</button>`;
  const dueDate = `<p  class="cardText">${todo.dueDate}</p>`;
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

  const dataAttributeProject = `data-project-pos=${todoData.project_id}`;
  const dataAttributeTodo = `data-todo-pos=${todoData.todo_id}`;

  const todoCardDiv = `
    <div class="todoCard" ${dataAttributeProject} ${dataAttributeTodo}>
    ${leftDiv}${rightDiv}
    </div>`;

  return todoCardDiv;
}

export default getTodoCardHTML;