const STORAGE_TOKEN = '?token=PXLR74EGYE6KQF2FNA009UTFBN1CZP6D1UHJKUZW'
const AUTH_TOKEN = 'PXLR74EGYE6KQF2FNA009UTFBN1CZP6D1UHJKUZW'
// const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'
const STORAGE_URL_USERS = 'http://127.0.0.1:8000/users/'
const STORAGE_URL_TODOS = 'http://127.0.0.1:8000/todos/'
const STORAGE_URL_CONTACTS = 'http://127.0.0.1:8000/contact/'

let lokalUsers = [];
let allContacts = [];
let sortedContacts = [];
let allTasks = [];
let sortTasks = {
    'toDo': '',
    'progress': '',
    'feedback': '',
    'done': '',
}

//------------------------------------------------------------------------------//
//-----------------------------save User at Backend-----------------------------//
//------------------------------------------------------------------------------//

/**
 * save User at Backend
 * @async
 * @param {string} key 
 * @param {string} value 
 * @returns 
 */
async function setItem(key, value) {

    let url = '';
    if (key == 'users') {
        url = `${STORAGE_URL_USERS}${STORAGE_TOKEN}`
    } else if (key == 'allTasks') {
        url = `${STORAGE_URL_TODOS}${STORAGE_TOKEN}`
    } else if (key == 'contacts') {
        url = `${STORAGE_URL_CONTACTS}${STORAGE_TOKEN}`
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(`${key} saved:`, result);
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }

}


//------------------------------------------------------------------------------//
//-----------------------------get User from Backend----------------------------//
//------------------------------------------------------------------------------//

/**
 * get User from Backend
 * @async
 * @param {string} key 
 * @returns 
 */
async function getItem(key) {
    let url = '';
    if (key == 'users') {
        url = `${STORAGE_URL_USERS}${STORAGE_TOKEN}`
    } else if (key == 'allTasks') {
        url = `${STORAGE_URL_TODOS}${STORAGE_TOKEN}`
    } else if (key == 'contacts') {
        url = `${STORAGE_URL_CONTACTS}${STORAGE_TOKEN}`
    }
    return fetch(url)
        .then(res => res.json());


}

//------------------------------------------------------------------------------//
//-----------------------------get Username from URL----------------------------//
//------------------------------------------------------------------------------//

/**
 * get Username from URL
 * @returns 
 */
function getUserName() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        let userName = msg.split(', ');
        return userName[1];
    } else {
        return 'Guest'
    }
}


//------------------------------------------------------------------------------//
//----------------------------load User from Backend----------------------------//
//------------------------------------------------------------------------------//

/**
 * load User from Backend
 * @async
 * @returns 
 */
async function loadUsers() {
    try {
        // let users = JSON.parse(await getItem('users'));
        let users = await getItem('users');
        return users
    } catch (e) {
        console.error('Loading error:', e);
    }
}


//------------------------------------------------------------------------------//
//-------------------------load User from local Storage-------------------------//
//------------------------------------------------------------------------------//

/**
 * load User from local Storage
 * @returns 
 */
function loadUsersFromLocalStorage() {
    return lokalUsers = JSON.parse(localStorage.getItem('users')) || [];
}


//------------------------------------------------------------------------------//
//--------------------------save User at local Storage--------------------------//
//------------------------------------------------------------------------------//

/**
 * save User at local Storage
 * @async
 */
async function saveUserToLocalStorage() {
    let emailValue = document.getElementById('email_log_in')
    // let users = JSON.parse(await getItem('users'));
    let users = await getItem('users');
    let user = users.find(u => u.email == emailValue.value.toLowerCase())
    let userNumber = lokalUsers.find(l => l.email == emailValue.value.toLowerCase())
    if (userNumber != undefined) {
        lokalUsers.splice(0);
        lokalUsers.push(user);
    } else {
        lokalUsers.push(user);
    }
    localStorage.setItem('users', JSON.stringify(lokalUsers));
}

//------------------------------------------------------------------------------//
//-------------------------delete User at local Storage-------------------------//
//------------------------------------------------------------------------------//

/**
 * delete User at local Storage
 */
function clearLocalStorage() {
    localStorage.removeItem('users');
}


//------------------------------------------------------------------------------//
//----------------------------------delete User---------------------------------//
//------------------------------------------------------------------------------//

/**
 * delete User
 * @async
 * @param {string} email 
 */
