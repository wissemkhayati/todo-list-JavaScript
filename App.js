/////////////////////////////// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

/////////////////////////////// Event Listeners
document.addEventListener('DOMContentLoaded', loadLocalStorage);
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('change', filterTodo);

/////////////////////////////// Var & Const
var todos = [];

/////////////////////////////// Functions
function createTodo(value){
        //prevent form from submitting
        event.preventDefault();
        //create todo tag
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //create li tag
        const newTodo = document.createElement('li');
        newTodo.innerText = value;
        newTodo.classList.add("todo-item");
    
        todoDiv.appendChild(newTodo);
        //create completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        completedButton.addEventListener('click', completeTodo)
    
        todoDiv.appendChild(completedButton);
    
        //create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        trashButton.addEventListener('click', removeTodo)
    
        todoDiv.appendChild(trashButton);
    
        //append to list  
        todoList.appendChild(todoDiv);
}

function addTodo(event) {
    //create HTML tag
    createTodo(todoInput.value);
    //add todo to localStorage
    saveLocalStorage(todoInput.value);
    //clear todo input value
    todoInput.value = "";
}

function removeTodo (event){
    //animation
    event.target.parentElement.classList.add('fall');
    removeLocalStorage(event.target.parentElement);
    event.target.parentElement.addEventListener('transitionend', function(){
        event.target.parentElement.remove();
    });
}

function completeTodo (event){
    event.target.parentElement.classList.toggle('completed');
}

function filterTodo (e) {
    console.log(e.target.value);
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch(e.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if(!todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            break;
      }
    });
}

function checkLocalStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function saveLocalStorage(todo){
    checkLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadLocalStorage(todo){
    checkLocalStorage();
    todos.forEach(function(todo){
        createTodo(todo);
    });
}

function removeLocalStorage(todo){

    checkLocalStorage();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}