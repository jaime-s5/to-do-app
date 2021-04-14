import _ from 'lodash';

import '../../style/tab_content.css';

import generateTodoCard from './todo_card';
import { Todo, Project, ProjectManager } from './project_manager';

(function createTodosAndProjects() {
  const todos = [
    Todo(
      'Wash teeth',
      'Some brush to wash your teeth',
      'Dec 12th',
      'Low',
      'Inbox'
    ),
    Todo(
      'Homework',
      'Calculos homework chapter 2',
      'Dec 29th',
      'High',
      'Inbox'
    ),
  ];

  const inbox = Project('Inbox');
  inbox.addTodos(...todos);
  ProjectManager.addProject(inbox);
})();

// TODO: Change default parameter to []
function generateTabCards(todosToShow = []) {
  let cards = '';

  todosToShow.forEach((todoData) => {
    cards += generateTodoCard(todoData);
  });
  const cardsContainer = `
    <div class="cardsContainer">${cards}</div>`;

  document.body
    .querySelector('.mainContent')
    .insertAdjacentHTML('beforeend', cardsContainer);
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
}

// TODO: Extract todos from single function and pass array to generateTabCards
function generateTodayTabContent() {
  generateTabCards([ProjectManager.projects[0].getMatchedTodo(0)]);
}

function generateWeekTabContent() {
  generateTabCards([ProjectManager.projects[0].getMatchedTodo(1)]);
}

// Inbox and Projects Tabs
function generateProjectTabContent(projectTitle) {
  const indexProject = ProjectManager.projects.findIndex((project) =>
    _.lowerCase(project.title).includes(projectTitle)
  );

  const project = _.cloneDeep(ProjectManager.projects[indexProject]);

  const matchedTodos = [];
  const todos = project.getTodos();
  // TODO: Mira si se puede hacer con un map
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
