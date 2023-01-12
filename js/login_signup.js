//script variables
let cardContainer = document.getElementById("card-container");
let signUpContainer = document.getElementsByClassName("signup-container")[0];
let users = [];
let message;

//functions
function loginCardTemplate() {
  return /*html*/ `

        <form class='login-card' id="login-form">
          <h1>Log in</h1>
          <div class='user-input'>
            <input id='login-mail' type='email' placeholder='Email' required />
            <img src='assets/img/icon_mail.png' />
          </div>
          <div class='user-input'>
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

/**
 *
 */
function renderLogin() {
  cardContainer.innerHTML = loginCardTemplate();
  signUpContainer.style.display = "block";
  let loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  loginForm.addEventListener("submit", function () {
    login();
  });
}

function renderSignUp() {
  cardContainer.innerHTML = signUpCardTemplate();
  signUpContainer.style.display = "none";
  let signupForm = document.querySelector("#signup-form");
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  signupForm.addEventListener('submit', function() {
    signUp()
  })
}

function signUp() {
  let name = document.getElementById("signup-name");
  let email = document.getElementById("signup-mail");
  let password = document.getElementById("signup-password");
  let newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  users= [];
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  renderLogin();
}


function login() {
  let password= document.getElementById('login-password');
  let email= document.getElementById('login-mail');
  users= JSON.parse(localStorage.getItem('users'));
  if(users != undefined) {
    let user= users.find( u => {
      return u.password == password.value && u.email == email.value
  })
  if (user) {
      alert('Login successful!')
  }

  else {
      alert('Invalid user or password!')
  }
  }
  else {
    alert('Invalid user or password!')
  }
  
}