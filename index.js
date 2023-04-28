import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://grocery-list-c7b33-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings); 
const database = getDatabase(app);
const groceryListDB = ref(database, 'grocery-list');

const inputField = document.querySelector('input');
const addButton = document.querySelector('button');
const groceryListUL = document.getElementById('shopping-list');

addButton.addEventListener('click', () => {
    let userInput = inputField.value;
    push(groceryListDB, userInput);

    groceryListList(userInput);
    
    clearInputValue();
});

onValue(groceryListDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val());
    console.log(itemsArray);
});

function groceryListList(itemValue) {
    groceryListUL.innerHTML += `<li>${itemValue}</li>`;
}

function clearInputValue() {
    inputField.value = '';
}