

setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');
async function init() {
    await downloadFromServer();
    //backend.deleteItem('keyTasks');
    //backend.deleteItem('keyContactList');
    tasks = JSON.parse(backend.getItem('keyTasks')) || []; 
   // contactList = JSON.parse(backend.getItem('keyContactList')) || []; 
    await includeHTML();
    //console.log('contactList nach dem Laden: ',contactList);
    updateHTML();
}

init();
