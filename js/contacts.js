let contactList = [];
let storedContactsArray = [];
let tasks = [];

let dataFromServer = async () => {
  setURL("https://gruppe-428.developerakademie.net/smallest_backend_ever");
  await downloadFromServer();
  storedContactsArray = JSON.parse(backend.getItem("contacts")) || [];
  tasks = JSON.parse(backend.getItem("keyTasks")) || [];
  renderContacts();
};

dataFromServer();

let createContactData = async () => {
  let userName = document.querySelector("#name").value;
  let userMail = document.querySelector("#mail").value;
  let userPhone = document.querySelector("#phone").value;
  let userId = storedContactsArray.length;
  let newContact = {
    id: userId,
    userName: userName,
    userMail: userMail,
    userPhone: userPhone,
    createdAt: new Date().getTime(),
    color: newColor(),
  };

  storedContactsArray.push(newContact);
  await backend.setItem("contacts", JSON.stringify(storedContactsArray));
  document.getElementById("contactLoader").innerHTML = ``;
  cancelContactData();
  renderContacts();
  // console.log(storedContactsArray);
  // contactList.push(newContact);
  // console.log(contactList);
  // let allContactDataString = JSON.stringify(contactList);
  // storedContactsArray.push(newContact);
  /*  submitNotification(); */
};

function newColor() {
  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  //filterColor(randomColor);
  return randomColor;
}

const renderContacts = () => {
  let addContactToList = document.querySelector("#contactInList");
  addContactToList.innerHTML = "";
  let sortedContacts = storedContactsArray.sort((a, b) =>
    a.userName.localeCompare(b.userName)
  );
  // console.log(sortedContacts);

  for (let i = 0; i < sortedContacts.length; i++) {
    const contact = sortedContacts[i];
    const previousContact = sortedContacts[i - 1];
    if (
      previousContact != undefined &&
      contact.userName[0] != previousContact.userName[0]
    ) {
      let initials = createInitials(contact);
      addContactToList.innerHTML += /*html*/ `
        <li>
          <div class="sorter">${contact.userName[0]}</div>
          <div class="contact-box" onclick="toggleBetweenContacts(${contact.id})">
            <a href="#"><div id="initialsContainer" style="background: ${contact.color}">${initials}</div></a> 
            <div class="name-mail-container">
              <div>${contact["userName"]}</div>
              <div>${contact["userMail"]}</div>
            </div>
          </div>
        </li>
      `;
    } else if (i === 0) {
      let initials = createInitials(contact);
      addContactToList.innerHTML += /*html*/ `
        <li>
          <div class="sorter">${contact.userName[0]}</div>
          <div class="contact-box" onclick="toggleBetweenContacts(${contact.id})">
            <a href="#"><div id="initialsContainer" style="background: ${contact.color}">${initials}</div></a> 
            <div class="name-mail-container">
              <div>${contact["userName"]}</div>
              <div>${contact["userMail"]}</div>
            </div>
          </div>
        </li>
      `;
    } else {
      let initials = createInitials(contact);
      addContactToList.innerHTML += /*html*/ `
      <li>
        <div class="contact-box" onclick="toggleBetweenContacts(${contact.id})">
          <a href="#"><div id="initialsContainer" style="background: ${contact.color}">${initials}</div></a> 
          <div class="name-mail-container">
            <div>${contact["userName"]}</div>
            <div>${contact["userMail"]}</div>
          </div>
        </div>
      </li>
    `;
    }
  }
};

// const getNewUserId = () => {
//   return GLOBAL_USER_ID++;
// }

const addContact = () => {
  let addContact = document.getElementById("contactLoader");
  addContact.innerHTML = ``;
  document.body.append(addContactTemplate());
};

function addContactTemplate() {
  let contactOverlay = document.createElement("div");
  contactOverlay.setAttribute("id", "overlay-blur-container");
  contactOverlay.innerHTML = /*html*/ `

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
              <input type="text" id="name" name="Name" class="fcf-form-control" placeholder="Your name" required>
              <img src="assets/img/icon_name.png">
            </div>
          </div>
          <div class="fcf-form-group">
            <label for="Email" class="fcf-label"></label>
            <div class="fcf-input-group">
                <input type="email" id="mail" required name="Email" class="fcf-form-control" placeholder="Your email address">
                <img src="assets/img/icon_mail.png">
            </div>
          </div>
          <div class="fcf-form-group">
            <label for="Phone" class="fcf-label"></label>
            <div class="fcf-input-group">
               <input type="tel" id="phone" name="Phone" pattern="^\+49 \d{4} \d{5}$" placeholder="+49 1234 56789" required> 
              <img src="assets/img/icon_phone.png">
            </div>
          </div>
        </form>
        <div class="button-container">
          <button class="button-style-cancel" onclick="cancelContactData()">Cancel <img src="assets/img/icon_close.png"></button>
          <button class="button-style-submit" onclick="if(formValidation()){createContactData()}" id="requireFill">Create contact <img src="assets/img/icon_create.png"></button>                       
        </div>
      </div>
    </div>
</div>

  `;
  return contactOverlay;
}

