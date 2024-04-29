import { createList } from './lists';



const initialList = createList('Default list');

// Dummie data
let leche = initialList.addTodo("comprar leche");
leche.updateTodo("comprar leche","En el kiosco de le esquina", "")
initialList.addTodo("comprar pan");
let agua = initialList.addTodo("comprar agua");
agua.updateTodo("comprar agua","En el almacen","")



const createdLists = [initialList];

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
    detailsButton.addEventListener('click', displayTodoDetails.bind(null, list, todo, index));

    const row = tableList.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = todo.title;
    cell2.innerHTML = todo.description;
    cell3.appendChild(detailsButton);

  });
  document.body.appendChild(listDiv);

}

function displayTodoDetails(list, todo, index, ...rest){

  let dialog = document.querySelector("dialog");
  let confirmBtn = dialog.querySelector(".confirmBtn");
  let titleInput = dialog.querySelector("#title");
  let descriptionInput = dialog.querySelector("#description");
  let notesInput = dialog.querySelector("#notes");
  let closeBtn = dialog.querySelector(".close");
  let form = dialog.querySelector('form');
  

  function saveUpdateTodo(e){
    todo.updateTodo(titleInput.value, descriptionInput.value,notesInput.value )
    e.preventDefault();
    dialog.close();
    displayList(list);
  }

  dialog.addEventListener("close", (e) => {
    confirmBtn.removeEventListener("click", saveUpdateTodo, { once: true }) //Remove listener to delete previous events
  });
  
  confirmBtn.addEventListener("click", saveUpdateTodo, { once: true });

  titleInput.value = todo.title;
  descriptionInput.value = todo.description || '';
  notesInput.value = todo.notes || '';

  dialog.showModal();
}


function screenEventHandler(){

  const createListButton = document.createElement('button');
  createListButton.textContent = 'Create New List';
  document.body.appendChild(createListButton);

  createdLists.forEach(list => {
    displayList(list);
  });

  

  return {}
}



export { screenEventHandler };