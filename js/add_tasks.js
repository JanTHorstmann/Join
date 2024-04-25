/**
 * init add task site
 */
async function initAddTask() {
    await loadContacts();
    await loadTasks();
    generateSideBar();
    renderAddTaskContent();
    renderAssignedTo();
}

let subTasks = [];
let selectedPrio;
let choosenContacts = [];

/**
 * render assigned to contacts
 */
function renderAssignedTo() {
    let contactsField = document.getElementById('select_contacts_container');
    if (allContacts.length <= 0) {
        contactsField.innerHTML += `
            <div class="contact-assign-to">
                <span class="contact-name">No Contacts Found</span>
            </div>`
    } else {
        for (let i = 0; i < allContacts.length; i++) {
            const contact = allContacts[i];
            contactsField.innerHTML += `
                <div id="selectable_contact${contact.id}" class="contact-assign-to" onclick="checkBtnAssignTo(${contact.id})">
                        <span class="contact-inicials" style="background-color: ${contact.inicialcolor};">${contact.inicials}</span>
                        <span class="contact-name">${contact.name}</span>
                    <img id="contact_check_btn${contact.id}" src="../assets/img/checkbutton.svg">
                </div>`;
        }
    }
}

/**
 * open drop down for contacts
 */
function openDropDown() {
    let dropDownMenu = document.getElementById('select_contacts_container');
    let dropDownArrow = document.getElementById('dropdown_arrwo_contacts');
    let closeAssigned = document.getElementById('close_assigned');
    dropDownMenu.classList.toggle('show-selectable-contacts');
    dropDownArrow.classList.toggle('rotate-arrow-180');
    closeAssigned.classList.toggle('d-none');
}

/**
 * get prio for task
 * @param {string} prio 
 */
function selctPrio(prio) {
    selectedPrio = prio;
    let urgendBtn = document.getElementById(`prio_btn_urgent`);
    let mediumBtn = document.getElementById(`prio_btn_medium`);
    let lowBtn = document.getElementById(`prio_btn_low`);
    resetPrioBtn(urgendBtn, mediumBtn, lowBtn);
    if (prio == 'urgent') {
        selctUrgentBtn(urgendBtn, mediumBtn, lowBtn);
    }
    if (prio == 'medium') {
        selctMediumBtn(urgendBtn, mediumBtn, lowBtn);
    }
    if (prio == 'low') {
        selctLowBtn(urgendBtn, mediumBtn, lowBtn);
    }
}

/**
 * reset choosen prio btn
 * @param {Element} urgendBtn 
 * @param {Element} mediumBtn 
 * @param {Element} lowBtn 
 */
function resetPrioBtn(urgendBtn, mediumBtn, lowBtn) {
    urgendBtn.classList.remove('hover-effect', 'prio-btn-selected-font', 'urgent-btn-selected-bg');
    mediumBtn.classList.remove('hover-effect', 'prio-btn-selected-font', 'medium-btn-selected-bg');
    lowBtn.classList.remove('hover-effect', 'prio-btn-selected-font', 'low-btn-selected-bg');
    document.getElementById(`urgent_btn`).src = `../assets/img/urgent_icon.svg`
    document.getElementById(`medium_btn`).src = `../assets/img/medium_icon.svg`
    document.getElementById(`low_btn`).src = `../assets/img/low_icon.svg`
}

/**
 * select urgent btn
 * @param {Element} urgendBtn 
 * @param {Element} mediumBtn 
 * @param {Element} lowBtn 
 */
function selctUrgentBtn(urgendBtn, mediumBtn, lowBtn) {
    urgendBtn.classList.add('urgent-btn-selected-bg', 'prio-btn-selected-font');
    mediumBtn.classList.add('hover-effect', 'fontSize-20-400');
    lowBtn.classList.add('hover-effect', 'fontSize-20-400');
    document.getElementById(`urgent_btn`).src = `../assets/img/urgent_selected.svg`
}

/**
 * select meduim btn
 * @param {Element} urgendBtn 
 * @param {Element} mediumBtn 
 * @param {Element} lowBtn 
 */
function selctMediumBtn(urgendBtn, mediumBtn, lowBtn) {
    mediumBtn.classList.add('medium-btn-selected-bg', 'prio-btn-selected-font');
    urgendBtn.classList.add('hover-effect', 'fontSize-20-400');
    lowBtn.classList.add('hover-effect', 'fontSize-20-400');
    document.getElementById(`medium_btn`).src = `../assets/img/medium_selected.svg`
}

/**
 * select low btn
 * @param {Element} urgendBtn 
 * @param {Element} mediumBtn 
 * @param {Element} lowBtn 
 */
function selctLowBtn(urgendBtn, mediumBtn, lowBtn) {
    lowBtn.classList.add('low-btn-selected-bg', 'prio-btn-selected-font');
    urgendBtn.classList.add('hover-effect', 'fontSize-20-400');
    mediumBtn.classList.add('hover-effect', 'fontSize-20-400');
    document.getElementById(`low_btn`).src = `../assets/img/low_selected.svg`
}

/**
 * show edit icon
 * @param {string} visibility 
 * @param {number} idCounter 
 */
function showHideEditIcons(visibility, idCounter) {
    let editIcons = document.getElementById(`edit_icons${idCounter}`);
    if (visibility == 'show') {
        editIcons.classList.remove('d-none');
    } else {
        editIcons.classList.add('d-none');
    }
}

