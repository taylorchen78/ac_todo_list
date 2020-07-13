const data = {
  todoItemList: [
    'Hit the gym',
    'Read a book',
    'Buy eggs',
    'Organize office',
    'Pay bills'
  ],
  doneItemList: [
  ]
}

const modal = {
  getTodoList() {
    return data.todoItemList
  },
  addTodoList(content) {
    data.todoItemList.push(content)
  },
  removeTodoList(id) {
    data.todoItemList.splice(id, 1);
  },
  getDoneList() {
    return data.doneItemList
  },
  addDoneList(content) {
    data.doneItemList.push(content)
  },
  removeDoneList(id) {
    data.doneItemList.splice(id, 1);
  }
}

const controller = {
  init() {
    view.init()
    controller.generateTodoList()
  },
  generateTodoList() {
    view.clearTodo()

    const todoList = modal.getTodoList()
    for (let todo of todoList) {
      controller.addtodoItem(todo)
    }
  },
  addtodoItem(content) {
    view.renderList(content)
  },
  addTodo(content) {
    const currentTodoList = modal.getTodoList()
    let bIsRepeat = false

    for (let todo of currentTodoList) {
      if (content === todo) {
        bIsRepeat = true
      }
    }

    if (bIsRepeat === false && content !== "") {
      modal.addTodoList(content)
      controller.addtodoItem(content)
    }

    view.clearInput()
  },
  removetodoItem(content) {
    const currentTodoList = modal.getTodoList()
    currentTodoList.forEach((item, index) => {
      if (content === item) {
        modal.removeTodoList(index)
        return
      }
    })
  },
  addDoneItem(content) {
    modal.addDoneList(content)
  },
  removeDoneItem(content) {
    const currentDoneList = modal.getDoneList()
    currentDoneList.forEach((item, index) => {
      if (content === item) {
        modal.removeDoneList(index)
        return true
      }
    })
  },
  generateDoneList() {
    view.clearDone()

    const doneList = modal.getDoneList()
    for (let done of doneList) {
      view.rendorDoneList(done)
    }
  }
}

const view = {
  todolist: document.querySelector('#my-todo'),
  doneList: document.querySelector('#my-done'),
  addBtn: document.querySelector('#addBtn'),
  inputValue: document.querySelector('#newTodo'),
  init() {
    view.addBtn.addEventListener('click', view.addNewTodo)
    view.inputValue.addEventListener('keydown', view.addNewTodoByEnter)
    view.todolist.addEventListener('click', view.removeTodo)
    view.doneList.addEventListener('click', view.removeDone)
  },
  renderList(text) {
    let newItem = document.createElement('li')
    newItem.innerHTML = `
      <label class="todo">${text}</label>
      <i class="delete fa fa-trash"></i>
    `
    view.todolist.appendChild(newItem)
  },
  addNewTodo(e) {
    controller.addTodo(view.inputValue.value.trim())
  },
  addNewTodoByEnter(e) {
    if (event.keyCode == 13) {
      controller.addTodo(view.inputValue.value.trim())
    }
  },
  clearInput() {
    view.inputValue.value = ''
  },
  clearTodo() {
    view.todolist.innerHTML = ''
  },
  removeTodo(e) {
    if (e.target.classList.contains('delete')) {
      controller.removetodoItem(e.target.previousSibling.previousSibling.textContent)
      controller.generateTodoList()
    } else if (e.target.classList.contains('todo')) {
      controller.removetodoItem(e.target.textContent)
      controller.generateTodoList()
      controller.addDoneItem(e.target.textContent)
      view.rendorDoneList(e.target.textContent)
    }
  },
  rendorDoneList(text) {
    let newDoneItem = document.createElement('li')
    newDoneItem.innerHTML = `
      <label class='checked'>${text}</label>
      <i class="delete fa fa-trash"></i>
    `
    view.doneList.appendChild(newDoneItem)
  },
  removeDone(e) {
    if (e.target.classList.contains('delete')) {
      controller.removeDoneItem(e.target.previousSibling.previousSibling.textContent)
      controller.generateDoneList()
    }
  },
  clearDone() {
    view.doneList.innerHTML = ''
  },
}

controller.init()

