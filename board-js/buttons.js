let chooesedContacts = [];
let subtasksHelpArray = [];



 

function addTask(column) {
    columnName = column;
    document.getElementById('contactsDropdownContainer').classList.remove('d-none');
    document.getElementById('layover').classList.add('layover-plus');
    document.body.style = "overflow: hidden";
    let label = document.querySelectorAll("label");
    for (let index = 0; index < label.length; index++) {
        label[index].classList.add('mt-15-plus');
    }
    document.getElementById('taskCard').classList.add('task-card-plus');
    subtasksHelpArray = [];
}


function closeAddTask() {

    document.getElementById('layover').classList.remove('layover-plus');
    document.body.style = "overflow: visible";
    let label = document.querySelectorAll("label");
    for (let index = 0; index < label.length; index++) {
        label[index].classList.remove('mt-15-plus');
    }
    document.getElementById('taskCard').classList.remove('task-card-plus');
    contactsOpened = false;
    saveSubtasks();
    deleteContentAddTask();
    updateHTML();
}


function editFinish(id) {

    document.getElementById('selectContainer' + id).classList.remove('selectContainerPlus');
    let titleInput = document.getElementById('titleInput' + id).value;
    let descriptionInput = document.getElementById('textAreaDescription' + id).value;
    let dateInput = document.getElementById('dateInput' + id).value;

    if (titleInput == "" || descriptionInput == "" || dateInput == "") {
        document.getElementById('titleInput' + id).placeholder = "This field is required";
        document.getElementById('titleInput' + id).classList.add('placehoder-color-red');
        document.getElementById('textAreaDescription' + id).placeholder = "This field is required";
        document.getElementById('textAreaDescription' + id).classList.add('placehoder-color-red');
        document.getElementById('dateInput' + id).style = "color:red";

    } else {
        updateForTasks(id);
        addServer();
        updateHTML();
        document.getElementById('editContainerWrapper' + id).classList.add('d-none');
        document.getElementById('layoverTaskPopup' + id).classList.remove('d-none');
        document.getElementById('contentTaskPopup' + id).classList.remove('d-none');
    }
}


function openTaskPopup(id) {

    document.getElementById('layoverTaskPopup' + id).classList.remove('d-none');
    document.getElementById('contentTaskPopup' + id).classList.remove('d-none');
    document.body.style = "overflow: hidden";
    document.getElementsByClassName('header')[0].style.zIndex = "0";
    document.getElementById('titleInput' + id).value = `${tasks[id]['taskTitle']}`;
    document.getElementById('textAreaDescription' + id).innerHTML = `${tasks[id]['taskDescription']} `

}


function closeTaskPopup(id) {

    document.getElementById('selectContainer' + id).classList.remove('selectContainerPlus'); // select Panel wird zugemacht
    document.getElementById('layoverTaskPopup' + id).classList.add('d-none');
    document.getElementById('contentTaskPopup' + id).classList.add('d-none');
    document.body.style = "overflow: visible";
    document.getElementsByClassName('header')[0].style.zIndex = "10";
    if (tasks[id]) {
        document.getElementById('titleInput' + id).classList.remove('placehoder-color-red');
        document.getElementById('textAreaDescription' + id).classList.remove('placehoder-color-red');
        document.getElementById('dateInput' + id).value = tasks[id]['date'];
        document.getElementById('dateInput' + id).style = "color: lightgray";
    }
}


function stopPropagation(event) {
    event.stopPropagation();
}


function editTask(id) {

 
    document.getElementById('contentTaskPopup' + id).classList.add('d-none');
    document.getElementById('editContainerWrapper' + id).classList.remove('d-none');
    document.getElementById('editContainer' + id).classList.remove('d-none');
    if (tasks[id]['prioUrgent']) {
        showButtonUrgentRed(id);
    }
    if (tasks[id]['prioMedium']) {
        showButtonMediumOrange(id);
    }
    if (tasks[id]['prioLow']) {
        showButtonLowGreen(id);
    }
}


function closeEditContainer(id) {
    document.getElementById('layoverTaskPopup' + id).classList.add('d-none');
    document.getElementById('editContainerWrapper' + id).classList.add('d-none');
    document.getElementById('editContainer' + id).classList.add('d-none');
}


function dropDown(id) {
    document.getElementById('selectContainer' + id).classList.toggle('selectContainerPlus');
    document.getElementById('editContainerAvatars'+id).classList.toggle('d-none');
}


