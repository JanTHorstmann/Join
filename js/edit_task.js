function editOpenTask(id) {
    let openTaskField = document.getElementById('open_task');
    openTaskField.innerHTML = /*html*/` 
    <div class="close-edit-img">
        <img id="close_add_task_img" class="" src="../assets/img/cross_icon.svg" onclick="closeAddTask()">
    </div>`;
    openTaskField.innerHTML += renderEditOpenTask(id);
    renderTitleInput();
    renderDescriptionInput();
    renderAssignedToInput();
    renderDueDateInput();
    renderPrioBtnInput();
    changeOnClickEventFromPrioBtn(id);
    renderSubTaskInput();
    changeOnClickEventFromSubtask(id);
    renderEditTaskSubtask(id);
    renderAssignedToAtEditTask(id);
    isContactSelected(id)
    editGetValue(id);
}

function changeOnClickEventFromPrioBtn(i) {
    let urgentBtn = document.getElementById('prio_btn_urgent');
    let mediumBtn = document.getElementById('prio_btn_medium');
    let lowBtn = document.getElementById('prio_btn_low');
    urgentBtn.setAttribute("onClick", `changePrio('urgent', ${i});`);
    mediumBtn.setAttribute("onClick", `changePrio('medium', ${i});`);
    lowBtn.setAttribute("onClick", `changePrio('low', ${i});`);
}

function changePrio(prio, id) {
    allTasks[id]['priority'] = prio;
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
    };
}

function changeOnClickEventFromSubtask(i) {
    let addSubtask = document.getElementById('add_subtask_icon');
    addSubtask.setAttribute("onClick", `addSubTaskEditTask(${i});`);
}

function addSubTaskEditTask(id) {
    showConfirmationIcons('add_clear', 'edit')
    let subTaskt = document.getElementById('subtask_input');
    allTasks[id]['subtasks'].push({
        'text': subTaskt.value,
        'done': false,
    });
    subTaskt.value = '';
    renderEditTaskSubtask(id);
}

function editGetValue(i) {
    let task = allTasks[i];
    let titleInput = document.getElementById('title_input');
    let descriptionInput = document.getElementById('description_input');
    let dueDateInput = document.getElementById('due_date_input');
    titleInput.value = task.title
    descriptionInput.value = task.description
    dueDateInput.value = task.dueDate
    selctPrio(task.priority);
    selectedContactsAtEditTask(i);
}

async function saveEditTask(id) {
    let task = allTasks[id];
    let titleInput = document.getElementById('title_input');
    let descriptionInput = document.getElementById('description_input');
    let dueDateInput = document.getElementById('due_date_input');
    task.title = titleInput.value;
    task.description = descriptionInput.value;
    task.dueDate = dueDateInput.value;
    await saveTasks();
    openTask(id);
}

async function deleteTask(id) {
    allTasks.splice(id, 1);
    await saveTasks();
    getTaskID();
    closeTask();
    sortTasksToSections();
}

function renderEditTaskSubtask(id) {
    let subTasktContainer = document.getElementById('subtask_container');
    subTasktContainer.innerHTML = '';
    let subTasks = allTasks[id]['subtasks']
    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i];
        subTasktContainer.innerHTML += /*html*/`
        <div id="list_container${i}">
            <div class="list-container" onmouseover="showHideEditIcons('show', ${i})" onmouseleave="showHideEditIcons('hide', ${i})" ondblclick="editSubtask(${i})">
                <li></li>
                <div class="subtask-list-element">
                    <span>${subTask.text}</span>
                    <div id="edit_icons${i}" class="img-container d-none">
                        <img src="../assets/img/edit_subtask.svg" onclick="editSubtaskFromEditTask(${id}, ${i})"> |
                        <img src="../assets/img/delete_subtask.svg" onclick="deleteSubtaskFromEditTask(${id}, ${i})">
                    </div>
                </div>
            </div>
        </div>`
    }
}

function editSubtaskFromEditTask(id, i) {
    let subtaskValue = allTasks[id]['subtasks'][i]['text'];
    let editSubtask = document.getElementById(`list_container${i}`)
    editSubtask.innerHTML = /*html*/` 
        <div class="edit-subtask">
            <div class="subtask-list-element subtask-list-element-edit">
                <input id="edit_subtaskt_input${i}" type="text" value="${subtaskValue}">
                <div id="edit_icons${i}" class="img-container-edit">
                    <img src="../assets/img/delete_subtask.svg" onclick="deleteSubtaskFromEditTask(${id}, ${i})"> |
                    <img src="../assets/img/check_icon.svg" onclick="saveSubtastFromEditTask(${id}, ${i})">
                </div>
            </div>
        </div>`
}

