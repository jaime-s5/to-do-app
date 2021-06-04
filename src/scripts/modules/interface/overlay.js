import _ from 'lodash';

import { ProjectManager } from '../project_manager';

const getTitleHTML = (title) => `
  <label for="title" class="todoLabel">Title:</label>
  <textarea
    type="text"
    class="title text"
    name="title"
    required="required"
  />${title}</textarea>`;

const getDescriptionHTML = (description) => `
  <label for="description" class="todoLabel">Description:</label>
  <textarea
    type="text"
    class="description text"
    name="description"
    required="required"
  >${description}</textarea>`;

const getDueDateHTML = (dueDate) => `
  <label for="dueDate" class="todoLabel">Due Date:</label>
  <input
    type="date"
    name="dueDate"
    class="dueDate"
    required="required"
    value="${dueDate}"
  />`;

const getPriorityHTML = (priority) => `
  <label for="priority" class="todoLabel">Priority:</label>
  <select class="priority" name="priority">
    <option ${priority === 'low' ? 'selected' : ''} value="low">
      Low
    </option>
    <option ${priority === 'medium' ? 'selected' : ''} value="medium">
      Medium
    </option>
    <option ${priority === 'high' ? 'selected' : ''} value="high">
      High
    </option>
  </select>`;

// Selects the correct project according to the clicked tab
function getMatchProjectTabClicked(name) {
  const activeTab = document.querySelector('.active');

  const projectTitles = ProjectManager.projects.map((element) =>
    _.lowerFirst(element.title)
  );

  const projectIndex = projectTitles.findIndex((element) =>
    activeTab.className.includes(element)
  );

  const projectTitle = _.upperFirst(projectTitles[projectIndex]);

  return projectTitle === name ? 'selected' : '';
}

const getProjectHTML = (todoProject) => {
  const projectOptions = ProjectManager.projects.map((project) => {
    const name = project.title;
    let selected = '';

    // If add todo is clicked, the project selected is the tab clicked
    // else, extracted from the edited todo
    if (todoProject === '') selected = getMatchProjectTabClicked(name);
    else selected = todoProject === name ? 'selected' : '';

    return `<option ${selected} value="${_.lowerFirst(name)}">${name}</option>`;
  });

  return `
    <label for="project" class="todoLabel">Project:</label>
    <select class="project" name="project">
      ${projectOptions.join('')}
    </select>`;
};

function getOverlayHTML(
  todoTitle,
  todoDescription,
  todoDueDate,
  todoPriority,
  todoProject
) {
  const header = `<h3 class="headerForm">Add a todo</h3>`;

  const title = getTitleHTML(todoTitle);

  const description = getDescriptionHTML(todoDescription);

  const dueDate = getDueDateHTML(todoDueDate);

  const priority = getPriorityHTML(todoPriority);

  const project = getProjectHTML(todoProject);

  const buttonClose = `
    <input
      type="button"
      value=Close
      class="closeForm button"
    />
  `;

  const buttonValue = todoTitle === '' ? 'Add todo' : 'Edit todo';
  const buttonSubmit = `
    <input
      type="submit"
      value="${buttonValue}"
      class="submitForm button"
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
      ${buttonClose}
      ${buttonSubmit}
    </form>
  `;

  const overlay = `
    <div tabindex="-1" class="overlay">${form}</div>
  `;

  return overlay;
}

function getDetailsOverlayHTML(todo) {
  const title = `<h3 class="headerDetails">${todo.title}</h3>`;

  const project = `
    <div class="todoPart">
      <p class="indicator">Project:</p>
      <p class="text">${todo.project}</p>
    </div>`;

  const priority = `
    <div class="todoPart">
      <p class="indicator">Priority:</p>
      <p class="text">${todo.priority}</p>
    </div>`;

  const dueDate = `
    <div class="todoPart">
      <p class="indicator">Due Date:</p>
      <p class="text">${todo.dueDate}</p>
    </div>`;

  const description = `
    <div class="todoPart">
      <p class="indicator">Description:</p>
      <p class="text">${todo.description}</p>
    </div>`;

  const details = `
    <div class="detailsDiv">
      ${title}
      ${project}
      ${priority}
      ${dueDate}
      ${description}
    </div>
  `;

  const overlay = `
    <div tabindex="-1" class="overlay">${details}</div>
  `;

  return overlay;
}

function getProjectOverlayHTML() {
  const header = `<h3 class="headerForm">Add a project</h3>`;

  const project = `
    <label for="title" class="projectLabel">Title:</label>
    <textarea
      type="text"
      class="title text"
      name="title"
      required="required"
    /></textarea>`;

  const buttonClose = `
    <input
      type="button"
      value=Close
      class="closeForm button"
    />
  `;

  const buttonSubmit = `
    <input
      type="submit"
      value="Add project"
      class="submitForm button"
    />
  `;

  const details = `
    <form class="projectForm">
      ${header}
      ${project}
      ${buttonClose}
      ${buttonSubmit}
    </form>
  `;

  const overlay = `
    <div tabindex="-1" class="overlay">${details}</div>
  `;

  return overlay;
}

export { getOverlayHTML, getDetailsOverlayHTML, getProjectOverlayHTML };
