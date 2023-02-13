

setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');
async function init() {
    await downloadFromServer();
    //backend.deleteItem('keyTasks');
    tasks = JSON.parse(backend.getItem('keyTasks')) || []; 
    await includeHTML();
    updateHTML();
}

init();
