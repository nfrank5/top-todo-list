import { createTodo } from './todos';

function createList(title){
  let listTitle = title
  let position = 0;
  let todos = [];

  const incresePosition = function(){ position++ };
  const decreasePosition = function(){ position-- };
  const getPosition = function(){ return position };

  const addTodo = function(todo = createTodo()){
    todos.push(todo);
    return todo
  }

  const getTodos = function(){ return todos  }


  return {       
    set title(text){        
    listTitle = text;
    },
    get title(){
      return listTitle
    }, 
    addTodo, getTodos }

};


export { createList };

