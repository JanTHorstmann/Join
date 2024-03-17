function editContact(id) {
    let contactField = document.getElementById('add_contact');
    let addContactInputs = document.getElementById('add_contact_inputs');
    let contact = allContacts[id];
    contactField.classList.remove('d-none');
    addContactInputs.innerHTML = renderEditContact(contact);
    setTimeout(() => {
        addContactInputs.classList.add('translate-0');
    }, 110);
}

function renderEditContact(contact) {
    return /*html*/ `
        <div class="add-contact-header">
            <div class="close-add-contact-responsive">
                <img class="close-add-contact" src="../assets/img/cross_white.svg" onclick="closeAddContact()">
            </div>
            <img src="../assets/img/join_logo_template.svg" alt="">
            <h1>Add contact</h1>
            <span class="fontSize-27-400">Tasks are better with a team!</span>
            <div class="underline-add-contact"></div>
        </div>
        <div class="add-contact-content-create">
            <div class="close-add-contact">
                <img src="../assets/img/cross_icon.svg" onclick="closeAddContact()">
            </div>
            <form id="form_add_contact" onsubmit="saveEditContact(${contact.id}); return false">
                <div class="add-contact-inputs">
                <span class="contact-inicials-open-contact">${contact.inicials}</span>
                    <div class="inputfield-add-contact">
                        <input value="${contact.name}" id="contact_name" class="inputs-add-contact fontSize-20-400" type="text" placeholder="Name">
                        <input value="${contact.email}" id="contact_email" class="inputs-add-contact fontSize-20-400" type="email" placeholder="Email">
                        <input value="${contact.phone}" id="contact_phone" class="inputs-add-contact fontSize-20-400" type="tel" placeholder="Phone" pattern="[0-9]{12,}" title="Bitte gib mindestens 8 Ziffern ein.">
                    </div>
                </div>
                    <div class="clear-create-btn">
                        <button class="clear-btn fontSize-20-400" onclick="deleteContact()">Delete</button>
                        <button type="submit" class="create-btn fontSize-21-700">Save <img src="../assets/img/check_icon_FFFFFF.svg" alt=""></button>
                    </div>
            </form>
        </div>`
}

async function saveEditContact(id) {
    let name = document.getElementById('contact_name');
    let mail = document.getElementById('contact_email');
    let phone = document.getElementById('contact_phone');
    let inicials = getInitials(name.value);
    let contact = contactTemplate(name.value, inicials, mail.value, phone.value);
    allContacts[id]= contact;
    await saveContacts();
    // console.log(contact);
    closeAddContact();
    await loadContacts();
    sortsContactsByLetter();
    openContact(id);
}