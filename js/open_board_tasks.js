let dropdownClicked = false;

function setDropdownClicked(clicked) {
    dropdownClicked = clicked;
}

function findTask(id) {
    return task = allTasks.find(t => t.id === id);
}

async function openTask(id) {
    if (!dropdownClicked) {        
        let openTaskField = document.getElementById('open_task');
        // let task = allTasks[i];
        let task = findTask(id)
        openTaskField.classList.remove('d-none');
        openTaskField.innerHTML = '';
        openTaskField.innerHTML = renderOpenTask(task);
        task.assigned_to = await getContacts(task.assigned_to)
        getAssignedContactsOpenTask(task);
        getSubtasksOpenTask(task);
    }
}

function getAssignedContactsOpenTask(task) {
    let assigned = task.assigned_to
    let assignedField = document.getElementById('open_task_assigened_contacts');
    assigned.forEach(contact => {
        assignedField.innerHTML += renderAssignedContactsOpenTask(contact);
    });
}

function getSubtasksOpenTask(task) {
    let subtasks = task.subtasks
    let subtaskField = document.getElementById('open_task_subtasks');
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        if (subtask.done) {
            subtaskField.innerHTML += renderSubtasksOpenTask(subtask, task.id, i, 'checkbuttonchecked')
        } else {
            subtaskField.innerHTML += renderSubtasksOpenTask(subtask, task.id, i, 'checkbutton')
        }
    }
}

function closeTask() {
    let openTaskField = document.getElementById('open_task');
    openTaskField.classList.add('d-none');
    openTaskField.innerHTML = '';
    // sortTasksToSections();
    initBoard()
}