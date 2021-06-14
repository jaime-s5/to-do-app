import _ from 'lodash';
import { getProjectOverlayHTML } from './interface/overlay';

import { ProjectManager, Project } from './project_manager';
import { getDataObject, addOverlayEvents } from './form';
import { switchProjectTabs } from './switch_tabs';
import { PersistentStorage } from './storage';

function tabClickEvent(event) {
  if (event.target.className === 'removeIconProject') {
    const tab = event.currentTarget;
    const project = _.upperFirst(tab.className.split(' ')[0]);
    const index = ProjectManager.findProject(project);
    ProjectManager.removeProject(index);
    PersistentStorage.removeProject(index);
    tab.remove();
  } else {
    switchProjectTabs(event);
  }
}

function generateProjectTabs() {
  const projects = ProjectManager.projects
    .map((project, index) => ({
      title: project.title,
      index,
    }))
    .filter((project) => project.title !== 'Inbox');

  const projectTabs = projects.map((project) => {
    const capitalTitle = project.title;
    const lowerTitle = _.lowerFirst(project.title);

    return `
      <div class="${lowerTitle} tab tabClicker">
        <img 
          src="./assets/images/project.png"
          alt="${capitalTitle} Icon" 
          class="${lowerTitle}Icon iconTab iconProject"
        >
        <p class="${lowerTitle}Description">${capitalTitle}</p>
        <div class="removeProject">
          <span class="removeIconProject">✗</span>
        </div>
      </div>`;
  });

  projectTabs.forEach((tab) =>
    document.body
      .querySelector('.projectsContainer')
      .insertAdjacentHTML('beforeend', tab)
  );

  document
    .querySelectorAll('.projectsContainer > .tabClicker')
    .forEach((element) => element.addEventListener('click', tabClickEvent));
}

function removeProjectTabs() {
  const projectTabsContent = document.querySelector('.projectsContainer');

  // Remove project tabs
  if (projectTabsContent !== null) {
    while (projectTabsContent.firstChild) {
      projectTabsContent.firstChild.remove();
    }
  }
}

function removeProjectCardHover(projectTitle) {
  const title = _.lowerCase(projectTitle);
  const overlay = document.body.querySelector('.overlay');

  overlay.remove();

  removeProjectTabs();
  generateProjectTabs();
  document.querySelector(`.${title}`).click();
}

function saveProject(title) {
  const project = Project(title);

  ProjectManager.addProject(project);
  PersistentStorage.addProject(title);
  removeProjectCardHover(title);
}

function handleSubmitEvent(event) {
  event.preventDefault();

  const dataObject = getDataObject(event.target);
  const lowerTitle = _.lowerCase(dataObject.title).split(' ').join('');
  const title = _.upperFirst(lowerTitle);

  saveProject(title);
}

function checkFieldInput(event) {
  const title = event.target.value;
  const match = ProjectManager.findProject(title);

  if (title === '') {
    event.target.setCustomValidity('Field is Empty');
  } else if (match !== -1) {
    event.target.setCustomValidity('Project Already exists');
  } else {
    event.target.setCustomValidity('');
  }
}

// Displays Hover that allows to add projects
function generateProjectHover() {
  const projectOverlay = getProjectOverlayHTML();

  document.body
    .querySelector('.mainGrid')
    .insertAdjacentHTML('afterbegin', projectOverlay);

  const insertedForm = document.querySelector('.projectForm');
  const input = insertedForm.querySelector('.title');

  // Check for validity of input
  input.addEventListener('invalid', checkFieldInput, { once: true });
  input.addEventListener('input', checkFieldInput);
  insertedForm.addEventListener('submit', handleSubmitEvent);

  document
    .querySelector('.closeForm')
    .addEventListener('click', () =>
      document.querySelector('.overlay').remove()
    );

  addOverlayEvents();
}

function generateAddProjectEvent() {
  document.body
    .querySelector('.addProject')
    .addEventListener('click', generateProjectHover);
}

export { generateProjectTabs, generateAddProjectEvent };
