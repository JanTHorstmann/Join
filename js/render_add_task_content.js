function renderAddTaskContent() {
    let addTaskContent = document.getElementById('add_task_content');

    addTaskContent.innerHTML = /*html*/ `
        <div class="header-add-task">
            <h1>Add Task</h1>
            <img id="close_add_task_img" class="d-none" src="../assets/img/cross_icon.svg" alt="" onclick="closeAddTask()">
        </div>
        <form id="add_task_form" onsubmit="createTask(); return false">
            <div id="form_left" class="form-left"></div>
            <div id="form_right" class="form-right"></div>

            <div class="info-btn-field">
                <div>
                    <label class="fontSize-20-400 required">*</label>
                    <label class="required-text">This field is required</label>
                </div>    
                <div class="clear-create-btn">
                    <button class="clear-btn fontSize-20-400" onclick="clearAddTaskInputs(event)">Clear x</button>
                    <button type="submit" class="create-btn fontSize-21-700">Create Task <img src="../assets/img/check_icon_FFFFFF.svg" alt=""></button>
                </div>
            </div>
        </form> `;


    renderAddTaskFormLeft();
    renderAddTaskFormRight();
    renderTitleInput();
    renderDescriptionInput();
    renderAssignedToInput();
    renderDueDateInput();
    renderPrioBtnInput();
    renderCategoryInput();
    renderSubTaskInput();
}

function renderAddTaskFormLeft() {
    let formLeft = document.getElementById('form_left');
    formLeft.innerHTML = /*html*/ `
        <div id="title_input_field" class="input-field"></div>
        <div id="description_input_field" class="input-field"></div>
        <div id="assigned_input_field" class="input-field"></div>`;
}

function renderTitleInput() {
    let titleInput = document.getElementById('title_input_field');
    titleInput.innerHTML = /*html*/`
        <div>
            <label class="fontSize-20-400" for="">Title</label>
            <label class="fontSize-20-400 required">*</label>
        </div>
        <div class="input-required-text">
            <input id="title_input" class="fontSize-20-400" required type="text" placeholder="Enter a title">
            <label class="required-text color-transparent">This field is required</label>
        </div>`
}

function renderDescriptionInput() {
    let descriptionInput = document.getElementById('description_input_field');
    descriptionInput.innerHTML = /*html*/ `
        <div>
            <label class="fontSize-20-400" for="">Description</label>
        </div>
        <div class="input-required-text">
            <textarea id="description_input" class="fontSize-20-400 font-family-inter" placeholder="Enter a Description"></textarea>
        </div>`;
}

function renderAssignedToInput() {
    let assignedInput = document.getElementById('assigned_input_field');
    assignedInput.innerHTML = /*html*/ `
        <label class="fontSize-20-400" for="">Assigned to</label>
        <div class="input-required-text input-subtask" onclick="openDropDown()">
            <input class="fontSize-20-400" type="text" placeholder="Select contacts to assign">
            <div class="add-subtask">
                <img id="dropdown_arrwo_contacts" src="../assets/img/arrow_dropdown_down.svg" alt="">
            </div>
        </div>
        <div class="selected-contacts">
            <div id="choosen_contact_container"></div>
            <div id="overflow_container"></div>
        </div>
        <div id="select_contacts_container" class="contact-container">
            <div class="select-contact-container"></div>
        </div>`;
}


function renderAddTaskFormRight() {
    let formRight = document.getElementById('form_right');
    formRight.innerHTML = /*html*/ `
        <div id="due_date_input_field" class="input-field"></div>
        <div id="prio_btn_input_field" class="input-field"></div>
        <div id="category_input_field" class="input-field"></div>
        <div id="subtask_input_field" class="input-field"></div>`;
}

function renderDueDateInput() {
    let dueDateInput = document.getElementById('due_date_input_field');
    dueDateInput.innerHTML = /*html*/ `
        <div>
            <label class="fontSize-20-400" for="">Due date</label>
            <label class="fontSize-20-400 required">*</label>
        </div>
        <div class="input-required-text">
            <input id="due_date_input" class="fontSize-20-400 color-D1D1D1 font-family-inter" required type="date"
                placeholder="dd/mm/yyyy">
            <label class="required-text color-transparent">This field is required</label>
        </div>`;
    setMinDate();
}

function renderPrioBtnInput() {
    let prioBtnInput = document.getElementById('prio_btn_input_field');
    prioBtnInput.innerHTML = /*html*/ `
        <div>
            <label class="fontSize-20-400" for="">Prio</label>
            <label class="fontSize-20-400 required">*</label>
        </div>
        <div class="prio-btn-field">
            <div id="prio_btn_urgent" class="prio-btn hover-effect fontSize-20-400"
                onclick="selctPrio('urgent')">
                <span>Urgent</span>
                <img id="urgent_btn" src="../assets/img/urgent_icon.svg">
            </div>
            <div id="prio_btn_medium" class="prio-btn hover-effect fontSize-20-400"
                onclick="selctPrio('medium')">
                <span>Medium</span>
                <img id="medium_btn" src="../assets/img/medium_icon.svg">
            </div>
            <div id="prio_btn_low" class="prio-btn hover-effect fontSize-20-400" onclick="selctPrio('low')">
                <span>Low</span>
                <img id="low_btn" src="../assets/img/low_icon.svg">
            </div>
        </div>`;
}

function renderCategoryInput() {
    let categoryInput = document.getElementById('category_input_field');
    categoryInput.innerHTML = /*html*/ `
        <div>
            <label class="fontSize-20-400" for="">Category</label>
            <label class="fontSize-20-400 required">*</label>
        </div>
        <div class="input-required-text">
            <select id="category_input" required class="fontSize-20-400" name="" id="" value="Select task category">
                <option class="d-none" value="" disabled selected>Select task category</option>
                <option class="fontSize-20-400" value="Technical Task">Technical Task</option>
                <option class="fontSize-20-400" value="User Story">User Story</option>
            </select>
        </div>`;
}

function renderSubTaskInput() {
    let subtaskInput = document.getElementById('subtask_input_field');
    subtaskInput.innerHTML = /*html*/ `
        <label class="fontSize-20-400" for="">Subtasks</label>
        <div class="input-required-text input-subtask">
            <input id="subtask_input" class="fontSize-20-400" type="text" placeholder="Add new subtask"
                onfocus="showConfirmationIcons('edit', 'add_clear')">
            <div class="add-subtask">
                <img id="edit_icon" src="../assets/img/add_subtask.svg" alt="">
                <div id="add_clear_icon" class="d-none">
                    <img src="../assets/img/cross_icon.svg" onclick="clearSubtaskInput()"> |
                    <img id="add_subtask_icon" src="../assets/img/check_icon.svg" onclick="addSubTask()">
                </div>
            </div>
        </div>
        <div id="subtask_container"></div>`;
}

function renderSelectedContacts(selectedContactContainer, overFlowContainer, containerWidth, assignedContacts) {
    let hiddenContacts = 0;
    for (let i = 0; i < assignedContacts.length; i++) {
        let totalWidthContacts = calculateContainerWidth();
        if ((containerWidth - 46) > totalWidthContacts) {
            const choosenContact = assignedContacts[i];
            selectedContactContainer.innerHTML += `
            <span class="contact-inicials" onclick="removeChoosenContacts(${choosenContact.id})">${choosenContact.inicials}</span>`;
        } else {
            hiddenContacts++;
            overFlowContainer.innerHTML = `
            <span class="contact-inicials">+${hiddenContacts}</span>`;
        }
    }
}