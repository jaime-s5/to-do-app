import _ from 'lodash';

import '../../style/todo_card.css';

import { ProjectManager } from './project_manager';

function handleCardEvents(event) {
  const projectIndex = event.currentTarget.getAttribute('data-project-pos');
  const todoIndex = event.currentTarget.getAttribute('data-todo-pos');

  if (event.target.className === 'removeIcon') {
    const project = ProjectManager.projects[projectIndex];

    project.removeTodo(todoIndex);

    const tab = _.lowerCase(project.title);
    document.querySelector(`.${tab}`).click();
  }
}

function generateTodoCard(todoData) {
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

export { generateTodoCard, handleCardEvents };