function prioButtonUrgentRed(id) {
    tasks[id]['prioUrgent'] = true;
    tasks[id]['prioMedium'] = false;
    tasks[id]['prioLow'] = false;
    showButtonUrgentRed(id);
    hidePrioButtonMediumOrange(id);
    hidePrioButtonLowGreen(id);
    showButtonUrgentRedOnTaskPopup(id);
}


function prioButtonMediumOrange(id) {
    tasks[id]['prioUrgent'] = false;
    tasks[id]['prioMedium'] = true;
    tasks[id]['prioLow'] = false;
    showButtonMediumOrange(id);
    hidePrioButtonUrgentRed(id);
    hidePrioButtonLowGreen(id);
    showButtonMediumOrangeOnTaskPopup(id);
}


function prioButtonLowGreen(id) {
    tasks[id]['prioUrgent'] = false;
    tasks[id]['prioMedium'] = false;
    tasks[id]['prioLow'] = true;
    showButtonLowGreen(id);
    hidePrioButtonMediumOrange(id);
    hidePrioButtonUrgentRed(id);
    showButtonLowGreenOnTaskPopup(id);
}


function showButtonUrgentRed(id) {
    document.getElementById('prioArrowRed' + id).classList.add('d-none');
    document.getElementById('prioArrowWhite' + id).classList.remove('d-none');
    document.getElementById('urgent' + id).classList.add('urgent-red', 'button-shadow');
}


function showButtonMediumOrange(id) {
    document.getElementById('prioEqualSignOrange' + id).classList.add('d-none');
    document.getElementById('prioEqualSignWhite' + id).classList.remove('d-none');
    document.getElementById('medium' + id).classList.add('medium-orange', 'button-shadow');
}


function showButtonLowGreen(id) {
    if (tasks[id]['prioLow']) {
        document.getElementById('prioArrowGreen' + id).classList.add('d-none');
        document.getElementById('prioArrowWhiteDown' + id).classList.remove('d-none');
        document.getElementById('low' + id).classList.add('low-green', 'button-shadow');
    }
}


function hidePrioButtonUrgentRed(id) {
    document.getElementById('prioArrowRed' + id).classList.remove('d-none');
    document.getElementById('prioArrowWhite' + id).classList.add('d-none');
    document.getElementById('urgent' + id).classList.remove('urgent-red', 'button-shadow');
}


function hidePrioButtonMediumOrange(id) {
    document.getElementById('prioEqualSignOrange' + id).classList.remove('d-none');
    document.getElementById('prioEqualSignWhite' + id).classList.add('d-none');
    document.getElementById('medium' + id).classList.remove('medium-orange', 'button-shadow');
}


function hidePrioButtonLowGreen(id) {
    document.getElementById('prioArrowGreen' + id).classList.remove('d-none');
    document.getElementById('prioArrowWhiteDown' + id).classList.add('d-none');
    document.getElementById('low' + id).classList.remove('low-green', 'button-shadow');
}


function showButtonUrgentRedOnTaskPopup(id) {
    if (tasks[id]['prioUrgent']) {
        addServerPrioUrgent(id);
    }
}


function showButtonMediumOrangeOnTaskPopup(id) {
    if (tasks[id]['prioMedium']) {
        addServerPrioMedium(id);
    }
}


function showButtonLowGreenOnTaskPopup(id) {
    if (tasks[id]['prioLow']) {
        addServerPrioLow(id);
    }
}


function noButtonShadowRed(id) {
    if (tasks[id]['prioUrgent']) {
        document.getElementById('urgent' + id).classList.remove('button-shadow');
    }
}


function noButtonShadowOrange(id) {
    if (tasks[id]['prioMedium']) {
        document.getElementById('medium' + id).classList.remove('button-shadow');
    }
}


function noButtonShadowGreen(id) {
    if (tasks[id]['prioLow']) {
        document.getElementById('low' + id).classList.remove('button-shadow');
    }
}


function buttonShadowRed(id) {
    if (tasks[id]['prioUrgent']) {
        document.getElementById('urgent' + id).classList.add('button-shadow');
    }
}


function buttonShadowOrange(id) {
    if (tasks[id]['prioMedium']) {
        document.getElementById('medium' + id).classList.add('button-shadow');
    }
}


function buttonShadowGreen(id) {
    if (tasks[id]['prioLow']) {
        document.getElementById('low' + id).classList.add('button-shadow');
    }
}


function searchTask() {
    document.getElementById('searchMenu').style = "border: 1px solid lightgray";
    let inputOfSearch = document.getElementById('searchTask').value;
    inputOfSearch = inputOfSearch.toLowerCase();
    notExist = true;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let taskTitle = task['taskTitle'];
        document.getElementById('searchTask').placeholder = "Find task";
        document.getElementById('searchTask').classList.remove('placehoder-color-red');
        document.getElementById('task' + task['id']).classList.add('d-none');
        if (taskTitle.toLowerCase().includes(inputOfSearch)) {
            inputIsIncludes(task);
        } else if (notExist) {
            inputIsNotExist(task);
        }
    }
}


