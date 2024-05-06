import { format } from "date-fns";

function createTodo(title, description, notes, dueDate, priority){
  let todoTitle = title;
  let todoDescription = description;
  let todoDueDate = dueDate;
  let todoPriority = priority;
  let todoNotes = notes;


  const updateTodo = function(title, dueDate, description, notes, priority ){
    todoTitle = title;
    todoDueDate = dueDate;
    todoDescription = description;
    todoNotes = notes;
    todoPriority = priority;
  };

  return { 
      set dueDate(d){        
        todoDueDate = d;
      },
      set title(text){        
        todoTitle = text;
      },
      get title(){
        return todoTitle
      }, 
      get description(){
        return todoDescription;
      }, 
      get notes(){
        return todoNotes;
      }, 
      get dueDate(){
        if(todoDueDate instanceof Date){
          return format(todoDueDate, 'yyyy-MM-dd');
        } else {
          ""; 
        }
      },
      get priority(){
        return todoPriority;
      }, 
      updateTodo
  }
};




export { createTodo };