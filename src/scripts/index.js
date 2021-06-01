import '../style/reset.css';
import '../style/index.css';

import _ from 'lodash';

import {
  generateProjectTabContent,
  generateTodayTabContent,
  generateWeekTabContent,
} from './modules/tab_content';
import generateProjectTabs from './modules/project_tabs';
import { ProjectManager } from './modules/project_manager';

generateProjectTabs();

// Remove and render content on tab clicking
function switchTabs(event) {
  const tab = event.currentTarget;
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

  const projectTitles = ProjectManager.projects.map((project) =>
    _.lowerFirst(project.title)
  );

  const projectIndex = projectTitles.findIndex((title) =>
    tab.className.includes(title)
  );

  // Render content and make tab active
  if (projectIndex !== -1) {
    generateProjectTabContent(projectTitles[projectIndex]);
  } else if (tab.className.includes('today')) {
    generateTodayTabContent();
  } else if (tab.className.includes('week')) {
    generateWeekTabContent();
  }

  tab.className += ' active';
}

// Toggles sideBar when clicked (width screen less than 750px)
function toggleNavBar() {
  const sideNavBar = document.querySelector('.sideNavBar');

  if (sideNavBar.className.includes(' hiddenSmallWidth')) {
    sideNavBar.className = sideNavBar.className.replace(
      ' hiddenSmallWidth',
      ''
    );
  } else {
    sideNavBar.className += ' hiddenSmallWidth';
  }
}

document
  .querySelectorAll('.tabClicker')
  .forEach((element) => element.addEventListener('click', switchTabs));

document.querySelector('.inbox').click();

document.querySelector('.openNavBar').addEventListener('click', toggleNavBar);
