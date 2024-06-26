/**
 * template for saved contacts
 * @param {string} name 
 * @param {string} inicials 
 * @param {string} color 
 * @param {string} email 
 * @param {number} phoneNumber 
 * @returns 
 */
function contactTemplate(name, inicials, color, email, phoneNumber) {
    let contact = {
        'id': '',
        'name': name,
        'inicials': inicials,
        'inicialcolor': color,
        'email': email,
        'phone': +phoneNumber,
    }
    return contact;
}

/**
 * open template for add new contact
 */
function openAddContact() {
    let contactField = document.getElementById('add_contact');
    let addContactInputs = document.getElementById('add_contact_inputs');
    contactField.classList.remove('d-none');
    addContactInputs.innerHTML = renderAddContact();
    setTimeout(() => {
        addContactInputs.classList.add('translate-0');
    }, 110);
}

/**
 * close template for add new contact
 */
function closeAddContact() {
    let contactField = document.getElementById('add_contact');
    let addContactInputs = document.getElementById('add_contact_inputs');
    addContactInputs.classList.remove('translate-0');
    setTimeout(() => {
        contactField.classList.add('d-none');
    }, 110);
}

/**
 * 
 * @returns html code for add contact template
 */
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

/**
 * get inputs, create and save new contact
 */
async function createContact() {
    let name = document.getElementById('contact_name');
    let mail = document.getElementById('contact_email');
    let phone = document.getElementById('contact_phone');
    let inicials = getInitials(name.value);
    let inicialcolor = generateRandomColor();
    let contact = contactTemplate(name.value, inicials, inicialcolor, mail.value, phone.value);
    allContacts.push(contact);
    await saveContacts();
    await loadContacts();
    sortsContactsByLetter();
    showAddContactBanner();
}

/**
 * message if new contact created
 */
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

/**
 * clear inputs
 * @param {event} event 
 */
function clearAddContactInputs(event) {
    event.preventDefault();
    let form = document.getElementById('form_add_contact');
    form.reset();
}

/**
 * get a random color for the new contact
 * @returns color code
 */
function generateRandomColor() {
    const characters = '0123456789ABCDEF';
    let color = '#';
    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += characters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#FFFFFF' || color === '#000000');
    return color;
}