function formValidation() {
  let inputs = document.getElementsByTagName("input");
  let userPattern = /^[0-9]*[a-zA-Z]{2,}.*$/;
  let mailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  let phonePattern =
  ///^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  /^\+\d{1,}\s?\d{1,}\s?\d{1,}\s?\d{1,}\s?\d{1,}\s?\d{1,}\s?\d{1,}$/;
  let allCorrect = true;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (input.value.length == 0) {
      let message = "This field is required!";
      allCorrect = false;
      generateTooltip(input, message);
    }

    if (
      input.type === "email" &&
      !mailPattern.test(input.value) &&
      input.value.length > 0
    ) {
      let message = "Please enter a valid email adress!";
      allCorrect = false;
      generateTooltip(input, message);
    }

    if (
      input.type === "tel" &&
      !phonePattern.test(input.value) &&
      input.value.length > 0
    ) {
      let message = "Please enter a valid phone number!";
      allCorrect = false;
      generateTooltip(input, message);
    }

    if (
      input.type === "text" &&
      !userPattern.test(input.value) &&
      input.value.length > 0
    ) {
       
      let message = "Please enter a valid name!";
      allCorrect = false;
      generateTooltip(input, message);
    }
  }
  console.log(allCorrect);
  return allCorrect;
}

function generateTooltip(input, message) {
  let tooltip = document.createElement("div");
  tooltip.classList.add("validation-tooltip");
  tooltip.innerHTML = /*html*/ `
        <p>!</p>
        <p>${message}</p>
        `;
  input.parentNode.append(tooltip);
}

function editContactTemplate(userId) {
  let editOverlay = document.createElement("div");
  editOverlay.setAttribute("id", "editContactOverlay");
  editOverlay.innerHTML = /*html*/ `
     <div class="add-contact-overlay">
        <div class="left-overlay">
          <div>
            <img src="assets/img/join_logo_light.png">
            <h1>Edit Contact</h1>
            <p>Change contact information</p>
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
                    <input type="text" id="name" value="${storedContactsArray[userId].userName}" name="Name" class="fcf-form-control" placeholder="Your name" required >
                    <img src="assets/img/icon_name.png">
                  </div>
                </div>
                <div class="fcf-form-group">
                  <label for="Email" class="fcf-label"></label>
                  <div class="fcf-input-group">
                      <input type="email" id="mail" value="${storedContactsArray[userId].userMail}" name="Email" class="fcf-form-control" placeholder="Your email address" required>
                      <img src="assets/img/icon_mail.png">
                  </div>
                </div>
                <div class="fcf-form-group">
                  <label for="Phone" class="fcf-label"></label>
                  <div class="fcf-input-group">
                    <input type="tel" id="phone" value="${storedContactsArray[userId].userPhone}" name="Phone" placeholder="+49 1234 56789" required>
                    <img src="assets/img/icon_phone.png">
                  </div>
                </div>
              </form>
            <div class="button-container">
              <button class="button-style-cancel" onclick="closeEditOverlay()">Cancel <img src="assets/img/icon_close.png"></button>
              <button class="button-style-submit" id="requireFill" onclick="if(formValidation()){saveContactData(${userId})}">Edit contact <img src="assets/img/icon_create.png"></button>                       
            </div> 
          </div>
        </div>
      </div>

  `;
  return editOverlay;
}

// const filledForms = () => {
//   if (document.getElementById("name").value === "") {
//     document.getElementById("requireFill").disabled = true;
//   } else if (document.getElementById("mail").value === "") {
//     document.getElementById("requireFill").disabled = true;
//   } else if (document.getElementById("phone").value === "") {
//     document.getElementById("requireFill").disabled = true;
//   } else {
//     document.getElementById("requireFill").disabled = false;
//   }
// };

const createInitials = (contact) => {
  let matches = contact.userName.match(/\b\w/g) || [];
  return (
    (matches[0] || "") + (matches[matches.length - 1] || "")
  ).toUpperCase();
};

const clearContactArguments = (contactList) => {
  contactList.shift();
};

// const loadAllContacts = () => {
//   let allContactDataString = localStorage.getItem("contactList");
//   contactList = JSON.parse(allContactDataString);
// }

const cancelContactData = () => {
  let addContact = document.getElementById("contactLoader");
  addContact.innerHTML = ``;
  let blurContainer = document.querySelector("#overlay-blur-container");
  blurContainer.remove();
};

