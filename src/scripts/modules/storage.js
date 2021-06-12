import _ from 'lodash';

import { Todo, Project, ProjectManager } from './project_manager';

const PersistentStorage = (function () {
  const todoKeys = Todo();

  function storeTodo(todo, projectPos, todoPos = -1) {
    // Get number of todos stored, if none, set it to 0
    const todosStored =
      `proj${projectPos}Todos` in localStorage
        ? parseInt(localStorage.getItem(`proj${projectPos}Todos`))
        : 0;

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

  function addProject(title, pos) {
    localStorage.setItem(`proj${pos}Title`, title);
    localStorage.setItem('numberProjects', pos + 1);
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
