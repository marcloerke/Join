//script variables

let cardContainer = document.getElementById("card-container");
let header= document.getElementsByTagName("header")[0];
let message;
setURL("https://gruppe-428.developerakademie.net/smallest_backend_ever");

/**
 * Main functions
 */
function  init() {
  setTimeout(function (){
    renderLogin();
    
  }
  , 800)
}

/**
 * rendering
 */

function renderSignUpWrapper() {
  let signUpWrapper= document.createElement('div');
  signUpWrapper.classList.add('signup-wrapper');
  signUpWrapper.innerHTML= headerTemplate();
  header.append(signUpWrapper);
}


function renderLogin() {
  cardContainer.innerHTML = loginCardTemplate();
  let loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  loginForm.addEventListener("submit", function () {
    login();
  });
  renderSignUpWrapper();
}

function renderSignUp() {
  let signUpWrapper = document.getElementsByClassName("signup-wrapper")[0];
  signUpWrapper.style.display= "none";
  cardContainer.innerHTML = signUpCardTemplate();
  let signupForm = document.querySelector("#signup-form");
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  signupForm.addEventListener("submit", function () {
    signUp();
  });
}

/**
 * sign up/ log in
 */

async function signUp() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
  let name = document.getElementById("signup-name");
  let email = document.getElementById("signup-mail");
  let password = document.getElementById("signup-password");
  let newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  users.push(newUser);
  await backend.setItem("users", JSON.stringify(users));
  alert('Signup successful!');
  renderLogin();
}

async function login() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
  let password = document.getElementById("login-password");
  let email = document.getElementById("login-mail");
  let user = users.find((u) => {
    return u.password == password.value && u.email == email.value;
  });
  if (user) {
    window.location.href= "index.html";
  } 
  else {
    renderLoginDeny();
  }
}

function renderLoginDeny() {
  document.getElementById('invalid').innerText="Invalid Username or Password";
}

function removeLoginDeny() {
  let errorMessage= document.getElementById('invalid');
  if (errorMessage){
    errorMessage.innerText='';
  }

}


window.addEventListener('click', function () {
  removeLoginDeny();
})





//template functions

function headerTemplate() {
  return /*html*/ `
        <p>Not a join user?</p>
        <button onclick="renderSignUp()">Sign up</button>
  `
}

function loginCardTemplate() {
  return /*html*/ `
        
  
        <form class='login-card' id="login-form">
          <h1>Log in</h1>
          <div class='user-input'>
            <input id='login-mail' type='email' placeholder='Email' required />
            <img src='assets/img/icon_mail.png' />
          </div>
          <div class='user-input'>
            <p id="invalid"></p>
            <input id='login-password' type='password' placeholder='Password' required />
            <img src='assets/img/icon_mail.png' />
          </div>
          
          <div class='login-options-container'>
            <div class='column1'>
              <div>
                <input type='checkbox' />
                <p>Remember me</p>
              </div>
              <button>Log in</button>
            </div>
            <div class='column2'>
              <p>Forgot my password</p>
              <button>Guest Log in</button>
            </div>
          </div>
        </form>
    `;
}

function signUpCardTemplate() {
  return /*html*/ `
     <form class='login-card' id="signup-form">
      <img src='assets/img/icon_back.png' alt='arrow' class='go-back' onclick='renderLogin()'>
          <h1>Sign Up</h1>
          <div class='user-input'>
            <input id='signup-name' type='text' placeholder='Name' required />
            <img src='assets/img/icon_mail.png' />
          </div>
          <div class='user-input'>
            <input id='signup-mail' type='email' placeholder='Email' required />
            <img src='assets/img/icon_mail.png' />
          </div>
          <div class='user-input'>
            <input id='signup-password' type='password' placeholder='Password' required />
            <img src='assets/img/icon_mail.png' />
          </div>
          <button class='sign-up'>Sign up</button>
      </form>
  `;
}
