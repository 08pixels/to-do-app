var appElement = document.querySelector('#app');
var inputElement = document.querySelector('#sent');
var buttonElement= document.querySelector('#send');

var doneElement = document.querySelector('#done');

var todoList = new Map(JSON.parse(localStorage.getItem('todoList'))) || new Map();

function removeDoneAfter() {
    var elements = appElement.querySelectorAll('input');

    for (element of elements) {

        if(element.checked) {
            appElement.removeChild(element.parentElement);
            todoList.delete(element.parentElement);
        }
    }
    
    saveToStorage();
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
    
    todoList.set(newTodo, inputElement.value);
    inputElement.value = '';
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...todoList]));
}

function enterEvent() {
    if(event.keyCode === 13)
        buttonElement.onclick();
}

function send() {
    if(inputElement.value == "")
        return;
    
    renderTodo();
}

function start() {

    for(var [ref, text] of todoList) {
        var newTodo = document.createElement('p');
        var inputElement = document.createElement('input');
        var labelElement = document.createElement('label');
        var textElement = document.createTextNode(text);
        
        inputElement.setAttribute('type', 'checkbox');

        inputElement.oninput = function() {
            if(doneElement.checked && inputElement.checked) {
                todoList.delete(newTodo);
                appElement.removeChild(newTodo);
            }
        }

        labelElement.appendChild(textElement);
        newTodo.appendChild(inputElement);
        newTodo.appendChild(labelElement);
        appElement.appendChild(newTodo);
    }
}

onkeypress = enterEvent;
buttonElement.onclick = send;
doneElement.oninput = removeDoneAfter;

start();