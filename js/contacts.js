const dataFromServer = async () =>  {
  setURL('https://gruppe-428.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  storedContactsArray = JSON.parse(backend.getItem("keyTasks")) || [];
  console.log(storedContactsArray)
}

const contactList = [];
const storedContactsArray = [];
var GLOBAL_USER_ID = 0;

const addContact = () => {
  let addContact = document.getElementById("contactLoader");
  addContact.innerHTML = ``;
  let blurContainer= document.querySelector('#overlay-blur-container')
  blurContainer.classList.remove('d-none');
}

const filledForms = () => {
  if (document.getElementById("name").value === "") {
    document.getElementById("requireFill").disabled = true;
  } else if (document.getElementById("mail").value === "") {
    document.getElementById("requireFill").disabled = true;
  } else if (document.getElementById("phone").value === "") {
    document.getElementById("requireFill").disabled = true;
  } else {
    document.getElementById('requireFill').disabled = false;
  }
}

const createContactData = () => {
  let userName = document.querySelector("#name").value;
  let userMail = document.querySelector("#mail").value;
  let userPhone = document.querySelector("#phone").value;
  let iserId = getNewUserId();
  let newContact = {
    "id": iserId,
    "userName": userName,
    "userMail": userMail,
    "userPhone": userPhone,
    "createdAt": new Date().getTime(),
  }

  contactList.push(newContact);
  console.log(contactList);
  let allContactDataString = JSON.stringify(contactList);
  storedContactsArray.push(newContact);
  console.log(storedContactsArray);
  localStorage.setItem("contactList", allContactDataString);
  document.getElementById("contactLoader").innerHTML = ``;
  let blurContainer= document.querySelector('#overlay-blur-container')
  blurContainer.classList.add('d-none');
  onsubmitContact();
  /*  submitNotification(); */
}
const getNewUserId = () => {
  return GLOBAL_USER_ID++;
}

const onsubmitContact = () => {
  let addContactToList = document.querySelector("#contactInList");
  addContactToList.innerHTML = "";
  for (let i = 0; i < contactList.length; i++) {
    let contact = contactList[i];
    let initials = createInitials(contact);
    addContactToList.innerHTML += /*html*/ `
      <li>
        <div class="contact-box" onclick="toggleBetweenContacts(${contact["id"]})">
          <a href="#"><div id="initialsContainer">${initials}</div></a> 
          <div class="name-mail-container">
            <div>${contact["userName"]}</div>
            <div>${contact["userMail"]}</div>
          </div>
        </div>
      </li>
    ` ;
  }
}

const createInitials_old = (initialsInNames) => {
  let initials = [];
  for (let n = 0; n < initialsInNames.length; n++) {
    let matches = initialsInNames[n].userName.match(/\b\w/g) || [];
    initials.push(((matches[0] || '') + (matches[matches.length - 1] || '')).toUpperCase());
  }
  onsubmitContact(initials);
}

const createInitials = (contact) => {
  let matches = contact.userName.match(/\b\w/g) || [];
  return ((matches[0] || '') + (matches[matches.length - 1] || '')).toUpperCase();
}

const clearContactArguments = (contactList) => {
  contactList.shift();
}

const loadAllContacts = () => {
  let allContactDataString = localStorage.getItem("contactList");
  contactList = JSON.parse(allContactDataString);
}

const cancelContactData = () => {
  let addContact = document.getElementById("contactLoader");
  addContact.innerHTML = ``;
  let blurContainer= document.querySelector('#overlay-blur-container')
  blurContainer.classList.add('d-none');
}

const showContactData = (contact) => {
  console.log(contact);
  let updateContactForm = document.querySelector("#updatedContacts");
  updateContactForm.innerHTML = ``;

  if (contact != null) {
    updateContactForm.innerHTML += /*html*/ `
      <div class="contact-info">
        <div class="contact-header">
            <h1>${contact["userName"]}</h1>
        </div>
        <div class="contact-task">
            <div><img src="assets/img/icon_add_task_plus.png" alt="#"></div>
            <div class="blue-text"><h2>Add Task</h2></div>
        </div>
        <div class="contact-edit" onclick="editContact(${contact.id})">
            <div><h2>Contact Information</h2></div>
            <div><img src="assets/img/icon_edit_dark.png" alt=""></div>
            <div>Edit</div>
        </div>
        <div class="contact-mail">
            <h3>Email</h3>
            <a href="mailto:ania.schulze@hotmail.com">${contact["userMail"]}</a>
        </div>
        <div class="contact-call">
            <h3>Phone</h3>
            <a href="tel:+49 123-456-7890">${contact["userPhone"]}</a>
        </div>
      </div>
    `;
  }
}

const editContact = (userId) => {
  let contactEdit = getUserById(userId);
  console.log(contactEdit);
  let editContact = document.getElementById("editContactOverlay");
  editContact.innerHTML = ``;

  if (contactEdit != null) {
    editContact.innerHTML += /*html*/ `
    <div class="add-contact-overlay">
      <div class="left-overlay">
        <div>
          <img src="assets/img/join_logo_light.png">
          <h1>Add Contact</h1>
          <p>Tasks are better with a team</p>
          <img src="assets/img/icon_line.png">
        </div>
      </div>
      <div class="add-contact-inputs">
        <div class="profile"><img src="assets/img/icon_person.png" alt="#"></div>
        <div class="input-fields">
        <form>
              <div class="fcf-form-group">
                <label for="Name" class="fcf-label"></label>
                <div class="fcf-input-group">
                  <input type="text" id="name" name="Name" class="fcf-form-control" placeholder="Your name" required onkeyup="filledForms()">
                  <img src="assets/img/icon_name.png">
                </div>
              </div>
              <div class="fcf-form-group">
                <label for="Email" class="fcf-label"></label>
                <div class="fcf-input-group">
                    <input type="email" id="mail" name="Email" class="fcf-form-control" placeholder="Your email address" required onkeyup="filledForms()">
                    <img src="assets/img/icon_mail.png">
                </div>
              </div>
              <div class="fcf-form-group">
                <label for="Phone" class="fcf-label"></label>
                <div class="fcf-input-group">
                  <input type="tel" id="phone" name="Phone" pattern="^\+49 \d{4} \d{5}$" placeholder="+49 1234 56789" required onkeyup="filledForms()">
                  <img src="assets/img/icon_phone.png">
                </div>
              </div>
            </form>
          <div class="button-container">
            <button class="button-style-save" onclick="saveContactData(${contactEdit.id})">Save <img src="assets/img/icon_create.png"></button>
          </div> 
        </div>
      </div>
    </div>
  `;
  }
}

const toggleBetweenContacts = (userId) => {
  var currentUser = getUserById(userId);
  console.log(currentUser);
  showContactData(currentUser);
  onsubmitContact(currentUser);
}

const getUserById = (userId) => {
  var currentUser = contactList.filter(v => v != null && v.id == userId);
  return currentUser.length > 0 ? currentUser[0] : null;
}

const saveContactData = (editContact) => {
  const contactId = editContact;
  const name = document.getElementById("name").value;
  const email = document.getElementById("mail").value;
  const phone = document.getElementById("phone").value;

  const contact = contactList.find(c => c.id === contactId);
  if (contact) {

    contact.userName = name;
    contact.userMail = email;
    contact.userPhone = phone;
  }
  defaultOnload();
}

const defaultOnload = () => {
  document.getElementById("editContactOverlay").innerHTML = ``;
}

const filterInputs = () => {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchContacts");
  filter = input.value.toLowerCase();
  ul = document.getElementById("contactInList");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

const getServerResponse = async () => {
  await downloadFromServer();
  storedContactsArray = JSON.parse(backend.getItem("users")) || [];
  let id = storedContactsArray["id"];
  let name = storedContactsArray["userName"];
  let email = storedContactsArray["userMail"];
  let phone = storedContactsArray["userPhone"];
  let newUser = {
    id: id.value,
    name: name.value,
    email: email.value,
    phone: phone.value,
  };
  storedContactsArray.push(newUser);
  await backend.setItem("users", JSON.stringify(users));
}