const showContactData = (contact) => {
  let updateContactForm = document.querySelector("#updatedContacts");
  updateContactForm.innerHTML = ``;
  const index = storedContactsArray.findIndex(user => user.id === contact.id)
  let initials = createInitials(contact);
  if (contact != null) {
    updateContactForm.innerHTML += /*html*/ `
      <div class="contact-info">
        <div class="contact-header">
            <div class="initials-big" style="background: ${contact.color}">${initials}</div>
            <div class="add-task-container-small">
              <h1>${contact["userName"]}</h1>
              <div class="contact-task" id="contact-task" onclick="renderTaskOverlay(${contact.id})">
                  <img src="assets/img/icon_add_task_plus.png" alt="#">
                  <h2>Add Task</h2>
              </div>
            </div>
        </div>
        
        <div class="contact-edit" >
            <div><h2>Contact Information</h2></div>
            <div onclick="editContact(${index})"><img src="assets/img/icon_edit_dark.png" alt=""> Edit</div>
            
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
  if (window.innerWidth < 1000) {
    let sectionLeft= document.getElementsByTagName('section')[0];
    let sectionRight= document.getElementsByTagName('section')[1];
    sectionRight.style.display= "block";
    sectionLeft.style.display= "none";
    let button= document.getElementsByClassName('button-position')[0];
    button.style.display= "none";
  }
  if (window.innerWidth >= 1000) {
    let sectionRight= document.getElementsByTagName('section')[1];
    sectionRight.style.display= "";
  }
};



function closeContactDataMobile(){
  let sectionLeft= document.getElementsByTagName('section')[0];
  let sectionRight= document.getElementsByTagName('section')[1];
  let button= document.getElementsByClassName('button-position')[0];
  button.style.display= "block";
  if (window.innerWidth < 1000) {
    sectionRight.style.display= "none";
    sectionLeft.style.display= "block";
  } 
  if (window.innerWidth < 750) {
    sectionRight.style.display= "none";
    sectionLeft.style.display= "flex";
  } 
    
}





const editContact = (userId) => {
  document.body.append(editContactTemplate(userId));
};

const closeEditOverlay = () => {
  document.getElementById("editContactOverlay").remove();
  let inputs = document.getElementsByTagName("input");
  [...inputs].forEach((input) => {
    input.value = "";
  });
};

const toggleBetweenContacts = (userId) => {
  var currentUser = getUserById(userId);
  showContactData(currentUser);
  // loadMobileContactView(currentUser);
  // toggleMobileOverlay();
  // onsubmitContact(currentUser);
};

// const toggleMobileOverlay = () => {
//   console.log("mobile");
//   document.getElementById("mobileContactOverlay").classList.add("show-mobile-overlay");
// }

// const removeMobileOverlay = () => {
//   document.getElementById('mobileContactOverlay').classList.remove('show-mobile-overlay');
// }

// const loadMobileContactView = (currentUser) => {
//   let contactMobileOverlay = document.getElementById("mobileContactOverlay");
//   contactMobileOverlay.innerHTML = ``;
//   const index = storedContactsArray.findIndex(user => user.id === currentUser.id)
//   let initials = createInitials(currentUser); 

//   if(currentUser != null) {
//     contactMobileOverlay.innerHTML +=  /*html*/ `
//       <div class="overlay-mobile">
//         <div class="contact-header">
//             <div class="initials-big" style="background: ${currentUser.color}">${initials}</div>
//             <div class="add-task-container-small">
//               <h1>${currentUser["userName"]}</h1>
//               <div class="contact-task" id="contact-task" onclick="renderTaskOverlay(${currentUser.id})">
//                   <img src="assets/img/icon_add_task_plus.png" alt="#">
//                   <h2>Add Task</h2>
//               </div>
//             </div>
//         </div>
        
//         <div class="contact-edit" >
//           <div><h2>Contact Information</h2></div>
//         <div onclick="editContact(${index})"><img src="assets/img/icon_edit_dark.png" alt=""> Edit</div>
            
//         </div>
//         <div class="contact-mail">
//             <h3>Email</h3>
//             <a href="mailto:ania.schulze@hotmail.com">${currentUser["userMail"]}</a>
//         </div>
//         <div class="contact-call">
//             <h3>Phone</h3>
//             <a href="tel:+49 123-456-7890">${currentUser["userPhone"]}</a>
//         </div>
//       </div>
//       <div onclick="removeMobileOverlay()">
//         <div class="arrow-style">
//           <img src="assets/img/left-arrow.png" alt="#">
//         </div>
//       </div>
//     `;
//   }
// }

const getUserById = (userId) => {
  var currentUser = storedContactsArray.filter(
    (v) => v != null && v.id == userId
  );
  return currentUser.length > 0 ? currentUser[0] : null;
};

async function saveContactData(userId) {
  let contactId = userId;
  let contact = storedContactsArray[contactId];
  let name = document.getElementById("name").value;
  let email = document.getElementById("mail").value;
  let phone = document.getElementById("phone").value;

  contact.userName = name;
  contact.userMail = email;
  contact.userPhone = phone;

  await backend.setItem("contacts", JSON.stringify(storedContactsArray));

  window.location.reload();
}

const defaultOnload = () => {
  document.getElementById("editContactOverlay").innerHTML = ``;
};

// const filterInputs = () => {
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("searchContacts");
//   filter = input.value.toLowerCase();
//   ul = document.getElementById("contactInList");
//   li = ul.getElementsByTagName("li");

//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toLowerCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// };

function removeValidationTooltip() {
  let tooltips = document.getElementsByClassName("validation-tooltip");
  if (tooltips) {
    [...tooltips].forEach((element) => {
      element.remove();
    });
  }
}

window.addEventListener("click", function (event) {
  let button = this.document.getElementById("requireFill");
  if (button && event.target != button) {
    removeValidationTooltip();
  }
});

