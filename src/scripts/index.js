import '../style/reset.css';
import '../style/index.css';

import {
  generateProjectTabs,
  generateAddProjectEvent,
} from './modules/project_tabs';
import { switchDefaultTabs } from './modules/switch_tabs';
import { createTodosAndProjects } from './modules/storage';

createTodosAndProjects();
generateProjectTabs();
generateAddProjectEvent();

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
  .querySelectorAll('.sideNavBarTabs > .tabClicker')
  .forEach((element) => element.addEventListener('click', switchDefaultTabs));

document.querySelector('.inbox').click();

document.querySelector('.openNavBar').addEventListener('click', toggleNavBar);
