function openContact(id) {
    let openContact = document.getElementById('open_contact');
    let openContactResponsive = document.getElementById('open_contact_responsive');
    hoverActiveContact(id);
    let windowSize = window.innerWidth;
    console.log(windowSize);
    let contact = allContacts[id];
    let phoneNumber = splitPhoneNumber(contact.phone);
    if (windowSize > 730) {
        openContact.innerHTML = renderOpenContact(contact, phoneNumber);
    } else {
        closeOpenContact('open');
        openContact.innerHTML = renderOpenContact(contact, phoneNumber);
        openContactResponsive.innerHTML = renderOpenContact(contact, phoneNumber);
    }
}

function hoverActiveContact(id) {
    let hoverContact = document.getElementById(`selectable_contact${id}`)
    hoverContact.classList.add('active-contact');
    if (lastActiveContactID >= 0) {
        let lastActiveContact = document.getElementById(`selectable_contact${lastActiveContactID}`);
        lastActiveContact.classList.remove('active-contact');   
    }
    lastActiveContactID = id;
}

function splitPhoneNumber(phoneNumber) {
    let stringNumber = String(phoneNumber)
    let formattedNumber = '+' + stringNumber.substring(0, 2) + ' ' + // Landesvorwahl
                          stringNumber.substring(2, 6) + ' ' +        // Ortsvorwahl
                          stringNumber.substring(6, 9) + ' ' +        // Teil 1
                          stringNumber.substring(9, 11) + ' ' +       // Teil 2
                          stringNumber.substring(11);                // Teil 3
                          
    return formattedNumber;
}

function closeOpenContact(isOpen) {
    let showContactResponsive = document.getElementById('show_contact_responsive');
    if (isOpen == 'open') {
        showContactResponsive.classList.remove('d-none');
    } else {
        showContactResponsive.classList.add('d-none');
    }    
}

function renderOpenContact(contact, phoneNumber) {
    return /*html*/ `
        <div class="open-contact">
            <div class="open-contact-header ">
                <span class="contact-inicials-open-contact">${contact.inicials}</span>
                <div class="flex-column-gap8">
                    <span class="contact-name-open-contact">${contact.name}</span>
                    <div class="edit-delete-open-contact">
                        <div class="edit-delete-contact">
                            <img src="../assets/img/edit_subtask.svg" alt="">
                            <span>Edit</span>
                        </div>
                        <div class="edit-delete-contact" onclick="deleteContact(${contact.id})">
                            <img src="../assets/img/delete_subtask.svg" alt="">
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
            <span class="fontSize-20-400 section-description">Contact Information</span>
            <div class="contact-information">
                <h4>Email</h4>
                <a href="${contact.email}">${contact.email}</a>
            </div>
            <div class="contact-information">
                <h4>Phone</h4>                    
            <a href="tel:+${contact.phone}">${phoneNumber}</a>
            </div>
        </div>`
}