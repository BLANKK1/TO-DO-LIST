//Selectotr
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filtertodo)
//Functions
function addTodo(event){
    //Prevent form from sumbiting
    event.preventDefault();
    //Todo Div
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LIst
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to localstore
    saveLocalTodos(todoInput.value);
    //Checkmark
    const completeBtn=document.createElement("button");
    completeBtn.innerHTML='<i class="fa-solid fa-check"></i>';
    completeBtn.classList.add("complete-btn")
    todoDiv.appendChild(completeBtn);
    //Delete
    const delBtn=document.createElement("button");
    delBtn.innerHTML='<i class="fa-solid fa-trash"></i>';
    delBtn.classList.add("delete-btn")
    todoDiv.appendChild(delBtn);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear Input
    todoInput.value="";
}
function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === "delete-btn"){
        const todo= item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("Transitionend", function(){
            todo.remove();
        })
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filtertodo(event){
    const todos =todoList.childNodes;
    todos.forEach(function (todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
                break;

            }

    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);  
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv =document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checkmark
        const completeBtn=document.createElement("button");
        completeBtn.innerHTML='<i class="fa-solid fa-check"></i>';
        completeBtn.classList.add("complete-btn")
        todoDiv.appendChild(completeBtn);
        //Delete
        const delBtn=document.createElement("button");
        delBtn.innerHTML='<i class="fa-solid fa-trash"></i>';
        delBtn.classList.add("delete-btn")
        todoDiv.appendChild(delBtn);
        //Append to list
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex= todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}