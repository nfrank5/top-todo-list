import { format } from "date-fns";

function createTodo(title, description, notes, dueDate){
  let todoTitle = title;
  let todoDescription = description;
  let todoDueDate = null;
  let priority = 0;
  let todoNotes = notes;
  let checklist = '';
  let activity = [];

  const incresePriority = function(){ 
    if(priority < 2){
      priority++
    }
  };
  const decreasePriority = function(){ if(priority > 0){
    priority-- }
  };
  


  const updateTodo = function(title, dueDate, description, notes ){
    todoTitle = title;
    todoDueDate = dueDate;
    todoDescription = description;
    todoNotes = notes;
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
      updateTodo 
  }
};




export { createTodo };