function renderBoardTask(id, category, title, description, subtask, prio, doneSubtasks, progressBar) {
    return /*html*/`
        <div id="task${id}" class="task" onclick="openTask(${id})" draggable="true" ondragstart="dragTask(${id})">
            <span class="task-category fontSize-16-400">${category}</span>
            <div class="title-description">
                <span class="task-title fontSize-16-700 color-2A3647">${title}</span>
                <span class="task-description fontSize-16-400">${description}</span>
            </div>
            <div id="subtasks${id}" class="task-subtasks">
                <div class="progressbar">
                    <div class="progressbar-field" style="width:${progressBar}%"></div>
                </div>
                <span class="count-subtasks">${doneSubtasks}/${subtask.length} Subtasks</span>
            </div>
            <div class="flex-between-center">
                <div id="assigned_contacts${id}" class="task-assigned-contacts">
                </div>
                <div id="overflow_container${id}">
                </div>
                <img src="../assets/img/${prio}_icon.svg" alt="">
            </div>
        </div>` 
}

function renderAssignedContacts(inicials) {      
    return /*html*/`
        <span class="contact-inicials-board-task">${inicials}</span>`  
}

function renderOpenTask(task) {
    return /*html*/`
        <div class="open-task">
            <div class="flex-between-center">
                <span class="open-task-category color-FFFFFF">${task.category}</span>
                <div class="close-task-icon" onclick="closeTask()">
                    <img src="../assets/img/cross_icon.svg" alt="">
                </div>
            </div>
            <div class="task">                
                <h1>${task.title}</h1>
                <span class="fontSize-20-400">${task.description}</span>
                <div class="flex-gap25">
                    <span class="fontSize-20-400 color-2A3647 width-100px">Due date:</span>
                    <span class="fontSize-20-400">${task.dueDate}</span>
                </div>
                <div class="flex-gap25">
                    <span class="fontSize-20-400 color-2A3647 width-100px">Priority:</span>
                    <div>
                        <span class="fontSize-20-400">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                        <img src="../assets/img/${task.priority}_icon.svg" alt="">
                    </div>
                </div>
                <div class="flex-column-gap8">
                    <span class="fontSize-20-400 color-2A3647">Assigned to:</span>
                    <div id="open_task_assigened_contacts" class="flex-column-gap4"></div>
                </div>

                <div class="flex-column-gap8">
                    <span class="fontSize-20-400 color-2A3647">Subtasks</span>
                    <div id="open_task_subtasks" class="flex-column-gap4"></div>
                </div>
            </div>
            <div class="flex-right-gap8">
                <div class="task-delete color-2A3647" onclick="deleteTask(${task.id})">
                    <img src="../assets/img/delete_subtask.svg">
                    <span>Delete</span>
                </div>
                <div class="separationline"></div>
                <div class="task-edit color-2A3647" onclick="editOpenTask(${task.id})">
                    <img src="../assets/img/edit_subtask.svg">
                    <span>Edit</span>
                </div>
            </div>
        </div>`
}

function renderAssignedContactsOpenTask(contact) { 
   return /*html*/ `
        <div class="contact-inicials-name">
            <span class="contact-inicials">${contact.inicials}</span>
            <span class="fontSize-19-400">${contact.name}</span>
        </div>`    
}

function renderSubtasksOpenTask(subtask, taskId, subtaskId, imgSrc) {
    return /*html*/ `
        <div class="subtask">
            <div class="check-icon">
                <img id="subtask${subtaskId}" src="../assets/img/${imgSrc}.svg"
                 onclick="checkSubtask(${taskId}, ${subtaskId})">
            </div>
            <span>${subtask.text}</span>
        </div>`
}

function renderEditOpenTask(i) {
    return /*html*/ `
        <div class="open-task">
            <div class="task">
                <div id="title_input_field" class="input-field"></div>
                <div id="description_input_field" class="input-field"></div>
                <div id="due_date_input_field" class="input-field"></div>
                <div id="prio_btn_input_field" class="input-field"></div>
                <div id="assigned_input_field" class="input-field"></div>
                <div id="subtask_input_field" class="input-field"></div>              
            </div>  
            <div class="edit-btn">                       
                <div class="clear-create-btn" onclick="saveEditTask(${i})">
                    <button class="create-btn fontSize-21-700">Ok <img src="../assets/img/check_icon_FFFFFF.svg" alt=""></button>
                </div>
            </div>  
        </div>`;   
}