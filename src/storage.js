import { createList } from './lists';
import { createTodo } from './todos';
import { showListsTitles, displayList } from './view.js';

function saveToStorage(createdLists){
  localStorage.removeItem("data");
  localStorage.setItem("data", JSON.stringify(createdLists));
}

function setInitialLists(){
  let data = JSON.parse(localStorage.getItem("data"))
  const createdLists = []
  data.forEach((l) => {
    const newList = createList(l.title)
    l.todos.forEach((t) => {
      let date;
      //console.log(date, typeof t.dueDate != undefined )
      if(typeof t.dueDate != undefined ){
        //console.log(new Date(t.dueDate))
        date = new Date(t.dueDate);
      }
      newList.addTodo(createTodo(t.title, t.description, t.notes, date, t.priority)) 
    })
    createdLists.push(newList);
  })

  return createdLists
}

export { saveToStorage, setInitialLists };