async function deleteUser(email) {
    // let users = JSON.parse(await getItem('users'));
    let users = await getItem('users');
    users = users.filter(u => u.email !== email.toLowerCase());
    await setItem('users', JSON.stringify(users));
}


//------------------------------------------------------------------------------//
//---------------------------save Contacts at Backend---------------------------//
//------------------------------------------------------------------------------//

/**
 * save Contacts at Backend
 * @async
 */
async function saveContacts(condition, contact) {
    if (condition == 'edit') {
        let url = `${STORAGE_URL_CONTACTS}${contact.id}/${STORAGE_TOKEN}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(`Contact saved:`, result);
        } catch (error) {
            console.error(`Error saving Contact:`, error);
        }
    }

    if (condition == 'delete') {
        let url = `${STORAGE_URL_CONTACTS}${contact.id}/${STORAGE_TOKEN}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(`Contact deleted:`);
        } catch (error) {
            console.error(`Error deleting Contact:`, error);
        }
    }
}


//------------------------------------------------------------------------------//
//--------------------------load Contacts from Backend--------------------------//
//------------------------------------------------------------------------------//

/**
 * load Contacts from Backend
 * @async
 */
async function loadContacts() {
    // allContacts = JSON.parse(await getItem('contacts'));
    allContacts = await getItem('contacts');
}


//------------------------------------------------------------------------------//
//-----------------------------save Tasks at Backend----------------------------//
//------------------------------------------------------------------------------//

/**
 * save Tasks at Backend
 * @async
 */
async function saveTasks(task, method) {
    if (Array.isArray(task.assigned_to) && task.assigned_to.every(item => typeof item != 'number')) {
        let id = []
        task.assigned_to.forEach(contact => {
            id.push(contact.id);
        })
        task.assigned_to = id;
    }

    let url = `${STORAGE_URL_TODOS}${task.id}/${STORAGE_TOKEN}`;

    if (method == 'delete') {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(`Task deleted:`);
        } catch (error) {
            console.error(`Error deleting Task:`, error);
        }
    } else {

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(`Task saved:`, result);
        } catch (error) {
            console.error(`Error saving Task:`, error);
        }
    }


}


//------------------------------------------------------------------------------//
//-----------------------------load Tasks at Backend----------------------------//
//------------------------------------------------------------------------------//

/**
 * load Tasks at Backend
 * @async
 */
async function loadTasks() {
    // allTasks = JSON.parse(await getItem('allTasks'));
    allTasks = await getItem('allTasks');
    // for (let i = 0; i < allTasks.length; i++) {
    //     allTasks[i].id = i;
    // }
    // sortTasks = JSON.parse(await getItem('sortTasks'));
}

/**
 * Updates the task status on the server by sending a POST request with the task ID and target container ID.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {string} targetContainerId - The ID of the target container.
 */
async function updateTaskStatusOnServer(taskId, targetContainerId) {
    const payload = { key: `taskStatus_${taskId}`, value: targetContainerId, token: STORAGE_TOKEN };
    await fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) });
}

/**
 * Loads task status information from the server and updates the local sortTasks object.
 *
 */
async function loadTaskStatusFromServer() {
    const taskStatusKeys = Object.keys(sortTasks).map(category => `taskStatus_${sortTasks[category]}`);
    const taskStatusValues = await Promise.all(taskStatusKeys.map(key => getItem(key)));
    taskStatusValues.forEach((value, index) => {
        const category = Object.keys(sortTasks)[index];
        sortTasks[category] = value;
    });
}

/**
 * sorts contacts alphabetically
 */
function sortContacts() {
    allContacts.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
    });
    generateIDContacts(allContacts);
}

/**
 * generate an ID
 */
function generateIDContacts(array) {
    for (let i = 0; i < array.length; i++) {
        let arrayCategory = array[i]
        arrayCategory.id = i;
    }
}

/**
 * generate an unique ID
 */
// function generateUniqueID() {
//     let randomNumber = function () {
//         return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     };
//     let generatedNumber = (randomNumber() + randomNumber() + "-" + randomNumber() + "-" + randomNumber() + "-" + randomNumber() + "-" + randomNumber() + randomNumber() + randomNumber());
//     return generatedNumber;
// }


//id for User//
// function getID() {
//     let id = generateUniqueID();
//     if (allTasks.forEach(task => {id == task.id})) {
//         getID();
//     } else {
//         return id;
//     }
// }