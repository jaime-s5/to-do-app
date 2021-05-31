import _ from 'lodash';

import { ProjectManager } from './project_manager';

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
      </div>`;
  });

  document.body
    .querySelector('.projectsContainer')
    .insertAdjacentHTML('beforeend', projectTabs);
}

export default generateProjectTabs;
