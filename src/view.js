import { createList } from './lists';
import { createTodo } from './todos';

const initialList = createList('Default list');


// Dummie data
const anotherList = createList('Another list');
let leche = createTodo("comprar leche")
initialList.addTodo(leche);
leche.updateTodo("comprar leche",new Date(2024, 1, 11), "En el kiosco de le esquina", "" )
let pan = createTodo("comprar pan")
initialList.addTodo(pan);
let agua = createTodo("comprar agua")
initialList.addTodo(agua);
agua.updateTodo("comprar agua","En el almacen","","")



const createdLists = [initialList, anotherList];


const dialog = document.querySelector("dialog");
const confirmBtn = dialog.querySelector(".confirmBtn");
const titleInput = dialog.querySelector("#title");
const dueDateInput = dialog.querySelector("#dueDate")
const descriptionInput = dialog.querySelector("#description");
const notesInput = dialog.querySelector("#notes");
const closeBtn = dialog.querySelector(".close");
const listDiv = document.querySelector('.listTable');


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
    let detailsButton = document.createElement("BUTTON");
    detailsButton.textContent = 'Details';
    detailsButton.addEventListener('click', displayTodoDetails.bind(null, list, todo));

    const row = tableList.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    cell1.innerHTML = todo.title;
    cell2.appendChild(detailsButton);
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
    todo.updateTodo(titleInput.value, date, descriptionInput.value, notesInput.value )
    e.preventDefault();
    dialog.close();
    displayList(list);
  }

  titleInput.value = todo.title || '';
  dueDateInput.value = todo.dueDate || '';
  descriptionInput.value = todo.description || '';
  notesInput.value = todo.notes || '';

  dialog.showModal();
}

function showListsTitles(lists){
  lists.forEach(function(list){
    console.log(list.title)
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




const screenEventHandler = (function (){

  const createListButton = document.createElement('button');
  createListButton.textContent = 'Create New List';
  document.body.appendChild(createListButton);
  showListsTitles(createdLists);
  displayList(initialList);
  return {}

})();



export { screenEventHandler };