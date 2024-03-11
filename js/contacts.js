let letters = [];

async function initContacts() {
    await loadContacts();
    generateSideBar();
    sortsContactsByLetter();
}

function contactTemplate() {
    let contact = {
        'id': '',
        'name': name,
        'inicials': inicials,
        'email': email,
        'phone': +phoneNumber,
    }
}

function sortsContactsByLetter() {
    let sortContacts = document.getElementById('sorted_contacts');
    sortContacts.innerHTML = '';
    letters = [];
    allContacts.forEach(contact => {
        let firstLetter = contact.name.charAt(0).toUpperCase();
        console.log(firstLetter);
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
    <div id="selectable_contact" class="contact-assign-to" onclick="openContact(${contact.id})">
        <span class="contact-inicials">${contact.inicials}</span>
        <div class="contact-details">
            <span class="contact-name fontSize-20-400">${contact.name}</span>
            <a href="#" class="fontSize-16-400">${contact.emsil}</a>
        </div>
    </div>`
}