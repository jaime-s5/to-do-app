import _ from 'lodash';

import '../../style/todo.css';

import { Todo, ProjectManager } from './project_manager';

function removeTodoCardHover(projectTitle) {
  const title = _.lowerCase(projectTitle);
  const overlay = document.body.querySelector('.overlay');

  overlay.remove();
  document.querySelector(`.${title}`).click();
}

function saveTodo(title, description, dueDate, priority, projectTitle) {
  const todo = Todo(title, description, dueDate, priority, projectTitle);

  const index = ProjectManager.projects.findIndex(
    (element) => element.title === projectTitle
  );
  const project = ProjectManager.projects[index];

  project.addTodos(todo);

  removeTodoCardHover(projectTitle);
}

function replaceTodo(
  title,
  description,
  dueDate,
  priority,
  projectTitle,
  todoPos,
  projectPos
) {
  const todo = Todo(title, description, dueDate, priority, projectTitle);

  const index = ProjectManager.projects.findIndex(
    (element) => element.title === projectTitle
  );
  const project = ProjectManager.projects[index];

  project.replaceTodo(todoPos, todo);

  removeTodoCardHover(projectTitle);
}

function handleEditEvent(event, todoPos, projectPos) {
  event.preventDefault();

  // Extract data from form
  const iterator = new FormData(event.target).entries();
  const data = [...iterator];
  const dataObject = data.reduce((object, element) => {
    const key = element[0];
    const value = element[1];
    object[key] = value;
    return object;
  }, {});

  replaceTodo(
    dataObject.title,
    dataObject.description,
    dataObject.dueDate,
    dataObject.priority,
    _.upperFirst(dataObject.project),
    todoPos,
    projectPos
  );
}

function handleSaveEvent(event) {
  event.preventDefault();

  // Extract data from form
  const iterator = new FormData(event.target).entries();
  const data = [...iterator];
  const dataObject = data.reduce((object, element) => {
    const key = element[0];
    const value = element[1];
    object[key] = value;
    return object;
  }, {});

  saveTodo(
    dataObject.title,
    dataObject.description,
    dataObject.dueDate,
    dataObject.priority,
    _.upperFirst(dataObject.project)
  );
}

// Form to add todos that hovers over blurred page
function generateTodoHover(todo = {}) {
  const todoTitle = _.isEmpty(todo) ? '' : todo.title;
  const todoDescription = _.isEmpty(todo) ? '' : todo.description;
  const todoDueDate = _.isEmpty(todo) ? '' : todo.dueDate;
  const todoPriority = _.isEmpty(todo) ? '' : _.lowerFirst(todo.priority);

  const header = `<h3 class="headerForm">Add a todo</h3>`;

  const title = `
    <label for="title" class="todoLabel">Title:</label>
    <textarea
      type="text"
      class="title text"
      name="title"
      required="required"
    />${todoTitle}</textarea>
  `;

  const description = `
    <label for="description" class="todoLabel">Description:</label>
    <textarea
      type="text"
      class="description text"
      name="description"
      required="required"
    >${todoDescription}</textarea>
  `;

  const dueDate = `
    <label for="dueDate" class="todoLabel">Due Date:</label>
    <input
      type="date"
      name="dueDate"
      class="dueDate"
      required="required"
      value="${todoDueDate}"
    />
  `;

  const priority = `
    <label for="priority" class="todoLabel">Priority:</label>
    <select class="priority" name="priority">
      <option ${todoPriority === 'low' ? 'selected' : ''} value="low">
        Low
      </option>
      <option ${todoPriority === 'medium' ? 'selected' : ''} value="medium">
        Medium
      </option>
      <option ${todoPriority === 'high' ? 'selected' : ''} value="high">
        High
      </option>
    </select>
  `;

  const projectOptions = ProjectManager.projects.map((project) => {
    const name = project.title;
    // TODO: Añadir selected para cuando haya más de un proyecto

    return `<option value="${_.lowerFirst(name)}">${name}</option>`;
  });

  const project = `
    <label for="project" class="todoLabel">Project:</label>
    <select class="project" name="project">
      ${projectOptions}
    </select>
  `;

  const buttonValue = _.isEmpty(todo) ? 'Add todo' : 'Edit todo';
  const button = `
    <input
      type="submit"
      value="${buttonValue}"
      class="closeFormButton"
    />
  `;

  const form = `
    <form class="todoForm" action="">
      ${header}
      ${title}
      ${description}
      ${dueDate}
      ${priority}
      ${project}
      ${button}
    </form>
  `;

  const overlay = `
    <div class="overlay">${form}</div>
  `;

  document.body
    .querySelector('.mainGrid')
    .insertAdjacentHTML('afterbegin', overlay);

  const insertedForm = document.querySelector('.todoForm');
  if (_.isEmpty(todo)) insertedForm.addEventListener('submit', handleSaveEvent);
  else {
    const projectPos = todo.dataProjectPos;
    const todoPos = todo.dataTodoPos;

    insertedForm.addEventListener('submit', (event) =>
      handleEditEvent(event, todoPos, projectPos)
    );
  }
}

export default generateTodoHover;
