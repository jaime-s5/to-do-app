import _ from 'lodash';

import { Todo, ProjectManager } from './project_manager';
import { getOverlayHTML, getDetailsOverlayHTML } from './interface/overlay';
import { getDataObject, addOverlayEvents } from './form';
import { PersistentStorage } from './storage';

function removeTodoCardHover(projectTitle) {
  const title = _.lowerCase(projectTitle);
  const overlay = document.body.querySelector('.overlay');

  overlay.remove();
  document.querySelector(`.${title}`).click();
}

function saveTodo({ title, description, dueDate, priority, projectTitle }) {
  const todo = Todo(title, description, dueDate, priority, projectTitle);

  const index = ProjectManager.findProject(projectTitle);

  const project = ProjectManager.projects[index];

  project.addTodos(todo);
  PersistentStorage.storeTodo(todo, index);

  removeTodoCardHover(projectTitle);
}

function replaceTodo(
  { title, description, dueDate, priority, projectTitle },
  todoPos,
  projectPos
) {
  const todo = Todo(title, description, dueDate, priority, projectTitle);

  const projectNewPos = ProjectManager.findProject(projectTitle);
  const currentProject = ProjectManager.projects[projectPos];

  if (projectNewPos === parseInt(projectPos)) {
    currentProject.replaceTodo(todoPos, todo);
    PersistentStorage.storeTodo(todo, parseInt(projectPos), parseInt(todoPos));
  } else {
    const newProject = ProjectManager.projects[projectNewPos];

    currentProject.removeTodo(todoPos);
    PersistentStorage.deleteTodo(parseInt(projectPos), parseInt(todoPos));

    newProject.addTodos(todo);
    PersistentStorage.storeTodo(todo, projectNewPos);
  }

  removeTodoCardHover(projectTitle);
}

function handleSubmitEvent(event, todoPos, projectPos) {
  event.preventDefault();

  const dataObject = getDataObject(event.target);

  dataObject.projectTitle = _.upperFirst(dataObject.project);
  delete dataObject.project;

  if (todoPos === -1) {
    saveTodo(dataObject);
  } else {
    replaceTodo(dataObject, todoPos, projectPos);
  }
}

// Form to add or edit todos that hovers over blurred page
function generateTodoHover(todo = {}) {
  const todoTitle = _.isEmpty(todo) ? '' : todo.title;
  const todoDescription = _.isEmpty(todo) ? '' : todo.description;
  const todoDueDate = _.isEmpty(todo) ? '' : todo.dueDate;
  const todoPriority = _.isEmpty(todo) ? '' : _.lowerFirst(todo.priority);
  const todoProject = _.isEmpty(todo) ? '' : todo.project;

  const overlay = getOverlayHTML(
    todoTitle,
    todoDescription,
    todoDueDate,
    todoPriority,
    todoProject
  );

  document.body
    .querySelector('.mainGrid')
    .insertAdjacentHTML('afterbegin', overlay);

  const insertedForm = document.querySelector('.todoForm');

  const projectPos = _.isEmpty(todo) ? -1 : todo.dataProjectPos;
  const todoPos = _.isEmpty(todo) ? -1 : todo.dataTodoPos;

  insertedForm.addEventListener('submit', (event) =>
    handleSubmitEvent(event, todoPos, projectPos)
  );

  document
    .querySelector('.closeForm')
    .addEventListener('click', () =>
      document.querySelector('.overlay').remove()
    );

  addOverlayEvents();
}

// Displays Hover with details of todo
function generateDetailsHover(todo) {
  const detailsOverlay = getDetailsOverlayHTML(todo);

  document.body
    .querySelector('.mainGrid')
    .insertAdjacentHTML('afterbegin', detailsOverlay);

  addOverlayEvents();
}

function handleCardEvents(event) {
  const projectIndex = event.currentTarget.getAttribute('data-project-pos');
  const todoIndex = event.currentTarget.getAttribute('data-todo-pos');

  const project = ProjectManager.projects[projectIndex];
  const todo = project.getMatchedTodo(todoIndex);

  const elementClass = event.target.className;
  if (elementClass === 'removeIcon' || elementClass === 'clickDone') {
    project.removeTodo(todoIndex);
    PersistentStorage.deleteTodo(parseInt(projectIndex), parseInt(todoIndex));

    document.querySelector('.active').click();
  } else if (elementClass === 'editIcon') {
    todo.dataProjectPos = projectIndex;
    todo.dataTodoPos = todoIndex;
    generateTodoHover(todo);
  } else if (elementClass === 'detailsButton') {
    generateDetailsHover(todo);
  }
}

export { generateTodoHover, handleCardEvents };
