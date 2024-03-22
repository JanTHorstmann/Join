async function initBoard() {
    await loadTasks();
    await loadContacts();
    generateSideBar();
    initResponsiveBoard();
    fillTaskContent();
    sortTasksToSections();
}

function fillTaskContent() {
    let toDoContainer = document.getElementById('to_do_container');
    let progressContainer = document.getElementById('progress_container');
    let feedbackContainer = document.getElementById('feedback_container');
    let doneContainer = document.getElementById('done_container');

    toDoContainer.innerHTML = renderToDoContainer();
    progressContainer.innerHTML = renderProgressContainer();
    feedbackContainer.innerHTML = renderFeedbackContainer();
    doneContainer.innerHTML = renderDoneContainer();
}



function sortTasksToSections() {
    clearTaskField('to_do', 'progress', 'feedback', 'done', '');
    clearTaskField('to_do', 'progress', 'feedback', 'done', '_responsive');
    allTasks.forEach(task => {
        if (task.inWichSection == 'to_do') {
            isTaskInArea(task.inWichSection);
            sortAllTasks(task);
            sortAllTasksResponsive(task);
        }
        if (task.inWichSection == 'progress') {
            isTaskInArea(task.inWichSection);
            sortAllTasks(task);
            sortAllTasksResponsive(task);
        }
        if (task.inWichSection == 'feedback') {
            isTaskInArea(task.inWichSection);
            sortAllTasks(task);
            sortAllTasksResponsive(task);
        }
        if (task.inWichSection == 'done') {
            sortAllTasks(task);
            sortAllTasksResponsive(task);
        }
    });
}

function isTaskInArea(section) {
    document.getElementById(`${section}_not_found`).classList.add('d-none');
    document.getElementById(`${section}_not_found_responsive`).classList.add('d-none');
}

function clearTaskField(to_do, progress, feedback, done, _responsive) {
    document.getElementById(`${to_do}_tasks${_responsive}`).innerHTML = '';
    document.getElementById(`${progress}_tasks${_responsive}`).innerHTML = '';
    document.getElementById(`${feedback}_tasks${_responsive}`).innerHTML = '';
    document.getElementById(`${done}_tasks${_responsive}`).innerHTML = '';

    document.getElementById(`to_do_not_found${_responsive}`).classList.remove('d-none');
    document.getElementById(`progress_not_found${_responsive}`).classList.remove('d-none');
    document.getElementById(`feedback_not_found${_responsive}`).classList.remove('d-none');
}

function sortAllTasks(task) {
    let taskSection = document.getElementById(`${task.inWichSection}_tasks`);
    let doneSubtasks = countDoneSubtasks(task); 
    let progressBar = fillProgressBar(task, doneSubtasks);   
    taskSection.innerHTML += renderBoardTask(task.id, task.category, task.title, task.description, task.subtasks, task.priority, doneSubtasks, progressBar);
    if (task.subtasks.length <= 0) {
        document.getElementById(`subtasks${task.id}`).innerHTML = '';
    }
    sortAssignedContacts(task);
}

function fillProgressBar(task, doneSubtasks) {
    let subtasks = task.subtasks
    let barWidth = (100 / subtasks.length) * doneSubtasks;
    return barWidth;
}

function countDoneSubtasks(task) {
    let subtasks = task.subtasks;
    let doneSubtasks = 0;
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        if (subtask.done) {
            doneSubtasks++
        }        
    }
    return doneSubtasks;
}

function sortAssignedContacts(task) {
    let assignedField = document.getElementById(`assigned_contacts${task.id}`);
    let overFlowContainer = document.getElementById(`overflow_container${task.id}`);
    let assignedContacts = task.assigned;
    assignedField.innerHTML = '';
    selectedContactsBoard(assignedField, overFlowContainer, assignedContacts)
}

function selectedContactsBoard(assignedField, overFlowContainer, assignedContacts) {
    let containerWidth = assignedField.offsetWidth;
    overFlowContainer.innerHTML = '';
    renderSelectedContactsBoard(assignedField, overFlowContainer, containerWidth, assignedContacts);
}

function calculateContainerWidthBord(assignedField) {
    let childElement = assignedField.children;
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
            <span class="contact-inicials" style="background-color: #D1D1D1;">+${hiddenContacts}</span>`;
        }
    }
}

async function checkSubtask(taskId, subtaskId) {
    let imgSrc = document.getElementById(`subtask${subtaskId}`);
    let taskDone = allTasks[taskId]['subtasks'][subtaskId]['done'];
    if (taskDone) {
        allTasks[taskId]['subtasks'][subtaskId]['done'] = !allTasks[taskId]['subtasks'][subtaskId]['done'];
        imgSrc.src = '../assets/img/checkbutton.svg';
    } else {
        allTasks[taskId]['subtasks'][subtaskId]['done'] = !allTasks[taskId]['subtasks'][subtaskId]['done'];
        imgSrc.src = '../assets/img/checkbuttonchecked.svg';
    }
    await saveTasks();
}

function openAddTask(sectionContainer) {
    inWichContainer = sectionContainer;
    let openAddTask = document.getElementById('open_task');
    openAddTask.classList.remove('d-none');
    openAddTask.innerHTML = /*html*/`<div class="open-add-task" id="add_task_content"></div>`
    renderAddTaskContent('onBoard');
    renderAssignedTo();
    let closeTaskImg = document.getElementById('close_add_task_img');
    closeTaskImg.classList.remove('d-none')
}

async function closeAddTask() {
    // inWichContainer = 'to_do';
    let openAddTask = document.getElementById('open_task');
    openAddTask.classList.add('d-none');
    openAddTask.innerHTML = '';
    await loadTasks();
    sortTasksToSections();
}