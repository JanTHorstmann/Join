let letters = [];
let lastActiveContactID;
async function initContacts() {
    await loadTasks();
    await loadContacts();
    generateSideBar();
    sortsContactsByLetter();
}

function sortsContactsByLetter() {
    let sortContacts = document.getElementById('sorted_contacts');
    sortContacts.innerHTML = '';
    letters = [];
    allContacts.sort((a, b) => a.name.localeCompare(b.name));
    allContacts.forEach(contact => {
        let firstLetter = contact.name.charAt(0).toUpperCase();
        let letterAvailable = letters.indexOf(firstLetter)
        if (letterAvailable == -1) {
            letters.push(firstLetter);
            sortContacts.innerHTML += renderLetter(firstLetter)
            renderContact(firstLetter, contact);
        } else {
            renderContact(firstLetter, contact);
        }
    });
}

function renderLetter(firstLetter) {
    return /*html*/`
        <div>
            <span class="fontSize-20-400 sort-inizial">${firstLetter}</span>            
            <div id="${firstLetter}" class="contacts"></div>            
        </div>`
}

function renderContact(firstLetter, contact) {
    let contactLetter = document.getElementById(`${firstLetter}`);
    contactLetter.innerHTML += /*html*/`
    <div id="selectable_contact${contact.id}" class="contact" onclick="openContact(${contact.id})">
        <span class="contact-inicials" style="background-color: ${contact.inicialcolor};">${contact.inicials}</span>
        <div class="contact-details">
            <span class="contact-name fontSize-20-400">${contact.name}</span>
            <a href="#" class="fontSize-16-400">${contact.email}</a>
        </div>
    </div>`
}

async function deleteContact(id) {
    contact = findContact(id)
    allTasks.forEach(task => {
        deleteContactFromTask(contact, task);
    })
    // allContacts.splice(id, 1);
    let openContact = document.getElementById('open_contact');
    let openContactResponsive = document.getElementById('show_contact_responsive');
    openContact.innerHTML = '';
    openContactResponsive.innerHTML = '';
    await saveContacts('delete', contact);
    await loadContacts();
    await loadTasks();
    // sortContacts();
    taskContactsGetNewID()
    sortsContactsByLetter();
    closeOpenContact();
}

async function deleteContactFromTask(id, task) {
    let deleteContactIndex = task.assigned_to.findIndex(assignedContactNumber => assignedContactNumber === contact.id);
    if (deleteContactIndex !== -1) {
        task.assigned_to.splice(deleteContactIndex, 1);
    }
    await saveTasks(task);
}

function taskContactsGetNewID() {
    allContacts.forEach(contact => {
        allTasks.forEach(task => {
            let contactID = task.assigned_to.findIndex(assignedContact => assignedContact.name === contact.name)
            if (contactID !== -1) {
                task.assigned_to[contactID]['id'] = contact.id
            }
        })
    });
}