import _ from 'lodash';

import { ProjectManager } from '../project_manager';

function getOverlayHTML(todoTitle, todoDescription, todoDueDate, todoPriority) {
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

  const buttonValue = todoTitle === '' ? 'Add todo' : 'Edit todo';
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

  return overlay;
}

export default getOverlayHTML;
