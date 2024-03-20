function contactTemplate(name, inicials, email, phoneNumber) {
    let contact = {
        'id': '',
        'name': name,
        'inicials': inicials,
        'email': email,
        'phone': +phoneNumber,
    }
    return contact;
}

function openAddContact() {
    let contactField = document.getElementById('add_contact');
    let addContactInputs = document.getElementById('add_contact_inputs');
    contactField.classList.remove('d-none');
    addContactInputs.innerHTML = renderAddContact();
    setTimeout(() => {
        addContactInputs.classList.add('translate-0');
    }, 110);
}

function closeAddContact() {
    let contactField = document.getElementById('add_contact');
    let addContactInputs = document.getElementById('add_contact_inputs');
    addContactInputs.classList.remove('translate-0');
    setTimeout(() => {
        contactField.classList.add('d-none');
    }, 110);
}

function renderAddContact() {
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
            <form id="form_add_contact" onsubmit="createContact(); return false">
                <div class="add-contact-inputs">
                    <img src="../assets/img/add_contact_icon.svg" alt="">
                    <div class="inputfield-add-contact">
                        <input required id="contact_name" class="inputs-add-contact fontSize-20-400" type="text" placeholder="Name">
                        <input required id="contact_email" class="inputs-add-contact fontSize-20-400" type="email" placeholder="Email">
                        <input required id="contact_phone" class="inputs-add-contact fontSize-20-400" type="tel" placeholder="Phone" pattern="[0-9]{8,}" title="Bitte gib mindestens 8 Ziffern ein.">
                    </div>
                </div>
                    <div class="clear-create-btn">
                        <button class="clear-btn fontSize-20-400" onclick="clearAddContactInputs(event)">Cancel x</button>
                        <button type="submit" class="create-btn fontSize-21-700">Create contact <img src="../assets/img/check_icon_FFFFFF.svg" alt=""></button>
                    </div>
            </form>
        </div>`
}

async function createContact() {
    let name = document.getElementById('contact_name');
    let mail = document.getElementById('contact_email');
    let phone = document.getElementById('contact_phone');
    let inicials = getInitials(name.value);
    let contact = contactTemplate(name.value, inicials, mail.value, phone.value);
    allContacts.push(contact);
    saveContacts();
    // console.log(contact);
    await loadContacts();
    sortsContactsByLetter();
    showAddContactBanner();
}

function showAddContactBanner() {
    let contactBanner = document.getElementById('contact_created_banner');
    contactBanner.classList.remove('d-none');
    setTimeout(() => {
        contactBanner.classList.add('bottom-50');
    }, 10);
    setTimeout(() => {
        contactBanner.classList.remove('bottom-50');
        contactBanner.classList.add('d-none');
        closeAddContact();
    }, 800);
}

function clearAddContactInputs(event) {
    event.preventDefault();
    let form = document.getElementById('form_add_contact');
    form.reset();
}