function inputIsIncludes(task) {
    document.getElementById('task' + task['id']).classList.remove('d-none');
    document.getElementById('searchMenu').style = "border: 1px solid lightgray";
    document.getElementById('searchTask').classList.remove('placehoder-color-red');
    notExist = false;
}


function inputIsNotExist(task) {
    document.getElementById('searchMenu').style = "border: 2px solid red";
    document.getElementById('searchTask').placeholder = "Task does not exist!";
    document.getElementById('searchTask').classList.add('placehoder-color-red');
    document.getElementById('task' + task['id']).classList.add('d-none');
}


function trashPopup(id) {
    document.getElementById('trashPopup' + id).classList.remove('d-none');
    document.getElementById('trashPopup' + id).classList.add('trash-popup');
}


 function deleteTask(id) {
    document.getElementById('task' + id).classList.add('d-none');
    closeTaskPopup(id)
    tasks.splice(id, 1);
    tasks.forEach((task, index) => {
        task['id'] = index;
    });
    addServer();
    updateHTML();
}


function noDelete(id) {
    document.getElementById('trashPopup' + id).classList.add('d-none');
}


function yesDelete(id) {
    document.getElementById('trashPopup' + id).classList.add('d-none');
    deleteTask(id);
}



function loadContacts(id) {
    document.getElementById('listOfPersons' + id).innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contactUser = contacts[i];
        const contactUserName = contactUser.userName;
        if (tasks[id]['names'].includes(contactUserName)) {
            renderActiveContacts(id, contactUserName, i);
        } else {
            renderNotActiveContacts(id, contactUserName, i);
        }
    }
}


function renderActiveContacts(id, contactUserName, i) {
    return document.getElementById('listOfPersons' + id).innerHTML += /*html*/`
   <div class="nameOfEditContainer">
   <div class="user-name-edit-container" id="userNameEditContainer${i}">${contactUserName}</div> 
   <input class="checkbox-edit-container" type="checkbox" id="checkboxEditContainer${i}"  value="${contactUserName}" checked>
   </div>
  `;
}


function renderNotActiveContacts(id, contactUserName, i) {
    return document.getElementById('listOfPersons' + id).innerHTML += /*html*/`
     <div class="nameOfEditContainer">
     <div class="user-name-edit-container" id="userNameEditContainer${i}">${contactUserName}</div> 
     <input class="checkbox-edit-container" type="checkbox" id="checkboxEditContainer${i}"   value="${contactUserName}">
     </div>
    `;
}



function chooseContact(id) {
    tasks[id]['names'] = [];
    tasks[id]['bGcolorsOfAvatar'] = [];
    chooesedContacts = [];
    let currentTask = document.getElementById('editContainer' + id);
    let allCheckbox = currentTask.querySelectorAll('.checkbox-edit-container');
    for (let i = 0; i < allCheckbox.length; i++) {
        const checkbox = allCheckbox[i];
        if (checkbox.checked) {
            chooesedContacts.push(checkbox.value);
        }
    }
    saveChoosedContacts(id);
}


function saveChoosedContacts(id) {
    for (let index = 0; index < chooesedContacts.length; index++) {
        const contact = chooesedContacts[index];
        tasks[id]['names'].push(contact);
        tasks[id]['bGcolorsOfAvatar'].push(newColor());
    }
}


function saveSubtasks() {
    if (subtasksHelpArray != [])
        for (let index = 0; index < subtasksHelpArray.length; index++) {
            const subtask = subtasksHelpArray[index];
            tasks[tasks.length - 1]['subtasks'].push(subtask)
        }
}


function saveDoneSubtask(id) {
    tasks[id]['subtasksCheckbox'] = [];
    let task = document.getElementById('contentTaskPopup' + id);
    let allCheckboxOfSubtasks = task.querySelectorAll('.checkbox-subtask');

    for (let i = 0; i < allCheckboxOfSubtasks.length; i++) {
        const checkboxOfSubtask = allCheckboxOfSubtasks[i];
        if (checkboxOfSubtask.checked && !tasks[id]['subtasksCheckbox'].includes(checkboxOfSubtask.value)) {
            tasks[id]['subtasksCheckbox'].push(checkboxOfSubtask.value);
        }
    }
    addServer();
    renderProgressBar(id, tasks[id]['subtasksCheckbox']);
    renderSubtasks(id);
}




