import { createList } from './lists';
import { createTodo } from './todos';

let initialList = createList('Default list');
let createdLists = [initialList];

/* if (!localStorage.getItem("data")) {
  populateStorage();
} else {
  setInitialLists();
}
 */
let asd = document.querySelector("#asd")
asd.addEventListener("click", populateStorage);
let zxc = document.querySelector("#zxc")
zxc.addEventListener("click", setInitialLists);

function populateStorage(){
  console.log(1)
  localStorage.removeItem("data");
  localStorage.setItem("data", JSON.stringify(createdLists));

}

function setInitialLists(){
  console.log(2)

  let data = JSON.parse(localStorage.getItem("data"))
  createdLists = []
  data.forEach((l) => {
    const newList = createList(l.title)
    l.todos.forEach((t) => {
      let date;
      if(typeof t.dueDate != undefined ){
        date = new Date(t.dueDate);
      } else {
        ""; 
      }
      newList.addTodo(createTodo(t.title, t.description, t.notes, date, t.priority)) 
    })
    createdLists.push(newList);
  })
  showListsTitles(createdLists);
  displayList(createdLists[0]);
}

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
const displayCreateNewListButton = document.querySelector("#create-new-list");
const createListInputDiv = document.querySelector(".createListInput")
const applyButton = document.querySelector("#apply")
const priority = document.querySelector("#priority")

displayCreateNewListButton.addEventListener("click", toggleCreateNewList);
applyButton.addEventListener("click", createNewList)
//priority.addEventListener("change", () =>{ console.log(priority.value)})


function cleanTable(){
  listDiv.innerHTML = '';
}

function displayList(list){
  const todos = list.getTodos()
  const tableList = document.createElement('table');
  const listheader = document.createElement('h2');
  const createNewTaskButton = document.createElement('button');

  listheader.innerText = `Selected List: ${list.title}`;
  listheader.classList.add("listHeader");
  createNewTaskButton.textContent = 'Create New Task';
  createNewTaskButton.classList.add("createNewTaskButton");

  createNewTaskButton.addEventListener("click", (e) => {
    const newTodo = createTodo();
    newTodo.source = 'createNewTaskButton'
    displayTodoDetails(list, newTodo);
  });

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

    //console.log(priorityDot.classList)
    
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
}



function displayTodoDetails(list, todo){

  attachListenersTodoDetails(saveUpdateTodo);

  function saveUpdateTodo(e){
    let date;
    if(dueDateInput.value.length > 0){
      date = new Date(dueDateInput.value)
    }else{
      date = dueDateInput.value;
    }
    if (todo.source === 'createNewTaskButton'){
      list.addTodo(todo);
      delete todo.source
    }
    todo.updateTodo(titleInput.value, date, descriptionInput.value, notesInput.value, priority.value )
    e.preventDefault();
    dialog.close();
    displayList(list);
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
  lists.forEach(function(list){
    let listTitle = document.createElement("button");
    listTitle.textContent = list.title;
    listTitle.addEventListener('click', displayList.bind(null, list));
    listSelectionDiv.appendChild(listTitle);
  }); 
}

function attachListenersTodoDetails(saveUpdateTodo){
  dialog.addEventListener("close", (e) => {
    confirmBtn.removeEventListener("click", saveUpdateTodo) //Remove listener to delete previous events
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
}

function toggleCreateNewList(){
  if(createListInputDiv.style.display === 'unset'){
    createListInputDiv.style.display = 'none'
  } else {
    createListInputDiv.style.display = 'unset'
  }
}

function createNewList(){
  createdLists.push(createList(inputNewList.value));
  inputNewList.value = "";
  listSelectionDiv.innerHTML = '';
  toggleCreateNewList();
  showListsTitles(createdLists);
}

const screenEventHandler = (function (){

  showListsTitles(createdLists);
  displayList(initialList);
  return {}

})();



export { screenEventHandler };