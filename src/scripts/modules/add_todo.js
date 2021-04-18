import _ from 'lodash';

import '../../style/add_todo.css';

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

function handleSaveEvent(event) {
  event.preventDefault();

  // Extract data from form
  const iterator = new FormData(event.target).entries();
  const data = [...iterator].map((element) => element);
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
function generateTodoHover() {
  const header = `<h3 class="headerForm">Add a todo</h3>`;

  const title = `
    <label for="title" class="todoLabel">Title:</label>
    <input
      type="text"
      class="title text"
      name="title"
      required="required"
    />
  `;

  const description = `
    <label for="description" class="todoLabel">Description:</label>
    <textarea
      type="text"
      class="description text"
      name="description"
      required="required"
    ></textarea>
  `;

  const dueDate = `
    <label for="dueDate" class="todoLabel">Due Date:</label>
    <input
      type="date"
      name="dueDate"
      class="dueDate"
      required="required"
    />
  `;

  const priority = `
    <label for="priority" class="todoLabel">Priority:</label>
    <select class="priority" name="priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  `;

  const projectOptions = ProjectManager.projects.map((project) => {
    const name = project.title;

    return `<option value="${_.lowerFirst(name)}">${name}</option>`;
  });

  const project = `
    <label for="project" class="todoLabel">Project:</label>
    <select class="project" name="project">
      ${projectOptions}
    </select>
  `;

  const button = `
    <input
      type="submit"
      value="Add todo"
      class="closeFormButton"
    />
  `;

  const form = `
    <form class="addTodoForm" action="">
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

  document.body
    .querySelector('.addTodoForm')
    .addEventListener('submit', handleSaveEvent);
}

export default generateTodoHover;
