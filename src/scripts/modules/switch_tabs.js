import _ from 'lodash';

import {
  generateProjectTabContent,
  generateTodayTabContent,
  generateWeekTabContent,
} from './tab_content';

import { ProjectManager } from './project_manager';

function toggleContent() {
  const tabContent = document.querySelector('.mainContent');

  // Remove tab-content and deselect tab if different tab clicked
  if (tabContent !== null) {
    const tabs = document.querySelectorAll('.tabClicker');
    for (let index = 0; index < tabs.length; index++) {
      tabs[index].className = tabs[index].className.replace(' active', '');
    }

    while (tabContent.firstChild) {
      tabContent.firstChild.remove();
    }
  }
}

// Remove and render content on tab clicking for default tabs
function switchDefaultTabs(event) {
  toggleContent();

  const tab = event.currentTarget;

  // Render content and make tab active
  if (tab.className.includes('inbox')) {
    generateProjectTabContent('inbox');
  } else if (tab.className.includes('today')) {
    generateTodayTabContent();
  } else if (tab.className.includes('week')) {
    generateWeekTabContent();
  }

  tab.className += ' active';
}

// Remove and render content on tab clicking for project tabs
function switchProjectTabs(event) {
  toggleContent();

  const projectTitles = ProjectManager.projects.map((project) =>
    _.lowerFirst(project.title)
  );

  const tab = event.currentTarget;

  const projectIndex = projectTitles.findIndex((title) =>
    tab.className.includes(title)
  );

  // Render content and make tab active
  generateProjectTabContent(projectTitles[projectIndex]);

  tab.className += ' active';
}

export { switchDefaultTabs, switchProjectTabs };
