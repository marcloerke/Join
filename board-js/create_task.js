let requiredShown = false;
let columnName = "toDo";

// let tasks = [];
// async function init() {
//     await downloadFromServer();
//             //backend.deleteItem('keyTasks');
//             tasks = JSON.parse(backend.getItem('keyTasks')) || [];
//             //addServerTasksArray();
//             // updateHTML();
//             console.log('whee');
//         }

async function createTask() {

    let rgb = window.getComputedStyle(categoryDot).getPropertyValue("background").match(/\d+/g).map(Number);

    //let rbgTaskCategory = bgTaskCategory.match(/\d+/g).map(Number);
    let prio = document.querySelector(".active");
    let priorityBg;
    let prioIconSrcTask;
    let prioIconSrcPopup;
    let prioUrgent;
    let prioMedium;
    let prioLow;
    let bgTaskCategory = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    let selectedContacts = [];
    let avatarColors = [];

    let checkboxes = document.querySelectorAll('.checkbox-primary');
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            selectedContacts.push(contacts[i].userName);
            avatarColors.push(contacts[i].color);
        }
    }



    if (prio.innerText == 'Urgent') {
        priorityBg = '#ff3d00';
        prioIconSrcTask = 'arrow-up-red.png';
        prioIconSrcPopup = 'arrow-up-white.png';
        prioUrgent = true;
        prioMedium = false;
        prioLow = false;
    }
    else if (prio.innerText == 'Medium') {

        priorityBg = '#fea800';
        prioIconSrcTask = 'equal-sign-orange.svg';
        prioIconSrcPopup = 'equal-sign-white.svg';
        prioUrgent = false;
        prioMedium = true;
        prioLow = false;
    }
    else {
        priorityBg = '#79e228';
        prioIconSrcTask = 'arrow-down-green.png';
        prioIconSrcPopup = 'arrow-down-white.svg';
        prioUrgent = false;
        prioMedium = false;
        prioLow = true;
    }

    let newTask = {
        taskCategory: categoryInput.value,
        bgTaskCategory: bgTaskCategory,
        taskTitle: title.value,
        taskDescription: description.value,
        priority: prio.innerText,
        priorityBg: priorityBg,
        prioIconSrcTask: prioIconSrcTask,
        prioIconSrcPopup: prioIconSrcPopup,
        prioUrgent: prioUrgent,
        prioMedium: prioMedium,
        prioLow: prioLow,
        date: date.value,
        names: selectedContacts,
        bGcolorsOfAvatar: avatarColors,
        column: columnName,
        id: tasks.length,
        'subtasks': [], 
        'subtasksCheckbox': []   
    };

    tasks.push(newTask);
    backend.setItem('keyTasks', JSON.stringify(tasks));
    closeAddTask();
    updateHTML();
    columnName = "toDo";
   deleteContentAddTask();                                
}


function deleteContentAddTask() {                               
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('selectCategory').value = '';
    document.getElementById('date').value = '';
    document.getElementById('categoryDot').classList.add('d-none');
    dropdownContainer.style.display = "none";
    categoryInput.style.borderBottom = "1px solid rgb(204, 204, 204)";
    categoryInput.style.borderRadius = "7px";
    contactsDropdown.style.display = "none";
    assignedToInput.style.borderBottom = "1px solid rgb(204, 204, 204)";
    assignedToInput.style.borderRadius = "7px";
    subtaskInputField.value = "";
    subtaskOnInput.style.display = "none";
    addSubtaskIcon.style.display = "inline";
    document.getElementById('subtaskContainer').innerHTML = '';
    document.querySelectorAll(".active").forEach(active => {
        active.style = "background-color: white; color: black";
    });

}


function formValidation() {
    if (checkInputs()) {
        createTask();

    }
    else {
        showRequired();
    }
}

function checkInputs() {
    let allCorrect = true;
    let prio = document.querySelector(".active");
    let data = [
        title, description, categoryInput, date
    ]
    for (let i = 0; i < data.length; i++) {
        const input = data[i];
        if (!input.value || input.value == 'Select task category' || input.value == "") {

            allCorrect = false;
        }
    }
    if (prio == undefined) {

        allCorrect = false;
    }

    return allCorrect;
}

function showRequired() {
    requiredShown = true;
    let prio = document.querySelector(".active");
    let required = document.getElementsByClassName('required');
    let data = [
        title, description, categoryInput, date
    ]
    for (let i = 0; i < data.length; i++) {
        const input = data[i];
        if (!input.value || input.value == 'Select task category' || input.value == "") {
            required[i].innerText = "This field is required";

        }
    }
    if (prio == undefined) {
        required[required.length - 1].innerText = "Priority Selection is mandatory";

    }
}

window.addEventListener('click', function () {
    if (requiredShown) {
        let required = this.document.querySelectorAll(".required");
        [...required].forEach(e => {
            e.innerText = "";
        })
        requiredShown = false;
    }
})