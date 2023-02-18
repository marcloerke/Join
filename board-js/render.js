async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "assets/templates/desktop_template.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function renderTasks(taskArea, filterdArray) {
    document.getElementById(taskArea).innerHTML = '';
    for (let i = 0; i < filterdArray.length; i++) {
        const task = filterdArray[i];
        const taskCategory = task['taskCategory'];
        const taskTitle = task['taskTitle'];
        const taskDescription = task['taskDescription'];
        const prioIconTaskSrc = task['prioIconSrcTask'];
        const prioIconPopupSrc = task['prioIconSrcPopup'];
        const priorityTaskPopup = task['priority'];
        const priorityBg = task['priorityBg'];
        const names = task['names'];
        const backgroundColor = task['bGcolorsOfAvatar'];
        const backgroundColorCategory = task['bgTaskCategory'];
        const date = task['date'];
        const id = task['id'];
        document.getElementById(taskArea).innerHTML +=  /*html*/ `
                <div id="task${id}" draggable="true" ondrag="dragging(${id})"  ondragstart="startDragging(${id},event)"  onclick="openTaskPopup(${id})" class="task">  
                    <div id="categoryContainer${id}" class="categoryTask-container">
                          <div class="categoryTask" style="background-color:${backgroundColorCategory}">${taskCategory}</div>
                    </div>
                    <div id="taskTitle${id}" class="task-title">${taskTitle}</div>
                    <div id="descriptionTask${id}" class="description">${taskDescription}</div>
                    <div id="myProgressBar${id}" class="my-progress-bar"></div>

                    <div class="avatar-container">
                          <div style="display:flex">
                              <div id="avatar${id}" class="avatar"></div>
                              <div id="avatarPlus${id}"></div>
                          </div>
                          <img id="prioIconOnTask${id}" src="/assets/img/${prioIconTaskSrc}">
                    </div>
                    <div id="layoverTaskPopup${id}" onclick="stopPropagation(event)"   class="layover-task-popup d-none"></div>
                </div> `;
        renderAvatars(names, id, backgroundColor);
        renderLayoverTaskPopup(id);
        renderTaskPopup(id, backgroundColorCategory, taskCategory, taskTitle, date, taskDescription);
        renderAvatarsTaskPopup(id, names, backgroundColor);
        renderProgressBar(id, names);
        renderEditContainer(id);
        renderInput(id);
        renderSelectPanel(id);
        renderSelectContact(id, names);
        renderPriorityContainer(id, priorityBg, priorityTaskPopup, prioIconPopupSrc);
        renderPrioButtons(id);
    }
}


function renderLayoverTaskPopup(id) {
    document.getElementById('layoverTaskPopup' + id).innerHTML = /*html*/ `
    <div id="contentTaskPopup${id}" onclick="stopPropagation(event)" class="content-task-popup d-none "></div>
    <div id="editContainerWrapper${id}" onclick="stopPropagation(event)"class="edit-container-wrapper d-none">
        <div id="editContainer${id}" class="edit-container " onclick="stopPropagation(event)"></div>
        <img id="okButtonBlack${id}" onmouseenter="okButtonToBlue(${id})" class="ok-button"src="/assets/img/ok-button-black.svg">
        <img id="okButtonBlue${id}" onclick="editFinish(${id})" onmouseleave="okButtonToBlack(${id})"class="ok-button d-none" src="/assets/img/ok-button-blue.svg">
    </div>`;
}


