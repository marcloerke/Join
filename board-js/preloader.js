

setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');

let contacts= [];

async function init() {
    await downloadFromServer();
    //backend.deleteItem('keyTasks');
    //backend.deleteItem('keyContactList');
    tasks = JSON.parse(backend.getItem('keyTasks')) || []; 
    contacts = JSON.parse(backend.getItem("contacts")) || [];
    //contactList = JSON.parse(backend.getItem('keyContacts')) || [];
    await includeHTML();
    //console.log('contactList nach dem Laden: ',contactList);
    updateHTML();
    // console.log('tasks nach dem Laden: ',tasks);
    //console.log('contactList nach dem Laden: ',contactList);
}

init();
