// import from src modules folder

import DataList from './datalist.js';

// get listed inputs from local storage

export default class MainMethod {
  static getToDoListFromLocalStorage = () => {
    let toDoLists;

    if (JSON.parse(localStorage.getItem('LocalDataList')) === null) {
      toDoLists = [];
    } else {
      toDoLists = JSON.parse(localStorage.getItem('LocalDataList'));
    }
    return toDoLists;
  };

  // add listed inputs to the local storage
  static addListToStorage = (toDoLists) => {
    const item = JSON.stringify(toDoLists);
    localStorage.setItem('LocalDataList', item);
  };

  // index list inputs by number
  static newIndexNum = (toDoLists) => {
    toDoLists.forEach((item, i) => {
      item.index = i + 1;
    });
  }

  // delete from local storage
    static deleteListData = (id) => {
      let toDoLists = this.getToDoListFromLocalStorage();
      const ListItemToDelete = toDoLists[id];

      toDoLists = toDoLists.filter((item) => item !== ListItemToDelete);

      this.newIndexNum(toDoLists);
      this.addListToStorage(toDoLists);
    };

    static ListInputUpdate = (newDescription, id) => {
      const toDoLists = this.getToDoListFromLocalStorage();
      const updateList = toDoLists[id];

      toDoLists.forEach((item) => {
        if (item === updateList) {
          item.description = newDescription;
        }
      });

      this.addListToStorage(toDoLists);
      this.showLists();
    };

    static removeToDoListBtn = () => {
      document.querySelectorAll('.remove_btn').forEach((button) => button.addEventListener('click', (event) => {
        event.preventDefault();
        let id;
        if (button.id > 0) {
          id = button.id - 1;
        } else {
          id = 0;
        }
        this.deleteListData(id);
        this.showLists();
      }));
    };

    // section created dynamiclly
    static toDoListsHtml = ({ description, index }) => {
      const ul = document.createElement('ul');
      ul.className = 'to-do';
      ul.innerHTML = `
        <li><input class="checkbox" id="CHECK${index}" type="checkbox"></li> 
        <li><input id="LIST${index}" type="text" class="text" value="${description}" readonly></li>
        <li class="edit-remove">
        <button class="edit_list_btn" id="${index}"><i class="fa fa-ellipsis-v icon"></i></button>
        <button class="remove_btn" id="${index}"><i class="fa fa-trash-can icon"></i></button>
        </li>
      `;
      return ul;
    }

    static showLists = () => {
      const toDoLists = this.getToDoListFromLocalStorage();
      document.querySelector('.toDoListContainer').innerHTML = '';
      toDoLists.forEach((item) => {
        document.querySelector('.toDoListContainer').appendChild(this.toDoListsHtml(item));
      });

      this.removeToDoListBtn();
      this.editListBtnEvent();
      this.updateListBtnEvent();
    };

    // add a task to a list
    static addLists = (description) => {
      const toDoLists = this.getToDoListFromLocalStorage();
      const index = toDoLists.length + 1;
      const newtask = new DataList(description, false, index);

      toDoLists.push(newtask);
      this.addListToStorage(toDoLists);
      this.showLists();
    }

    // update to do list
    static updateListBtnEvent = () => {
      document.querySelectorAll('.text').forEach((input) => input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const inputListId = 'LIST';
          const ListIdSelected = event.currentTarget.id;
          let listID;

          if (!ListIdSelected.includes('LIST')) {
            listID = inputListId.concat(ListIdSelected);
          } else {
            listID = ListIdSelected;
          }

          document.getElementById(listID).setAttribute('readonly', 'readonly');
          this.ListInputUpdate(document.getElementById(listID).value, (Number(listID.replace('LIST', '')) - 1));
        }
      }));
    }

    // edit list
    static editListBtnEvent = () => {
      document.querySelectorAll('.edit_list_btn').forEach((button) => button.addEventListener('click', (event) => {
        event.preventDefault();
        const inputListId = 'LIST';
        const ListIdSelected = event.currentTarget.id;
        let listID;

        if (!ListIdSelected.includes('LIST')) {
          listID = inputListId.concat(ListIdSelected);
        } else {
          listID = ListIdSelected;
        }

        const listItem = event.target.closest('li');
        const ulItem = event.target.closest('ul');

        listItem.style.background = 'rgb(230, 230, 184)';
        ulItem.style.background = 'rgb(230, 230, 184)';

        document.getElementById(listID).removeAttribute('readonly');
        document.getElementById(listID).focus();
        document.getElementById(listID).style.background = 'rgb(230, 230, 184)';
        listItem.querySelector('.edit_list_btn').style.display = 'none';
        listItem.querySelector('.remove_btn').style.display = 'block';
      }));
    };
}