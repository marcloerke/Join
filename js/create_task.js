let requiredShown= false;

async function createTask() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("keyTasks")) || [];
  let bgTaskCategory = window
    .getComputedStyle(categoryDot)
    .getPropertyValue("background");

  let rbgTaskCategory = bgTaskCategory.match(/\d+/g).map(Number);
  let prio = document.querySelector(".active");

  let newTask = {
    taskCategory: categoryInput.value,
    bgTaskCategory: rbgTaskCategory,
    taskTitle: title.value,
    taskDescription: description.value,
    priority: prio.innerText,
    //   priorityBg
    //   prioIconSrcTask
    //   prioIconSrcPopup
    //   prioUrgent
    //   prioMedium
    //   prioLow
    date: date.value,
    //   names
    //   bGcolorsOfAvatar
    column: "toDo",
    id: tasks.length - 1,
  };
  console.log(newTask);
  alert('Task created');
}


function formValidation() {
    if(checkInputs()) {
        createTask();
        window.location.href= "index.html";
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