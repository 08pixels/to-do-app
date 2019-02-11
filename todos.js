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
                todo.style.color = '#2eb82e';
                todo.style.textDecoration = 'line-through', todo;
            } else {
                todo.style.color = '#cc0000';
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

document.getElementById('task').addEventListener('keyup', (event) => {
    event.preventDefault();

    if(event.keyCode == 13)
        renderTodo();
});

buttonElement.onclick = renderTodo;