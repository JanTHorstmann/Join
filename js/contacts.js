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
        <span class="contact-inicials">${contact.inicials}</span>
        <div class="contact-details">
            <span class="contact-name fontSize-20-400">${contact.name}</span>
            <a href="#" class="fontSize-16-400">${contact.email}</a>
        </div>
    </div>`
}

async function deleteContact(id) {
    allTasks.forEach(task => {
        deleteContactFromTask(id, task);        
    })
    allContacts.splice(id, 1);
    let openContact = document.getElementById('open_contact');
    let openContactResponsive = document.getElementById('show_contact_responsive');
    openContact.innerHTML = '';
    openContactResponsive.innerHTML = '';
    await saveContacts();
    await saveTasks()
    await loadContacts();
    await loadTasks();
    sortsContactsByLetter();
    closeOpenContact();
}

function deleteContactFromTask(id, task) {
    let deleteContactIndex = task.assigned.findIndex(assignedContact => assignedContact.name === allContacts[id].name);
    if (deleteContactIndex !== -1) {
        task.assigned.splice(deleteContactIndex, 1);
    }
}