function saveSubtastFromEditTask(id, i) {
    let subTaskInput = document.getElementById(`edit_subtaskt_input${i}`);
    allTasks[id]['subtasks'][i]['text'] = subTaskInput.value
    renderEditTaskSubtask(id);
}

function deleteSubtaskFromEditTask(id, i) {
    allTasks[id]['subtasks'].splice(i, 1);
    renderEditTaskSubtask(id);
}


function renderAssignedToAtEditTask(taskID) {
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
                <div id="selectable_contact${contact.id}" class="contact-assign-to" onclick="checkBtnAssignToEditTask(${taskID},${contact.id})">
                        <span class="contact-inicials" style="background-color: ${contact.inicialcolor};">${contact.inicials}</span>
                        <span class="contact-name">${contact.name}</span>
                    <img id="contact_check_btn${contact.id}" src="../assets/img/checkbutton.svg">
                </div>`;
        }
    }
}

function checkBtnAssignToEditTask(taskID, contactID) {
    let assignToCheckBtn = document.getElementById(`contact_check_btn${contactID}`);
    let selectedContact = document.getElementById(`selectable_contact${contactID}`);
    let assignedContacts = allTasks[taskID]['assigned'];
    if (assignToCheckBtn.src.includes('checkedbutton')) {
        assignToCheckBtn.src = '../assets/img/checkbutton.svg';
        removeAssignedContacts(taskID, contactID)
    } else {
        assignToCheckBtn.src = '../assets/img/checkedbutton.svg';
        assignedContacts.push(allContacts[contactID]);
        selectedContact.classList.add('contact-selected');
        selectedContactsAtEditTask(taskID);
    }
}

function isContactSelected(id) {
    let assignedContacts = allTasks[id]['assigned'];
    for (let i = 0; i < assignedContacts.length; i++) {
        const assignedContact = assignedContacts[i];
        document.getElementById(`contact_check_btn${assignedContact.id}`).src = '../assets/img/checkedbutton.svg';
        document.getElementById(`selectable_contact${assignedContact.id}`).classList.add('contact-selected');
    }
}

function selectedContactsAtEditTask(taskID) {
    let selectedContactContainer = document.getElementById('choosen_contact_container');
    let overFlowContainer = document.getElementById('overflow_container');
    let containerWidth = selectedContactContainer.offsetWidth;
    selectedContactContainer.innerHTML = '';
    overFlowContainer.innerHTML = '';
    renderSelectedContactsAtEditTask(selectedContactContainer, overFlowContainer, containerWidth, taskID);
}

function removeAssignedContacts(taskID, contactID) {
    let assignToCheckBtn = document.getElementById(`contact_check_btn${contactID}`);
    let selectedContact = document.getElementById(`selectable_contact${contactID}`);
    let assignedTaskContacts = allTasks[taskID]['assigned'];
    assignToCheckBtn.src = '../assets/img/checkbutton.svg';
    selectedContact.classList.remove('contact-selected');
    assignedTaskContacts.splice(contactID, 1);
    selectedContactsAtEditTask(taskID);
}

function renderSelectedContactsAtEditTask(selectedContactContainer, overFlowContainer, containerWidth, taskID) {
    let hiddenContacts = 0;
    let assignedTaskContacts = allTasks[taskID]['assigned'];
    for (let i = 0; i < assignedTaskContacts.length; i++) {
        let totalWidthContacts = calculateContainerWidth();
        if ((containerWidth - 46) > totalWidthContacts) {
            const choosenContact = assignedTaskContacts[i];
            selectedContactContainer.innerHTML += `
            <span class="contact-inicials" style="background-color: ${choosenContact.inicialcolor};" onclick="removeAssignedContacts(${taskID}, ${i})">${choosenContact.inicials}</span>`;
        } else {
            hiddenContacts++;
            overFlowContainer.innerHTML = `
            <span class="contact-inicials" style="background-color: #D1D1D1;">+${hiddenContacts}</span>`;
        }
    }
}