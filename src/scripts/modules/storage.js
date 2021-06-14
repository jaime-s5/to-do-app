import _ from 'lodash';

import { Todo, Project, ProjectManager } from './project_manager';

const PersistentStorage = (function () {
  const todoKeys = Todo();

  function storeTodo(todo, projectPos, todoPos = -1) {
    // Get number of todos stored
    const todosStored = parseInt(
      localStorage.getItem(`proj${projectPos}Todos`)
    );

    let todoPosition;
    let numberTodos;

    // Add new todo, else replace it
    if (todoPos === -1) {
      numberTodos = todosStored + 1;
      todoPosition = numberTodos - 1;
    } else {
      numberTodos = todosStored;
      todoPosition = todoPos;
    }

    Object.entries(todo).forEach((el) =>
      localStorage.setItem(`todo${todoPosition}${projectPos}${el[0]}`, el[1])
    );

    localStorage.setItem(`proj${projectPos}Todos`, numberTodos);
  }

  function deleteTodo(projectPos, todoPos) {
    // Delete the actual todo
    Object.entries(todoKeys).forEach((el) =>
      localStorage.removeItem(`todo${todoPos}${projectPos}${el[0]}`)
    );

    // Move all todos of project one position down
    const todos = parseInt(localStorage.getItem(`proj${projectPos}Todos`));
    for (let i = todoPos + 1; i < todos; i++) {
      Object.entries(todoKeys).forEach((el) => {
        const current = localStorage.getItem(`todo${i}${projectPos}${el[0]}`);

        localStorage.setItem(`todo${i - 1}${projectPos}${el[0]}`, current);
        localStorage.removeItem(`todo${i}${projectPos}${el[0]}`);
      });
    }

    localStorage.setItem(`proj${projectPos}Todos`, todos - 1);
  }

  function addProject(title) {
    const projects =
      'numberProjects' in localStorage
        ? parseInt(localStorage.getItem('numberProjects'))
        : 0;

    localStorage.setItem(`proj${projects}Todos`, 0);
    localStorage.setItem(`proj${projects}Title`, title);
    localStorage.setItem('numberProjects', projects + 1);
  }

  function removeProject(projectPos) {
    // Delete all todos associated with project projectPos
    const todos = localStorage.getItem(`proj${projectPos}Todos`);
    for (let i = 0; i < todos; i++) {
      deleteTodo(projectPos, i);
    }

    // Delete current projectPos title and number of todos
    const oldNumberProjects = parseInt(localStorage.getItem('numberProjects'));
    localStorage.removeItem(`proj${projectPos}Title`);
    localStorage.removeItem(`proj${projectPos}Todos`);

    // Displace one position down titles and number of todos
    for (let i = projectPos + 1; i < oldNumberProjects; i++) {
      const currentTitle = localStorage.getItem(`proj${i}Title`);
      const currentTodos = localStorage.getItem(`proj${i}Todos`);

      localStorage.setItem(`proj${i - 1}Title`, currentTitle);
      localStorage.setItem(`proj${i - 1}Todos`, currentTodos);

      localStorage.removeItem(`proj${i}Title`);
      localStorage.removeItem(`proj${i}Todos`);
    }

    localStorage.setItem('numberProjects', oldNumberProjects - 1);
  }

  function restoreProjects() {
    const projects = localStorage.getItem('numberProjects');

    const projectTitles = [];

    for (let i = 0; i < projects; i++) {
      projectTitles.push(localStorage.getItem(`proj${i}Title`));
    }

    return projectTitles;
  }

  function restoreTodos() {
    const projects = localStorage.getItem('numberProjects');

    const arrayTodos = [];

    for (let i = 0; i < projects; i++) {
      const numberTodos = localStorage.getItem(`proj${i}Todos`);
      for (let j = 0; j < numberTodos; j++) {
        const todo = Object.entries(todoKeys).reduce((accumulatedTodo, el) => {
          const key = el[0];
          const value = localStorage.getItem(`todo${j}${i}${key}`);
          accumulatedTodo[key] = value;
          return accumulatedTodo;
        }, {});

        arrayTodos.push(todo);
      }
    }
    return arrayTodos;
  }

  const proto = Object.create({
    storeTodo,
    deleteTodo,
    addProject,
    restoreProjects,
    restoreTodos,
    removeProject,
  });

  return Object.assign(proto);
})();

function createTodosAndProjects() {
  const todos = [];
  const projects = [];

  if (localStorage.length === 0) {
    todos.push(
      Todo(
        'Wash teeth',
        'Some brush to wash your teeth, bought for 23.99$ at the Lidl Supermarket',
        '2021-06-05',
        'Low',
        'Inbox'
      ),
      Todo(
        'Homework',
        'Calculos homework chapter 2',
        '2021-06-06',
        'High',
        'Inbox'
      ),
      Todo(
        'Homework',
        'Algebra homework chapter',
        '2021-06-05',
        'Medium',
        'Homework'
      )
    );

    projects.push(..._.uniq(todos.map((todo) => todo.project)));

    projects.forEach((project, index) =>
      PersistentStorage.addProject(project, index)
    );

    PersistentStorage.storeTodo(todos[0], 0);
    PersistentStorage.storeTodo(todos[1], 0);
    PersistentStorage.storeTodo(todos[2], 1);
  } else {
    todos.push(...PersistentStorage.restoreTodos());
    projects.push(...PersistentStorage.restoreProjects());
  }

  projects.forEach((project) => {
    const match = ProjectManager.findProject(project);

    if (match === -1) ProjectManager.addProject(Project(project));
  });

  todos.forEach((todo) => {
    const index = ProjectManager.findProject(todo.project);

    const project = ProjectManager.projects[index];
    project.addTodos(todo);
  });
}

export { createTodosAndProjects, PersistentStorage };
