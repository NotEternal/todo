'use strict';

const btnCreateTask = document.querySelector('.btn-create-task');
const btnAddTask = document.querySelector('.btn-add-task');
const btnDeleteTask = document.querySelector('.btn-add-task');
const wrapperInputTask = document.querySelector('.wrapper-input-task');
const inputTask = document.querySelector('.input-task');

btnCreateTask.onclick = () => {
  btnCreateTask.classList.add('hide');
  wrapperInputTask.classList.remove('hide');
  inputTask.focus();
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
let tasksCounter = 0;

function addTaskToList({ description }) {
  tasksCounter += 1;

  const li = document.createElement('li');
  const taskContent = `
    <input type="checkbox" id="checkbox-complete-task-${tasksCounter}" class="task__checkbox-complete" hidden/>
    <label for="checkbox-complete-task-${tasksCounter}" class="fake-checkbox"></label>
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
  } else if (event.target.classList.contains('task__checkbox-complete')) {
    if (event.target.checked) {
      event.target.parentNode.classList.add('complete');
      addToCompleteList(event.target.parentNode);
    } else {
      event.target.parentNode.classList.remove('complete');
      removeFromCompleteList(event.target.parentNode);
    }
  }
});

const completeList = document.querySelector('.complete-section');

function addToCompleteList(task) {
  const li = document.createElement('li');
  const input = document.createElement('input');

  input.setAttribute('disabled', '');
  input.value = task.querySelector('.task__description').value;
  input.style.padding = '.4em';
  input.style.border = 'none';
  input.style.cursor = 'default';
  input.style.backgroundColor = 'transparent';
  input.style.color = 'var(--light)';
  li.appendChild(input);
  completeList.appendChild(li);
}

function removeFromCompleteList(task) {
  const completeTasks = completeList.querySelectorAll('li input');

  for (let completeTask of completeTasks) {
    if (completeTask.value === task.querySelector('.task__description').value) {
      completeTask.parentNode.remove();
    }
  }
}

const toggleCompleteList = document.querySelector('#visible-complete-task');

toggleCompleteList.onclick = () => {
  completeList.classList.toggle('visible');
};
