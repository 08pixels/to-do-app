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

    let newTodo = document.createElement('p')
    let newLabel= document.createElement('label');
    let newCheck= document.createElement('input');
    let newText = document.createTextNode(inputElement.value);
    
    let id = Date.now().toString();
    let text = inputElement.value;
    
    newCheck.setAttribute('type', 'checkbox');
    newTodo.setAttribute('name', id);

    
    newLabel.appendChild(newText);
    newTodo.appendChild(newCheck);
    newTodo.appendChild(newLabel);
    appElement.appendChild(newTodo);
    
    inputElement.value = '';
    
    newCheck.oninput = function() {
        if(doneElement.checked && newCheck.checked) {
            appElement.removeChild(newTodo);
            todoList.delete(id);
            saveToStorage();
        }
    }

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

    for(let [id, text] of todoList) {

        let newTodo = document.createElement('p');
        let newCheck = document.createElement('input');
        let newlabel = document.createElement('label');
        let newText = document.createTextNode(text);
        
        newCheck.setAttribute('type', 'checkbox');
        newTodo.setAttribute('name', id);
        
        newlabel.appendChild(newText);
        newTodo.appendChild(newCheck);
        newTodo.appendChild(newlabel);
        appElement.appendChild(newTodo);

        newCheck.oninput = function() {

            if(doneElement.checked && newCheck.checked) {
                appElement.removeChild(newTodo);
                todoList.delete(id);
                saveToStorage();
            }
        };
    }
}

onkeypress = enterEvent;
buttonElement.onclick = send;
doneElement.oninput = removeDoneAfter;

start();