function renderTaskPopup(id, backgroundColorCategory, taskCategory, taskTitle, date, taskDescription) {
    document.getElementById('contentTaskPopup' + id).innerHTML = /*html*/ `
    <div class="categoryTask set-category" style="background-color:${backgroundColorCategory}" >${taskCategory}</div>
    <img class="exit" onclick="closeTaskPopup(${id})" src="/assets/img/exit.png">
    <div onclick="deleteTask(${id})" class="trash">Trash</div>
    <div id="taskTitlePopupContainer${id}" class="task-title set-title"  >${taskTitle}</div>
    <div id="descriptionPopup${id}" class="description set-description">${taskDescription}</div>
    <div class="dateContainer">
        <div id="dueDate${id}" class="due-date set-fonts">Due date:</div>
        <div class="due-date-set" id="dueDateSet${id}">${date}</div>
    </div>
    <div id="priorityContainer${id}" class="priority-container set-fonts"></div>
    <div id="assignedTo${id}" class="assigned-to set-fonts">Assigned To:</div>
    <img id="editButtonDark${id}"  onmouseenter="editButtonBlue(${id})" class="edit-button-dark" src="/assets/img/edit-button-dark.svg">
    <img id="editButtonBlue${id}" onclick="editTask(${id})" onmouseleave="editButtonDark(${id})"class="edit-button-blue d-none" src="/assets/img/edit-button-blue.svg">   `;
}


function renderEditContainer(id) {
    document.getElementById('editContainer' + id).innerHTML = /*html*/ `
    <img class="exit" onclick="closeTaskPopup(${id}) ; closeEditContainer(${id})" src="/assets/img/exit.png">
    <div>Title</div>
    <form id="formContainer${id}" style="display: flex; flex-direction: column;" onsubmit="editFinish(${id}) ; return false;" ></form>
    <div>Prio</div>
    <div id="prioContainer${id}" class="prio-container"></div>
    <div>Assigned to</div>
    <div id="selectContainer${id}" class="selectContainer"></div>`;
}


function renderPriorityContainer(id, priorityBg, priorityTaskPopup, prioIconPopupSrc) {
    document.getElementById('priorityContainer' + id).innerHTML = /*html*/ `
    <div>Priority:</div>
    <div id="prioUrgentTaskPopup${id}" class="prio-urgent-task-popup prio-setup  " style="background-color:${priorityBg}">${priorityTaskPopup} <img
           src="/assets/img/${prioIconPopupSrc}"></div>`;
}


function renderPrioButtons(id) {
    document.getElementById('prioContainer' + id).innerHTML += /*html*/ `
    <div onclick="prioButtonUrgentRed(${id})"
    onmouseenter="noButtonShadowOrange(${id}); noButtonShadowGreen(${id}) "
    onmouseleave="buttonShadowOrange(${id}) ; buttonShadowGreen(${id})" id="urgent${id}"
    class="urgent prio-buttons ">Urgent
    <img id="prioArrowRed${id}" class="prio-arrow-red" src="/assets/img/arrow-up-red.png">
    <img id="prioArrowWhite${id}" class="prio-arrow-white d-none"
        src="/assets/img/arrow-up-white.png">
    </div>
       
    <div onclick="prioButtonMediumOrange(${id})"
    onmouseenter="noButtonShadowRed(${id}) ; noButtonShadowGreen(${id})"
    onmouseleave="buttonShadowRed(${id}); buttonShadowGreen(${id})" id="medium${id}"
    class="medium prio-buttons">Medium
    <img id="prioEqualSignOrange${id}" class="prio-equal-sign-orange"
        src="/assets/img/equal-sign-orange.png">
    <img id="prioEqualSignWhite${id}" class="prio-equal-sign-white d-none"
        src="/assets/img/equal-sign-white.svg">
    </div>

    <div onclick="prioButtonLowGreen(${id})"
    onmouseenter="noButtonShadowOrange(${id}); noButtonShadowRed(${id})"
    onmouseleave="buttonShadowOrange(${id}); buttonShadowRed(${id})" id="low${id}"
    class="low prio-buttons">Low
    <img id="prioArrowGreen${id}" class="prio-arrow-green"
        src="/assets/img/arrow-down-green.png">
    <img id="prioArrowWhiteDown${id}" class="prio-arrow-white-down d-none"
        src="/assets/img/arrow-up-white.png">
    </div>`;
}


function renderInput(id) {
    document.getElementById('formContainer' + id).innerHTML = /*html*/ `
    <input required id="titleInput${id}" class="title-input" placeholder="Change title"type="text">
    <div>Description</div>
    <textarea required placeholder="Change Description"
          id="textAreaDescription${id}" class="text-area-description" name="" cols="40" rows="5"></textarea>
    <div>Due date</div>
    <input required id="dateInput${id}" placeholder="05/08/2022" class="date-input" value="2018-07-22" type="date">`;
}


