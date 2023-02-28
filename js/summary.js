let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


async function initSummary() {
    await init();
    await dataFromServer();
    getCurrentDate();
    getUsername();
}
 

async function dataFromServer() {
    setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem("keyTasks")) || [];
    users = JSON.parse(backend.getItem("users")) || [];
    countStatus();
}


// new Date() creates a new date object with the current date and time:
// Wed Feb 08 2023 09:37:12 GMT+0100 (Mitteleuropäische Normalzeit)

// getFullYear() returns the year with four digits
// getMonth() returns the month (from 0 to 11)
// getDate() returns the day of the month (from 1 to 31)
// getHours() returns the hour (from 0 to 23

function getCurrentDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let hour = new Date().getHours();

    document.getElementById('greetings').innerHTML = getGreeting(hour);
    document.getElementById('date').innerHTML = getFullDate(month, day, year);
}


// hour-based greetings

function getGreeting(hour) {
    if (hour > 5 && hour < 11) return 'Good morning,';
    if (hour > 11 && hour < 18) return 'Good afternoon,';
    if (hour > 18 && hour < 22) return 'Good evening,';
    else return 'Good night,';
}


// returns for example "February 10, 2023"

function getFullDate(month, day, year) {
    let m = months[month];
    let d = day;
    let y = year;
    return `${m} ${d}, ${y}`;
}

//get name of currently logged in user

function getUsername() {
    let name= document.getElementById('loggedInUser');
    let index= users.findIndex(u=>{
        return u.loggedIn == true;
    })
    if (index !== -1) {
        name.innerText= users[index].name;
    }
    else {
        name.innerText= "Guest";
    }
}

// count all task-categories

function countStatus() {
    let statusProgress = 0;
    let statusFeedback = 0;
    let statusUrgent = 0;
    let statusToDo = 0;
    let statusDone = 0;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        if ( task['column'] == "inProgress") statusProgress++;
        if ( task['column'] == "awaitingFeedback") statusFeedback++;
        if ( task.prioUrgent == true) statusUrgent++;
        if ( task['column'] == "toDo") statusToDo++;
        if ( task['column'] == "done") statusDone++;        
    }

    document.getElementById('amountAll').innerHTML = `${tasks.length}`;
    document.getElementById('amountProgress').innerHTML = `${statusProgress}`;
    document.getElementById('amountFeedback').innerHTML = `${statusFeedback}`;
    document.getElementById('amountUrgent').innerHTML = `${statusUrgent}`;
    document.getElementById('amountToDo').innerHTML = `${statusToDo}`;
    document.getElementById('amountDone').innerHTML = `${statusDone}`;
}


// switch img(icon) when hover

function changeHoverIcon(id, link) {
    switch (link) {
        case 'assets/img/icon_pen.svg':
        document.getElementById(`${id}`).src = "assets/img/icon_pen_white.svg";
        break;
        case 'assets/img/icon_pen_white.svg':
        document.getElementById(`${id}`).src = "assets/img/icon_pen.svg";
        break;
        case 'assets/img/icon_check.svg':
        document.getElementById(`${id}`).src = "assets/img/icon_check_white.svg";
        break;
        case 'assets/img/icon_check_white.svg':
        document.getElementById(`${id}`).src = "assets/img/icon_check.svg";
        break; 
    }
}