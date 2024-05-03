import { createList } from './lists';
import { createTodo } from './todos';

const initialList = createList('Default list');


// Dummie data
const anotherList = createList('Another list');
let leche = createTodo("comprar leche")
initialList.addTodo(leche);
leche.updateTodo("comprar leche",new Date(2024, 1, 11), "En el kiosco de le esquina", "" )
let pan = createTodo("comprar pan")
pan.incresePriority()
pan.incresePriority()
initialList.addTodo(pan);
let agua = createTodo("comprar agua")
agua.incresePriority()
initialList.addTodo(agua);
agua.updateTodo("comprar agua","En el almacen","","")



const createdLists = [initialList];
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
  listheader.innerHTML = `${list.title}`;
  createNewTaskButton.textContent = 'Create New Task';
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
    let detailsButton = document.createElement("button");
    detailsButton.textContent = 'Details';
    detailsButton.addEventListener('click', displayTodoDetails.bind(null, list, todo));

    //console.log(priorityDot.classList)
    
    const row = tableList.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.textContent = todo.title;
    cell2.appendChild(detailsButton);
    cell3.appendChild(createPriorityDot(todo));
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
  lists.forEach(function(list){
    console.log(list.title)
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

function toggleCreateNewList(){
  if(createListInputDiv.style.display === 'unset'){
    displayCreateNewListButton.textContent = "Create New Lists"

    createListInputDiv.style.display = 'none'
  } else {
    displayCreateNewListButton.textContent = "Hide Create New Lists Field"
    createListInputDiv.style.display = 'unset'
  }
}

function createNewList(){
  createdLists.push(createList(inputNewList.value));
  inputNewList.value = "";
  listSelectionDiv.innerHTML = '';
  showListsTitles(createdLists);
}

const screenEventHandler = (function (){

  showListsTitles(createdLists);
  displayList(initialList);
  return {}

})();



export { screenEventHandler };