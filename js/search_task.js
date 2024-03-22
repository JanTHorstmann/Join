function searchTask() {
    let searchInput = document.getElementById('search_input').value.trim().toLowerCase();
    if (!searchInput) {
        sortTasksToSections();
        return;
    }
    let filteredTasks = allTasks.filter(task => {
        return task.title.toLowerCase().indexOf(searchInput) >= 0;
    });
    sortSearchedTasksToSections(filteredTasks);
}

function sortSearchedTasksToSections(filteredTasks) {
    clearTaskField('to_do', 'progress', 'feedback', 'done', '');
    clearTaskField('to_do', 'progress', 'feedback', 'done', '_responsive');
    filteredTasks.forEach(task => {
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