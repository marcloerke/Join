function navbarToggler() {
    const url= window.location.href;
    const currentPage = url.replace(/^(?:\/\/|[^/]+)*\//, '');
    const currentPageClean=  currentPage.replace("_", " ").replace(".html", "");
    const menuLinks= document.querySelectorAll('.nav-item');
    [...menuLinks].forEach(item => {
        if (currentPageClean.includes(item.innerText.toLowerCase())) {
            item.classList.add('active');
        }
    })
}



setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');
async function init() {
    await downloadFromServer();
    //backend.deleteItem('keyTasks');
    tasks = JSON.parse(backend.getItem('keyTasks')) || []; 
    await includeHTML();
    updateHTML();
    navbarToggler();
}

init();
