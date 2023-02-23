
 
setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');

let contacts = [];

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('keyTasks')) || [];
    contacts = JSON.parse(backend.getItem("contacts")) || [];
    await includeHTML();
    navbarToggler();
    tooltip= document.getElementById('tooltip');
    updateHTML();
}

init();

function navbarToggler() {
    const url= window.location.href;
    const currentPage = url.replace(/^(?:\/\/|[^/]+)*\//, '');
    const currentPageClean=  currentPage.replace("_", " ").replace(".html", "");
    const menuLinks= document.querySelectorAll('.nav-item');
    [...menuLinks].forEach(item => {
        if (currentPageClean.includes(item.innerText.toLowerCase())) {
            item.classList.add('active-nav');
        }
    })
}

let logoutOpen= false;
let tooltip; 

function openCloseLogout() {
    
    if (logoutOpen) {
        tooltip.style.display= "none";
        logoutOpen= false;    
    }

    else {
        tooltip.style.display= "block";
        logoutOpen= true;   
    }
}