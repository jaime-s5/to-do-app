import _ from 'lodash';
import { isToday, isThisWeek, parseISO } from 'date-fns';

import getTodoCardHTML from './interface/todo_card';
import { ProjectManager } from './project_manager';
import { generateTodoHover, handleCardEvents } from './todo';

function generateTabCards(todosToShow = []) {
  let cards = '';

  todosToShow.forEach((todoData) => {
    cards += getTodoCardHTML(todoData);
  });

  const cardsContainer = `
    <div class="cardsContainer">${cards}</div>`;

  document.body
    .querySelector('.mainContent')
    .insertAdjacentHTML('beforeend', cardsContainer);

  document.body
    .querySelectorAll('.todoCard')
    .forEach((card) => card.addEventListener('click', handleCardEvents));
}

function generateTabAddTodo() {
  const addTodoContainer = `
    <div class="addTodo">
      <span class="add">&#43;</span>
      <p class="addTodoDescription">Add Todo</p>
    </div>`;

  document.body
    .querySelector('.mainContent')
    .insertAdjacentHTML('beforeend', addTodoContainer);

  document.body
    .querySelector('.addTodo')
    .addEventListener('click', () => generateTodoHover());
}

// Checks for matched TODOs according the checker callback
// (isToday, isThisWeek)
function matchTodosDate(isMatch, opts = {}) {
  const projects = _.cloneDeep(ProjectManager.projects);
  const matchedTodos = [];

  for (let i = 0; i < projects.length; i++) {
    const todos = projects[i].getTodos();
    for (let j = 0; j < todos.length; j++) {
      const dueDate = parseISO(todos[j].dueDate);
      const match = _.isElement(opts)
        ? isMatch(dueDate)
        : isMatch(dueDate, opts);
      if (match) {
        const todo = { project_id: i, todo_id: j, todoObject: todos[j] };
        matchedTodos.push(todo);
      }
    }
  }

  return matchedTodos;
}

// Display todos which dueDate is today
function generateTodayTabContent() {
  const matchedTodos = matchTodosDate(isToday);

  generateTabCards(matchedTodos);
}
// Display todos which dueDate is this week
function generateWeekTabContent() {
  const matchedTodos = matchTodosDate(isThisWeek, { weekStartsOn: 1 });

  generateTabCards(matchedTodos);
}

// Inbox and Projects Tabs
function generateProjectTabContent(projectTitle) {
  const indexProject = ProjectManager.findProject(_.upperFirst(projectTitle));

  // If empty project, we exit
  if (indexProject === -1) return;

  const project = _.cloneDeep(ProjectManager.projects[indexProject]);

  const matchedTodos = [];
  const todos = project.getTodos();

  for (let i = 0; i < todos.length; i++) {
    const todo = { project_id: indexProject, todo_id: i, todoObject: todos[i] };
    matchedTodos.push(todo);
  }

  generateTabCards(matchedTodos);
  generateTabAddTodo();
}

export {
  generateProjectTabContent,
  generateTodayTabContent,
  generateWeekTabContent,
};
