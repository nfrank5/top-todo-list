import { format } from "date-fns";

function createTodo(title, description, notes, dueDate, priority){
  let todoTitle = title;
  let todoDescription = description;
  let todoDueDate = null;
  let todoPriority = 0;
  let todoNotes = notes;
  let checklist = '';
  let activity = [];

  const incresePriority = function(){ 
    if(todoPriority < 2){
      todoPriority++
    }
  };
  const decreasePriority = function(){ if(todoPriority > 0){
    todoPriority-- }
  };
  


  const updateTodo = function(title, dueDate, description, notes, priority ){
    todoTitle = title;
    todoDueDate = dueDate;
    todoDescription = description;
    todoNotes = notes;
    todoPriority = priority;
  };

  return { 
    todoTitle,
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
      updateTodo, incresePriority, decreasePriority 
  }
};




export { createTodo };