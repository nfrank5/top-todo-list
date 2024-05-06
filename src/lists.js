import { createTodo } from './todos';

function createList(title, todos = []){
  let listTitle = title
  let listTodos = todos;

  const addTodo = function(todo = createTodo()){
    listTodos.push(todo);
    return todo
  }

  const getTodos = function(){ return listTodos  }


  return {       
    set title(text){        
    listTitle = text;
    },
    get title(){
      return listTitle
    }, 
    set todos(t){        
      listTodos = t;
      },
    get todos(){
      return listTodos
    }, 

    addTodo, getTodos }

};


export { createList };

