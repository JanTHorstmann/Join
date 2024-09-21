let taskToChangeInWhichContainer;

function allowDrop(ev) {
    ev.preventDefault();
}

function dragTask(id) {
    // let task = findTask(id) 
    taskToChangeInWhichContainer = findTask(id);
    document.getElementById(`task${id}`).style = "transform: rotate(5deg)";
    // task.style = "transform: rotate(5deg)";
}

async function dropTask(section) {
    let task = document.getElementById(`task${taskToChangeInWhichContainer.id}`);
    task.style = "transform: rotate(0deg)";
    if (taskToChangeInWhichContainer['inWichSection'] == section) {
        return
    } else {
        taskToChangeInWhichContainer['inWichSection'] = section;
        sortTasksToSections();
        await saveTasks(taskToChangeInWhichContainer);
    }
}