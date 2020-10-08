'use strict';

const btnCreateTask = document.querySelector('.btn-create-task');
const btnAddTask = document.querySelector('.btn-add-task');
const btnDeleteTask = document.querySelector('.btn-add-task');
const wrapperInputTask = document.querySelector('.wrapper-input-task');
const inputTask = document.querySelector('.input-task');

btnCreateTask.onclick = () => {
  btnCreateTask.classList.add('hide');
  wrapperInputTask.classList.remove('hide');
};

btnAddTask.onclick = () => {
  inputTask.classList.remove('void');
  checkUserInput();
};

inputTask.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    inputTask.classList.remove('void');
    checkUserInput();
  }
});

function checkUserInput() {
  const inputValue = inputTask.value;

  if (inputValue) {
    btnCreateTask.classList.remove('hide');
    wrapperInputTask.classList.add('hide');

    addTaskToList({
      description: inputValue,
    });

    inputTask.value = '';
  } else {
    inputTask.classList.add('void');
  }
}

const listTasks = document.querySelector('.todo-app__list');

function addTaskToList({ description }) {
  const number = listTasks.childNodes.length + 1;
  const li = document.createElement('li');
  const taskContent = `
    <input type="checkbox" id="checkbox-complete-task-${number}" class="task__checkbox-complete" hidden/>
    <label for="checkbox-complete-task-${number}" class="fake-checkbox"></label>
    <span class="task__number">${number}</span>
    <input class="task__description" value=${description} disabled />
    <button class="task__btn-delete btn">&times;</button>
  `;

  li.className = 'task';
  li.innerHTML = taskContent;

  listTasks.appendChild(li);
}

listTasks.addEventListener('click', (event) => {
  if (event.target.classList.contains('task__btn-delete')) {
    event.target.parentNode.remove();
    updateNumbersTask();
  } else if (event.target.classList.contains('task__checkbox-complete')) {
    event.target.checked
      ? event.target.parentNode.classList.add('complete')
      : event.target.parentNode.classList.remove('complete');
  }
});

function updateNumbersTask() {
  for (let i = 0; i < listTasks.childNodes.length; i += 1) {
    listTasks.childNodes[i].querySelector(
      'input[type=checkbox]'
    ).id = `checkbox-complete-task-${i + 1}`;
    listTasks.childNodes[i].querySelector(
      '.fake-checkbox'
    ).for = `checkbox-complete-task-${i + 1}`;

    listTasks.childNodes[i].querySelector('.task__number').textContent = i + 1;
  }
}
