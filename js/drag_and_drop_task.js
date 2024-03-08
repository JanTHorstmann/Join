let dragTaskID;

function allowDrop(ev) {
    ev.preventDefault();
  }

function dragTask(id) {
    dragTaskID = id;
    let task = document.getElementById(`task${id}`);
    task.style = "transform: rotate(5deg)";
// console.log('drag Task', id);
}

async function dropTask(section) {
// console.log('drop Task', allTasks[dragTaskID]['inWichSection'], section);
let task = document.getElementById(`task${dragTaskID}`);
    task.style = "transform: rotate(0deg)";
allTasks[dragTaskID]['inWichSection'] = section;
sortTasksToSections();
await saveTasks();
}