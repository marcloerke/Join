

setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');

let contacts = [];

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('keyTasks')) || [];
    contacts = JSON.parse(backend.getItem("contacts")) || [];
    await includeHTML();
    updateHTML();
}

init();