/**
 * show confirmation icon
 * @param {string} hideIcon 
 * @param {string} showIcon 
 */
function showConfirmationIcons(hideIcon, showIcon) {
    let hide = document.getElementById(`${hideIcon}_icon`);
    let show = document.getElementById(`${showIcon}_icon`);
    hide.classList.add('d-none');
    show.classList.remove('d-none');
}

/**
 * clear input
 */
function clearSubtaskInput() {
    let subTaskt = document.getElementById('subtask_input');
    subTaskt.value = '';
    showConfirmationIcons('add_clear', 'edit');
}

/**
 * add subtask
 */
function addSubTask() {
    showConfirmationIcons('add_clear', 'edit')
    let subTaskt = document.getElementById('subtask_input');
    subTasks.push({
        'text': subTaskt.value,
        'done': false,
    });
    subTaskt.value = '';
    renderSubtask();
}

/**
 * save subtask
 * @param {Number} i 
 */
function saveSubtast(i) {
    let subTaskInput = document.getElementById(`edit_subtaskt_input${i}`);
    subTasks[i] = 
        {
            'text': subTaskInput.value,
            'done': false,
        }
    ;
    renderSubtask();
}

/**
 * render saved subtasks
 */
function renderSubtask() {
    let subTasktContainer = document.getElementById('subtask_container');
    subTasktContainer.innerHTML = '';

    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i]['text'];
        subTasktContainer.innerHTML += /*html*/`
        <div id="list_container${i}">
            <div class="list-container" onmouseover="showHideEditIcons('show', ${i})" onmouseleave="showHideEditIcons('hide', ${i})" ondblclick="editSubtask(${i})">
                <li></li>
                <div class="subtask-list-element">
                    <span>${subTask}</span>
                    <div id="edit_icons${i}" class="img-container d-none">
                        <img src="../assets/img/edit_subtask.svg" onclick="editSubtask(${i})"> |
                        <img src="../assets/img/delete_subtask.svg" onclick="deleteSubtask(${i})">
                    </div>
                </div>
            </div>
        </div>`
    }
}

/**
 * get html to edit subtask
 * @param {Number} i 
 */
function editSubtask(i) {
    let editSubtask = document.getElementById(`list_container${i}`)
    editSubtask.innerHTML = /*html*/` 
        <div class="edit-subtask">
            <div class="subtask-list-element subtask-list-element-edit">
                <input id="edit_subtaskt_input${i}" type="text" value="${subTasks[i]['text']}">
                <div id="edit_icons${i}" class="img-container-edit">
                    <img src="../assets/img/delete_subtask.svg" onclick="deleteSubtask(${i})"> |
                    <img src="../assets/img/check_icon.svg" onclick="saveSubtast(${i})">
                </div>
            </div>
        </div>`
}

/**
 * delete subtask
 * @param {Number} i 
 */
function deleteSubtask(i) {
    subTasks.splice(i, 1);
    renderSubtask();
}

/**
 * visual icon for choosen contact
 * @param {Number} i 
 */
function checkBtnAssignTo(i) {
    let assignToCheckBtn = document.getElementById(`contact_check_btn${i}`);
    let selectedContact = document.getElementById(`selectable_contact${i}`);
    if (assignToCheckBtn.src.includes('checkedbutton')) {
        assignToCheckBtn.src = '../assets/img/checkbutton.svg';
        removeChoosenContacts(i)
    } else {
        assignToCheckBtn.src = '../assets/img/checkedbutton.svg';
        choosenContacts.push(allContacts[i]);
        selectedContact.classList.add('contact-selected');
        selectedContacts(choosenContacts);
    }
}

/**
 * remove choosen contact
 * @param {Number} i 
 */
function removeChoosenContacts(i) {
    let assignToCheckBtn = document.getElementById(`contact_check_btn${i}`);
    let selectedContact = document.getElementById(`selectable_contact${i}`);
    let index = choosenContacts.indexOf(allContacts[i]);
    assignToCheckBtn.src = '../assets/img/checkbutton.svg';
    selectedContact.classList.remove('contact-selected');
    choosenContacts.splice(index, 1);
    selectedContacts(choosenContacts);
}

function selectedContacts(assignedContacts) {
    let selectedContactContainer = document.getElementById('choosen_contact_container');
    let overFlowContainer = document.getElementById('overflow_container');
    let containerWidth = selectedContactContainer.offsetWidth;

    selectedContactContainer.innerHTML = '';
    overFlowContainer.innerHTML = '';

    renderSelectedContacts(selectedContactContainer, overFlowContainer, containerWidth, assignedContacts);
}

function calculateContainerWidth() {
    let selectedContactContainer = document.getElementById('choosen_contact_container');
    let childElement = selectedContactContainer.children;
    if (childElement.length > 0) {
        let childTotalLength = 0;
        for (let i = 0; i < childElement.length; i++) {
            const child = childElement[i];
            childTotalLength += child.offsetWidth;
        }
        return childTotalLength;
    } else {
        return 0;
    }
}

function setMinDate() {
    let today = new Date();
    let minDate = today.toISOString().split('T')[0];
    document.getElementById('due_date_input').setAttribute('min', minDate);
}