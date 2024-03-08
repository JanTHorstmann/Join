async function initContacts() {
    await loadContacts();
    generateSideBar();
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