function renderSelectPanel(id) {
    document.getElementById('selectContainer' + id).innerHTML = /*html*/`
    <div class="option optionPlus">
        <div class="selectContact contactName">Select contacts to assign</div>
        <button id="button${id}" onclick="dropDown(${id})" class="button">
        <img id="img${id}" class="img" src="/assets/img/arrow-down-black.png" alt="">
        </button>
    </div>
    <div id="listOfPersons${id}" class="list-of-persons"></div>
    <div id="inviteNewContact${id}" class="option border-radius">
        <div class="contactName">Invite new contact</div>
        <img id="noName${id}" class="noname" src="/assets/img/new-contact.png">
    </div>`;
}


function renderSelectContact(id, names) {
    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        document.getElementById('listOfPersons' + id).innerHTML += /*html*/ `
        <div  class="option">
             <div  class="contactName">${name}</div>
             <input class="checkbox" type="checkbox" id="checkbox${index}">
             </div>
        </div>`;
    }
}


function renderProgressBar(id, names) {
    let progressBarContainer = document.getElementById('myProgressBar' + id);
    if (names.length == 0) {
        progressBarContainer.innerHTML =/*html*/`
        <div class="progress-container">
             <div class="progress-blue"></div>
        </div>
        <div id="progressBarDone${id}" class="progress-bar-done">
             <div>${names.length}/3 Done</div>
        </div>`;
    }
    else if (names.length == 1) {
        progressBarContainer.innerHTML = progressOf33(id, names);
    }
    else if (names.length == 2) {
        progressBarContainer.innerHTML = progressOf66(id, names);
    }

    else if (names.length >= 3) {
        progressBarContainer.innerHTML = progressOf100(id, names);

    }
}


function progressOf33(id, names) {
    return /*html*/ `
    <div class="progress-container">
         <div class="progress-blue" style="width:33%"></div>
   </div>
   <div id="progressBarDone${id}" class="progress-bar-done">
         <div>${names.length}/3 Done</div>
    </div>` ;
}


function progressOf66(id, names) {
    return /*html*/`
    <div class="progress-container">
         <div class="progress-blue"  style="width:66%"></div>
    </div>
    <div id="progressBarDone${id}" class="progress-bar-done">
         <div>${names.length}/3 Done</div>
    </div>` ;
}


function progressOf100(id, names) {
    return  /*html*/`
    <div class="progress-container">
         <div class="progress-blue"  style="width:100%"></div>
    </div>
    <div id="progressBarDone${id}" class="progress-bar-done">
         <div>${names.length}/3 Done</div>
    </div>` ;
}


function renderAvatars(names, id, backgroundColor) {
    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        const firstLetterOfFirstName = name.split("", 1);
        const fullName = name.split(" ");
        const firstLetterOfLastName = fullName[1].split("", 1);
        if (index >= 2) {
            document.getElementById('avatarPlus' + id).innerHTML = `
              <div  class="color" style="background-color:black; width:16px"><div>+ ${index - 1}</div></div>`;
        } else {
            document.getElementById('avatar' + id).innerHTML += `
            <div id="color${index}" class="color" style="background-color:
               ${backgroundColor[index]}">
               ${firstLetterOfFirstName}${firstLetterOfLastName}</div> `;
        }
    }
}


function renderAvatarsTaskPopup(id, names, backgroundColor) {
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const firstLetterOfFirstName = name.split("", 1);
        const fullName = name.split(" ");
        const firstLetterOfLastName = fullName[1].split("", 1);
        document.getElementById('assignedTo' + id).innerHTML += /*html*/  `
         <div class="avatar-name">
               <div id="avatarTaskPopup${i}" class="set-color" style="background-color:
          ${backgroundColor[i]}">${firstLetterOfFirstName}${firstLetterOfLastName}</div>
                <div>${name}</div>
          </div> `;
    }
}



