var appElement = document.querySelector('#app');
var inputElement = document.querySelector('#sent');
var buttonElement= document.querySelector('#send');

var doneElement = document.querySelector('#done');

var todoList = new Map();

function removeDoneAfter() {
    var elements = appElement.querySelectorAll('input');

    for (element of elements) {

        if(element.checked) {
            appElement.removeChild(element.parentElement);
            todoList.delete(element.parentElement);
        }
    }
}

function renderTodo() {
    var newTodo = document.createElement('p')
    var newLabel= document.createElement('label');
    var newCheck= document.createElement('input');
    var newText = document.createTextNode(inputElement.value);
    
    newCheck.setAttribute('type', 'checkbox');

    newCheck.oninput = function() {
        if(doneElement.checked && newCheck.checked) {
            appElement.removeChild(newTodo);
            todoList.delete(newTodo);
        }
    }
    
    newLabel.appendChild(newText);
    newTodo.appendChild(newCheck);
    newTodo.appendChild(newLabel);
    appElement.appendChild(newTodo);
    
    todoList.set(newTodo, newText);
    inputElement.value = '';
}

buttonElement.onclick = function() {
    if(inputElement.value === "")
        return;

    renderTodo();
}

onkeypress = function() {
    if(event.keyCode === 13)
        buttonElement.onclick();
}

doneElement.oninput = removeDoneAfter;