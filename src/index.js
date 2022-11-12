// import _ from 'lodash';
import './style.css';

// import from src modules
import MainMethod from './modules/methods.js';

const inputList = document.getElementById('inputList');
const addList = document.getElementById('addList');

inputList.addEventListener('submit', (e) => {
  e.preventDefault();
  MainMethod.addLists(addList.value);
  addList.value = '';
});

MainMethod.showLists();