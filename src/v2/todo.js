const appElement   = document.querySelector('#app');
const inputElement = document.querySelector('#sent');
const buttonElement= document.querySelector('#send');
const doneElement  = document.querySelector('#done');

var todoList = new Map(JSON.parse(localStorage.getItem('todoList'))) || new Map();


function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...todoList]));
}


function removeDoneAfter() {
    var elements = appElement.querySelectorAll('input');

    for (element of elements) {

        if(element.checked) {
            var paragraphParent = element.parentElement;

            todoList.delete(paragraphParent.getAttribute('name'));
            appElement.removeChild(paragraphParent);
        }
    }

    saveToStorage();
}


function renderTodo() {

    var newTodo = document.createElement('p')
    var newLabel= document.createElement('label');
    var newCheck= document.createElement('input');
    var newText = document.createTextNode(inputElement.value);
    
    var id = Date.now().toString();
    var text = inputElement.value;
    
    newCheck.setAttribute('type', 'checkbox');
    newTodo.setAttribute('name', id);

    newCheck.oninput = function() {
        if(doneElement.checked && newCheck.checked) {
            appElement.removeChild(newTodo);
            todoList.delete(id);
        }

        saveToStorage();
    }
    
    newLabel.appendChild(newText);
    newTodo.appendChild(newCheck);
    newTodo.appendChild(newLabel);
    appElement.appendChild(newTodo);
    
    inputElement.value = '';

    todoList.set(id, text);
    saveToStorage();
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

    for(var [id, text] of todoList) {
        var newTodo = document.createElement('p');
        var inputElement = document.createElement('input');
        var labelElement = document.createElement('label');
        var textElement = document.createTextNode(text);
        
        inputElement.setAttribute('type', 'checkbox');
        newTodo.setAttribute('name', id);

        inputElement.oninput = function() {
            if(doneElement.checked && inputElement.checked) {
                appElement.removeChild(newTodo);
                todoList.delete(id);
            }
        };

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