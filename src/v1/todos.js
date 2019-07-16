const listElement  = document.querySelector('#app'        );
const inputElement = document.querySelector('#send input' );
const buttonElement= document.querySelector('#send button');

const todoList = [];

function doneTodo(todoText) {

    for(let pos = 0; pos < todoList.length; ++pos) {
        todo = todoList[pos].ref;

        if(todoText == todo.textContent) {
            let checkElement = todo.querySelector('input');
        
            if(checkElement.checked){
                todo.style.color = '#4CAF50';
                todo.style.textDecoration = 'line-through', todo;
            } else {
                todo.style.color = '#ffffff';
                todo.style.textDecoration = 'none';
            }
        }
    }
};


function renderTodo() {
    
    
    if(inputElement.value.trim() != "") {
        
        let todoElement = document.createElement('p');
        let textElement = document.createTextNode(inputElement.value);
        let checkElement= document.createElement('input');
    

        checkElement.setAttribute('type', 'checkbox');
        checkElement.setAttribute('class', 'check');
        checkElement.setAttribute('onclick', 'doneTodo(' + '"' + inputElement.value + '" )');
        checkElement.style.transform = 'scale(1.5)';
        checkElement.style.margin = '10px';
        todoElement.style.margin = '4px';
        
        todoElement.appendChild(checkElement);
        todoElement.appendChild(textElement);
        listElement.appendChild(todoElement);
        
        todoList.push({"text": inputElement.value, "ref": todoElement});
    }
    
    inputElement.value = '';
};

function deleteAll() {
    listElement.innerHTML = '<h1>Todo List </h1>';
    
    while(todoList.length)
        todoList.splice(0, 1);
}

function deleteDone() {
    let pos = 0;

    while(pos < todoList.length) {
        let todo = todoList[pos].ref;

        if(todo.querySelector('input').checked) {
            listElement.removeChild(todo);
            todoList.splice(pos, 1);
        } else {
            ++pos;
        }
    }
}

document.getElementById('task').addEventListener('keyup', (event) => {
    event.preventDefault();

    if(event.keyCode == 13)
        renderTodo();
});

document.getElementById('all' ).setAttribute('onclick', 'deleteAll()');
document.getElementById('done').setAttribute('onclick', 'deleteDone()');

buttonElement.onclick = renderTodo;