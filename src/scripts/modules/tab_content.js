import '../../style/tab_content.css';

import generateTodoCard from './todo_card';

// TODO: Change default parameter to []
function generateTabCards(todosToShow = [{}]) {
  let cards = '';

  todosToShow.forEach((todo) => {
    cards += generateTodoCard(todo);
  });
  const cardsContainer = `
    <div class="cardsContainer">${cards}</div>`;

  document.body
    .querySelector('main')
    .insertAdjacentHTML('beforeend', cardsContainer);
}

function generateTabAddTodo() {
  const addTodoContainer = `
    <div class="addTodo">
      <span class="add">&#43;</span>
      <p class="addTodoDescription">Add Todo</p>
    </div>`;

  document.body
    .querySelector('main')
    .insertAdjacentHTML('beforeend', addTodoContainer);
}

// TODO: Extract todos from single function and pass array to generateTabCards
function generateTodayTabContent() {
  generateTabCards();
}

function generateWeekTabContent() {
  generateTabCards();
}

// Inbox and Projects Tabs
function generateProjectTabContent() {
  generateTabCards();
  generateTabAddTodo();
}

export {
  generateProjectTabContent,
  generateTodayTabContent,
  generateWeekTabContent,
};
