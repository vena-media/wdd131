const input = document.querySelector(`#favchap`);
const button = document.querySelector(`button`);
const list = document.querySelector(`__________`)

const li = document.createElement(`li`);
const deleteButton = document.createElement(`button`);

li.textContent = input.value;

deleteButton.textContent = '❌'

li.append(deleteButton);

list.append(li);
<button aria-label="Close" id="close-button">❌</button>