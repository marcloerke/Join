let requiredShown= false;

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
  let bgTaskCategory= `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;  
  
  if(prio.innerText == 'Urgent'){
        priorityBg= '#ff3d00';
        prioIconSrcTask= 'arrow-up-red.png';
        prioIconSrcPopup= 'arrow-up-white.png';
        prioUrgent= true;
        prioMedium= false;
        prioLow= false;
  }
  else if(prio.innerText == 'Medium'){
        
        priorityBg= '#fea800';
        prioIconSrcTask= 'equal-sign-orange.svg';
        prioIconSrcPopup= 'equal-sign-white.svg';
        prioUrgent= false;
        prioMedium= true;
        prioLow= false;
  }
  else  {
        priorityBg= '#79e228';
        prioIconSrcTask= 'arrow-down-green.png';
        prioIconSrcPopup= 'arrow-down-white.svg';
        prioUrgent= false;
        prioMedium= false;
        prioLow= true;
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
    names: ['Peter Pan'],
    bGcolorsOfAvatar: [newColor()],
    column: "toDo",
    id: tasks.length,
  };
  
  tasks.push(newTask);
  backend.setItem('keyTasks', JSON.stringify(tasks));
}


function formValidation() {
    if(checkInputs()) {
        createTask();
        
    }
    else {
        showRequired();
    }
}

function checkInputs() {
    let allCorrect= true; 
    let prio = document.querySelector(".active");
    let data= [
        title, description, categoryInput, date
    ]
    for (let i = 0; i < data.length; i++) {
        const input = data[i];
        if(!input.value || input.value == 'Select task category'|| input.value== "") {
           
            allCorrect= false;
        }
    }
    if(prio == undefined) {
        
        allCorrect= false;
    }

    return allCorrect;
}

function showRequired() {
    requiredShown= true;
    let prio = document.querySelector(".active");
    let required= document.getElementsByClassName('required');
    let data= [
        title, description, categoryInput, date
    ]
    for (let i = 0; i < data.length; i++) {
        const input = data[i];
        if(!input.value || input.value == 'Select task category' || input.value== "") {
            required[i].innerText = "This field is required";
           
        }
    }
    if(prio == undefined) {
        required[required.length-1].innerText= "Priority Selection is mandatory";
        
    }
}

window.addEventListener('click', function() {
    if(requiredShown) {
        let required= this.document.querySelectorAll(".required");
        [...required].forEach(e => {
            e.innerText= "";
        })
        requiredShown= false;
    }
})