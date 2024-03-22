let inWichContainer;
function taskTemplate(title, description, dueDate, category) {
    let task = {
        'id': '',
        'title': title,
        'description': description,
        'assigned': choosenContacts,
        'dueDate': dueDate,
        'priority': selectedPrio,
        'category': category,
        'subtasks': subTasks,
        'inWichSection': inWichContainer || 'to_do',
    }
    allTasks.push(task);
    getTaskID();
}

function clearAddTaskInputs(event) {
    event.preventDefault();
    let form = document.getElementById('add_task_form');
    form.reset();
    selectedPrio = undefined;
    choosenContacts = [];
    subTasks = [];
    selctPrio();
    renderSubtask();
    selectedContacts(choosenContacts);
}

async function createTask(event, isOnBoard) {
    let title = document.getElementById('title_input');
    let description = document.getElementById('description_input');
    let dueDate = document.getElementById('due_date_input');
    let category = document.getElementById('category_input');
    if (selectedPrio) {
        taskTemplate(title.value, description.value, dueDate.value, category.value);
        clearAddTaskInputs(event);
        taskSuccessfullyCreated();
        await saveTasks();
        await loadTasks();
    } else {
        let prioBtnRequired = document.getElementById('prio_btn_required');
        prioBtnRequired.classList.add('required');
    }
    if (isOnBoard == 'onBoard') {
        closeAddTask();
    }
    event.preventDefault();
}

function taskSuccessfullyCreated() {
    let successfullOverlay = document.getElementById('task_added');
    successfullOverlay.classList.remove('d-none');
    setTimeout(() => {
        successfullOverlay.classList.add('task-successfull');
    }, 10);
    setTimeout(() => {
        successfullOverlay.classList.add('d-none');
        successfullOverlay.classList.remove('task-successfull');
    }, 1500);

}

function getTaskID() {
    let id = 0;
    allTasks.forEach(task => {
        task.id = id;
        id++;
    })
}

