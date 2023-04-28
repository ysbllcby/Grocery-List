import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://grocery-list-c7b33-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings); 
const database = getDatabase(app);
const groceryListDB = ref(database, 'grocery-list');

const inputField = document.querySelector('input');
const addButton = document.querySelector('button');

addButton.addEventListener('click', () => {
    let userInput = inputField.value;

    push(groceryListDB, userInput);
    console.log(userInput);
});