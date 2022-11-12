import MainMethod from './methods.js';

export default class Interactive {
    static changeCompletedListCheck = (statusCheck, id) => {
      const toDoLists = MainMethod.getToDoListFromStorage();
      toDoLists[id].completed = statusCheck;
      MainMethod.addListToStorage(toDoLists);
      MainMethod.showLists();
    }

    // checkbox status
    static checkStatusEvent = () => (
      document.querySelectorAll('.checkbox').forEach((checkbox) => checkbox.addEventListener('change', () => {
        let statusCheck;
        let id;
        if (checkbox.id > 0) {
          id = checkbox.id - 1;
        } else {
          id = 0;
        }

        if (checkbox.checked === true) {
          statusCheck = true;
        } else if (checkbox.checked !== true) {
          statusCheck = false;
        }

        this.changeCompletedListCheck(statusCheck, id);
      }))
    )

    static clearCompletedToDoLists = () => {
      let toDoLists = MainMethod.getToDoListFromStorage();

      toDoLists = toDoLists.filter((item) => item.completed !== true);
      MainMethod.newIndexNum(toDoLists);
      MainMethod.addListToStorage(toDoLists);
      MainMethod.showLists();
    }
}