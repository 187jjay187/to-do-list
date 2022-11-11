// import _ from 'lodash';
import './style.css';

// add to do list
const toDoList = [];

const taskOne = {
  description: 'make the bed',
  completed: false,
  index: 0,
};

toDoList.push(taskOne);

const taskTwo = {
  description: 'walk the dog',
  completed: false,
  index: 1,
};
toDoList.push(taskTwo);

const toDoTasksContainer = document.querySelector('.toDoTasksContainer');

// indexing function order
function compare(a, b) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
}

toDoList.sort(compare);

// to do list section
for (let i = 0; i < toDoList.length; i += 1) {
  const tasks = document.createElement('ul');
  tasks.className = 'tasks';
  tasks.innerHTML = `
  <li><input id="${toDoList[i].index}" type="checkbox"> 
  <label for="${toDoList[i].index}">${toDoList[i].description}</label></li>
  <li><a href=""><i class="fa fa-ellipsis-v icon"></i></a></li>
  `;
  toDoTasksContainer.appendChild(tasks);
}