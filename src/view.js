import { createList } from './lists';
import { format } from "date-fns";


const initialList = createList('Default list');
const anotherList = createList('Another list');

// Dummie data
let leche = initialList.addTodo("comprar leche");
leche.updateTodo("comprar leche",new Date(2014, 1, 11), "En el kiosco de le esquina", "" )
initialList.addTodo("comprar pan");
let agua = initialList.addTodo("comprar agua");
agua.updateTodo("comprar agua","En el almacen","","")



const createdLists = [initialList, anotherList];

function cleanTable(){
  document.querySelector('.listTable').innerHTML = '';

}


function displayList(list){
  const todos = list.getTodos()
  cleanTable();
  const tableList = document.createElement('table');
  const listheader = document.createElement('h2');
  const createTodoButton = document.createElement('button');

  const listDiv = document.querySelector('.listTable');

  listDiv.appendChild(listheader);
  listDiv.appendChild(tableList);
  listDiv.appendChild(createTodoButton);
  
  createTodoButton.textContent = 'Create New Task';
  listheader.innerHTML = `${list.title}`;

  todos.forEach((todo, index)=> {
    let detailsButton = document.createElement("BUTTON");
    detailsButton.textContent = 'Details';
    detailsButton.dataset.id = index;
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

  let dialog = document.querySelector("dialog");
  let confirmBtn = dialog.querySelector(".confirmBtn");
  let titleInput = dialog.querySelector("#title");
  let dueDateInput = dialog.querySelector("#dueDate")
  let descriptionInput = dialog.querySelector("#description");
  let notesInput = dialog.querySelector("#notes");
  //let closeBtn = dialog.querySelector(".close");
  //let form = dialog.querySelector('form');
  

  function saveUpdateTodo(e){
    todo.updateTodo(titleInput.value, new Date(dueDateInput.value), descriptionInput.value, notesInput.value )
    e.preventDefault();
    dialog.close();
    displayList(list);
  }

  dialog.addEventListener("close", (e) => {
    confirmBtn.removeEventListener("click", saveUpdateTodo) //Remove listener to delete previous events
  });
   
  
  confirmBtn.addEventListener("click", saveUpdateTodo);
  titleInput.value = todo.title;
  dueDateInput.value = todo.dueDate;
  descriptionInput.value = todo.description || null;
  notesInput.value = todo.notes || '';

  dialog.showModal();
}

function showListsTitles(lists){
  
  lists.forEach(function(list){
    console.log(list.title)
  });
  
}


function screenEventHandler(){

  const createListButton = document.createElement('button');
  createListButton.textContent = 'Create New List';
  document.body.appendChild(createListButton);


  showListsTitles(createdLists);

  displayList(initialList);


  return {}
}



export { screenEventHandler };