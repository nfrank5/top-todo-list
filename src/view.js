import { createList } from './lists';
import { createTodo } from './todos';
import { saveToStorage, setInitialLists } from './storage';

let initialList = createList('Default list');
let createdLists = [initialList];
const PRIORITIES = {0:"low-priority", 1:"medium-priority", 2:"high-priority"}

const dialog = document.querySelector("dialog");
const confirmBtn = dialog.querySelector(".confirmBtn");
const titleInput = dialog.querySelector("#title");
const dueDateInput = dialog.querySelector("#dueDate")
const descriptionInput = dialog.querySelector("#description");
const notesInput = dialog.querySelector("#notes");
const closeBtn = dialog.querySelector(".close");
const listDiv = document.querySelector('.listTable');
const listSelectionDiv = document.querySelector(".list-selection");
const inputNewList = document.querySelector("#newList");
const createListInputDiv = document.querySelector(".createListInput")
const applyButton = document.querySelector("#apply")
const priority = document.querySelector("#priority")

applyButton.addEventListener("click", createNewList)

function cleanTable(){
  listDiv.innerHTML = '';
}

function displayList(list, index = null){
  if(list!= undefined){
    const todos = list.getTodos()
    const tableList = document.createElement('table');
    const listheader = document.createElement('h2');
    const deleteListButton = document.createElement('button')
    const createNewTaskButton = document.createElement('button');
    

    deleteListButton.textContent = "Delete";
    deleteListButton.classList.add("deleteListButton")
    listheader.innerText = `${list.title}`;
    listheader.appendChild(deleteListButton);
    listheader.classList.add("listHeader");
    createNewTaskButton.textContent = 'Create New Task';
    createNewTaskButton.classList.add("createNewTaskButton");

    createNewTaskButton.addEventListener("click", (e) => {
      const newTodo = createTodo();
      newTodo.source = 'createNewTaskButton'
      displayTodoDetails(list, newTodo);
    });

    deleteListButton.addEventListener("click", ()=> {
      createdLists.splice(index, 1);
      displayList(createdLists[0])
      showListsTitles(createdLists);
      saveToStorage(createdLists);
    })

    cleanTable();
    listDiv.appendChild(listheader);
    listDiv.appendChild(tableList);
    listDiv.appendChild(createNewTaskButton);
    
    todos.forEach((todo, index)=> {
      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.innerText = "X"
      deleteTaskButton.addEventListener("click", deleteTask.bind(null, list, todo))

      const detailsButton = document.createElement("button");
      detailsButton.textContent = 'Details';
      detailsButton.addEventListener('click', displayTodoDetails.bind(null, list, todo));
      
      const row = tableList.insertRow(-1);

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);

      cell1.textContent = todo.title;
      cell2.appendChild(detailsButton);
      cell3.appendChild(createPriorityDot(todo));
      cell4.appendChild(deleteTaskButton);
    });
    document.body.appendChild(listDiv);
  } else {
    cleanTable();
  }
}

function displayTodoDetails(list, todo){
  attachListenersTodoDetails(saveUpdateTodo);
  function saveUpdateTodo(e){
    let date;
    if(dueDateInput.value.length > 0){
      date = new Date(dueDateInput.value)
    }
    if (todo.source === 'createNewTaskButton'){
      list.addTodo(todo);
      delete todo.source
    }
    todo.updateTodo(titleInput.value, date, descriptionInput.value, notesInput.value, priority.value )
    e.preventDefault();
    dialog.close();
    displayList(list);
    saveToStorage(createdLists);
  }

  titleInput.value = todo.title || '';
  dueDateInput.value = todo.dueDate || '';
  descriptionInput.value = todo.description || '';
  notesInput.value = todo.notes || '';
  priority.value = todo.priority;
  dialog.showModal();
}

function createPriorityDot(todo){
  let priorityDot = document.createElement("div");
  priorityDot.classList.add(PRIORITIES[todo.priority], 'priority-dot');
  return priorityDot
}

function showListsTitles(lists){
  listSelectionDiv.innerHTML = '';
  lists.forEach(function(list, index){
    let listTitle = document.createElement("button");
    listTitle.textContent = list.title;
    listTitle.addEventListener('click', displayList.bind(null, list, index));
    listSelectionDiv.appendChild(listTitle);
  }); 
}

function attachListenersTodoDetails(saveUpdateTodo){
  dialog.addEventListener("close", (e) => {
    confirmBtn.removeEventListener("click", saveUpdateTodo);//Remove listener to delete previous events
  });
     
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  })
  confirmBtn.addEventListener("click", saveUpdateTodo);
}

function deleteTask(list, todo){
  list.getTodos().forEach((t,index) => {
    if(t===todo){
      list.getTodos().splice(index, 1);
    }
  })
  displayList(list);
  saveToStorage(createdLists);
}

function createNewList(){
  createdLists.push(createList(inputNewList.value));
  inputNewList.value = "";
  listSelectionDiv.innerHTML = '';
  showListsTitles(createdLists);
  saveToStorage(createdLists);
}

const screenEventHandler = (function (){
  if (!localStorage.getItem("data")) {
    showListsTitles(createdLists);
    displayList(initialList);
  } else {
    createdLists = setInitialLists();
    showListsTitles(createdLists);
    displayList(createdLists[0]);
  }
  return {}
})();

export { screenEventHandler };