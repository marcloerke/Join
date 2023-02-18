
let toDo = 'taskArea-1';
let inProgress = 'taskArea-2';
let awaitingFeedback = 'taskArea-3';
let done = 'taskArea-4';
let currentDraggedElement;


function updateHTML() {
    filterForColumnOne();
    filterForColumnTwo();
    filterForColumnThree();
    filterForColumnFour();
    document.getElementById('searchMenuBackButton').classList.add('d-none');
}


function filterForColumnOne() {
    let one = tasks.filter(t => t['column'] == 'toDo');
    for (let index = 0; index < one.length; index++) {
        renderTasks(toDo, one);
    }
}


function filterForColumnTwo() {
    let two = tasks.filter(t => t['column'] == 'inProgress');
    for (let index = 0; index < two.length; index++) {
        renderTasks(inProgress, two);
    }
}


function filterForColumnThree() {
    let three = tasks.filter(t => t['column'] == 'awaitingFeedback');
    for (let index = 0; index < three.length; index++) {
        renderTasks(awaitingFeedback, three);
    }
}


function filterForColumnFour() {
    let four = tasks.filter(t => t['column'] == 'done');
    for (let index = 0; index < four.length; index++) {
        renderTasks(done, four);
    }
}


function startDragging(idOfTask, ev) {
    currentDraggedElement = idOfTask;
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById('task' + currentDraggedElement).style = "opacity: 0.2; box-shadow: inset 1px 1px 24px 10px rgba(0,0,0,0.3)";
}


function allowDrop(ev) {
    ev.preventDefault();
}


function dragging(idOfTask) {
    idOfTask = currentDraggedElement;
    document.getElementById('task' + currentDraggedElement).style = "opacity: 0.3; box-shadow: unset;border: 1px dashed gray";
}


function finishedDragging() {
    document.getElementById('task' + currentDraggedElement).style = "opacity: 1; box-shadow: unset;border: unset";
}


function ondragEnter(columnID) {
    document.getElementById(columnID).style = "opacity: 1; box-shadow: unset; border: 1px dashed lightgreen; border-radius: 15px";
}


function ondragLeave(columnID) {
    document.getElementById(columnID).style = "opacity: 1; box-shadow: unset;border: unset";
}


function moveTo(column, ev, columnID) {
    document.getElementById(columnID).style = "opacity: 1; box-shadow: unset;border: unset";
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    let dropedTask = tasks[currentDraggedElement];
    dropedTask['column'] = column;
    tasks.splice(currentDraggedElement, 1);
    tasks.push(dropedTask);
    tasks.forEach((task,index) => {task['id'] = index;});
    addServer();
    updateHTML();
}


function addServer() {
    backend.setItem('keyTasks', JSON.stringify(tasks));
   // backend.setItem('keyContactList', JSON.stringify(contactList));
}


