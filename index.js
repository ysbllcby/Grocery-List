import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
    
    clearInputValue();
});

onValue(groceryListDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearShoppingList();

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem  = itemsArray[i];

            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];
            groceryListList(currentItem);
        }
    } else {
        groceryListUL.innerHTML = "No items here yet."
    }

    
});

function groceryListList(item) {
    let itemId = item[0];
    let itemValue = item[1];

    let newLi = document.createElement('li');
    newLi.textContent = itemValue;

    newLi.addEventListener("click", function() {
        let exactLocationOfItemInDb = ref(database, `grocery-list/${itemId}`)
        console.log(exactLocationOfItemInDb);
        remove(exactLocationOfItemInDb);
    });

    groceryListUL.appendChild(newLi);
}

function clearInputValue() {
    inputField.value = '';
}

function clearShoppingList() {
    groceryListUL.innerHTML = '';
}