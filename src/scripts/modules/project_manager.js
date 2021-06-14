import _ from 'lodash';

function Todo(title, description, dueDate, priority, project) {
  return { title, description, dueDate, priority, project };
}

function Project(name) {
  const title = name;
  const todos = [];

  function addTodos(...todoArray) {
    todos.push(...todoArray);
  }

  function removeTodo(index) {
    todos.splice(index, 1);
  }

  function replaceTodo(index, todo) {
    todos.splice(index, 1, todo);
  }

  function getMatchedTodo(index) {
    return _.clone(todos[index]);
  }

  function getTodos() {
    return _.clone(todos);
  }

  const proto = Object.create({
    addTodos,
    removeTodo,
    replaceTodo,
    getTodos,
    getMatchedTodo,
  });

  return Object.assign(proto, { title });
}

const ProjectManager = (function () {
  const projects = [];

  function addProject(project) {
    projects.push(project);
  }

  function removeProject(index) {
    projects.splice(index, 1);
  }

  function retrieveData(data) {
    projects.push(data);
  }

  function cloneData() {
    return _.cloneDeep(projects);
  }

  function findProject(title) {
    const lowerTitle = _.lowerCase(title).split(' ').join('');

    const match = projects.findIndex(
      (project) => _.lowerFirst(project.title) === lowerTitle
    );
    return match;
  }

  const proto = Object.create({
    addProject,
    removeProject,
    retrieveData,
    cloneData,
    findProject,
  });

  return Object.assign(proto, { projects });
})();

export { Todo, Project, ProjectManager };
