function initResponsiveBoard() {
    fillTaskContentResponsive();
}

function fillTaskContentResponsive() {
    let toDoContainer = document.getElementById('to_do_container_responsive');
    let progressContainer = document.getElementById('progress_container_responsive');
    let feedbackContainer = document.getElementById('feedback_container_responsive');
    let doneContainer = document.getElementById('done_container_responsive');

    toDoContainer.innerHTML = renderToDoContainerResponsive();
    progressContainer.innerHTML = renderProgressContainerResponsive();
    feedbackContainer.innerHTML = renderFeedbackContainerResponsive();
    doneContainer.innerHTML = renderDoneContainerResponsive();
}

function sortAllTasksResponsive(task) {
    let taskSectionResponsive = document.getElementById(`${task.inWichSection}_tasks_responsive`);
    let doneSubtasks = countDoneSubtasks(task);
    let progressBar = fillProgressBar(task, doneSubtasks);
    taskSectionResponsive.innerHTML += renderBoardTaskResponsive(task.id, task.category, task.title, task.description, task.subtasks, task.priority, doneSubtasks, progressBar);
    if (task.subtasks.length <= 0) {
        document.getElementById(`subtasks_responsive${task.id}`).innerHTML = '';
    }
    sortAssignedContactsResponsive(task);
}

function sortAssignedContactsResponsive(task) {
    let assignedField = document.getElementById(`assigned_contacts_responsive${task.id}`);
    let overFlowContainer = document.getElementById(`overflow_container_responsive${task.id}`);
    let assignedContacts = task.assigned;
    assignedField.innerHTML = '';
    selectedContactsBoardResponsive(assignedField, overFlowContainer, assignedContacts)
}

function selectedContactsBoardResponsive(assignedField, overFlowContainer, assignedContacts) {
    let containerWidth = assignedField.offsetWidth;
    overFlowContainer.innerHTML = '';
    renderSelectedContactsBoard(assignedField, overFlowContainer, containerWidth, assignedContacts);
}

function renderSelectedContactsBoard(assignedField, overFlowContainer, containerWidth, assignedContacts) {
    let hiddenContacts = 0;
    for (let i = 0; i < assignedContacts.length; i++) {
        let totalWidthContacts = calculateContainerWidthBord(assignedField);
        if ((containerWidth - 46) > totalWidthContacts) {
            const choosenContact = assignedContacts[i];
            assignedField.innerHTML += renderAssignedContacts(choosenContact.inicials, choosenContact.inicialcolor);
        } else {
            hiddenContacts++;
            overFlowContainer.innerHTML = `
            <span class="contact-inicials" style="background-color: ${contact.inicialcolor};">+${hiddenContacts}</span>`;
        }
    }
}

function changeSection() {
    let section = document.getElementById('section_selection').value;
    hideAllResponsiveContainer();
    document.getElementById(`${section}_container_responsive`).classList.remove('d-none');
    sortTasksToSections();
}

function hideAllResponsiveContainer() {
    document.getElementById('to_do_container_responsive').classList.add('d-none');
    document.getElementById('progress_container_responsive').classList.add('d-none');
    document.getElementById('feedback_container_responsive').classList.add('d-none');
    document.getElementById('done_container_responsive').classList.add('d-none');
}

async function changeSectionTask(id) {
    let section = document.getElementById(`selection_task${id}`).value;
    allTasks[id]['inWichSection'] = section;
    await saveTasks();
    await loadTasks();
    sortTasksToSections();
}



















function renderToDoContainerResponsive() {
    return /*html*/ `
        <div class="task-section-header">
            <span class="fontSize-21-700 color-42526E">To do</span>
            <img class="add-task-btn" src="../assets/img/add_subtask.svg" onclick="openAddTask()">
        </div>
        <div class="task-area">
            <div id="to_do_not_found_responsive" class="no-task-found">
                <span class="fontSize-16-400">No tasks To do</span>
            </div>
            <div id="to_do_tasks_responsive" ondrop="dropTask('to_do')" ondragover="allowDrop(event)"></div>
        </div>`
}

function renderProgressContainerResponsive() {
    return /*html*/ `
        <div class="task-section-header">
            <span class="fontSize-21-700 color-42526E">In progress</span>
            <img class="add-task-btn" src="../assets/img/add_subtask.svg" onclick="openAddTask('progress')">
        </div>
        <div class="task-area">
            <div id="progress_not_found_responsive" class="no-task-found">
                <span class="fontSize-16-400">No tasks In progress</span>
            </div>
            <div id="progress_tasks_responsive" ondrop="dropTask('progress')" ondragover="allowDrop(event)"></div>
        </div>`
}

function renderFeedbackContainerResponsive() {
    return /*html*/ `
        <div id="feedback_container" class="task-section-header">
            <span class="fontSize-21-700 color-42526E">Await feedback</span>
            <img class="add-task-btn" src="../assets/img/add_subtask.svg" onclick="openAddTask('feedback')">
        </div>
        <div class="task-area">
            <div id="feedback_not_found_responsive" class="no-task-found">
                <span class="fontSize-16-400">No tasks Await feedback</span>
            </div>
            <div id="feedback_tasks_responsive" ondrop="dropTask('feedback')" ondragover="allowDrop(event)"></div>
        </div>`
}

function renderDoneContainerResponsive() {
    return /*html*/ `
        <div class="task-section-header">
            <span class="fontSize-21-700 color-42526E">Done</span>
        </div>
        <div id="done_tasks_responsive" class="task-area" ondrop="dropTask('done')" ondragover="allowDrop(event)"></div>`
}

function renderBoardTaskResponsive(id, category, title, description, subtask, prio, doneSubtasks, progressBar) {
    return /*html*/`
        <div class="task-dropdown">
            <select id="selection_task${id}" onchange="changeSectionTask(${id})">
                <option disabled selected value=""></option>
                <option value="to_do">To do</option>
                <option value="progress">In progress</option>
                <option value="feedback">Await Feedback</option>
                <option value="done">Done</option>
            </select>
        </div>
        <div id="task_responsive${id}" class="task" onclick="openTask(${id})" draggable="true" ondragstart="dragTask(${id})">
                <span class="task-category fontSize-16-400">${category}</span>               
            <div class="title-description">
                <span class="task-title fontSize-16-700 color-2A3647">${title}</span>
                <span class="task-description fontSize-16-400">${description}</span>
            </div>
            <div id="subtasks_responsive${id}" class="task-subtasks">
                <div class="progressbar">
                    <div class="progressbar-field" style="width:${progressBar}%"></div>
                </div>
                <span class="count-subtasks">${doneSubtasks}/${subtask.length} Subtasks</span>
            </div>
            <div class="flex-between-center">
                <div id="assigned_contacts_responsive${id}" class="task-assigned-contacts">
                </div>
                <div id="overflow_container_responsive${id}">
                </div>
                <img src="../assets/img/${prio}_icon.svg" alt="">
            </div>
        </div>`
}