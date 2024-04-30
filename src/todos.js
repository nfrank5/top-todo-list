
function createTodo(title, description, notes){
  let todoTitle = title;
  let todoDescription = description;
  let dueDate = '';
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
  


  const updateTodo = function(title, description, notes){
    todoTitle = title;
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
      updateTodo }

};




export { createTodo };