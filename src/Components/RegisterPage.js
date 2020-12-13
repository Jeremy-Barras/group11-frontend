import { RedirectUrl } from "./Router.js";
import { setUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";

/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
let registerPage = `<div class="registerPage">

<div class="col-md-12">
  <div class="formCase">
    <div id="formContent">
      <div id="formHeader">
        <form>
        <div class="form-group">
          <label for="pseudo">Nickname</label>
          <input class="form-control" id="pseudo" type="text" name="pseudo" placeholder="Enter your nickname" required="" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" placeholder="Enter your email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+\$" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input class="form-control" id="password" type="password" name="password" placeholder="Enter your password" required="" pattern=".*[A-Z]+.*" />
        </div>
        <button class="btn btn-primary" id="btn" type="submit">Sign up</button>
        <!-- Create an alert component with bootstrap that is not displayed by default-->
        <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div><span id="errorMessage"></span>
        </form>
      </div>
      <div id="formFooter">
        <a class="btn underlineHover" href="/">Already registered ? Log in</a>
      </div>
    </div>
  </div>
</div>

</div>
`;

const RegisterPage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = registerPage;
  let registerForm = document.querySelector("form");
  registerForm.addEventListener("submit", onRegister);
};

const onRegister = (e) => {
  e.preventDefault();
  let user = {
    username: document.getElementById("pseudo").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  if(localStorage.getItem("GlowCookies")!=1){
    console.log(localStorage.getItem("GlowCookies"));
    onError(411).end();
  }

  fetch(API_URL + "users/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(user), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onUserRegistration(data))
    .catch((err) => onError(err));
};

const onUserRegistration = (userData) => {
  console.log("onUserRegistration", userData);
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  RedirectUrl("/home");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if(err === 411){
    errorMessage = "Cookies no accepted.";
  }else if(err.message.includes("410")){
    errorMessage = "your password is not strong.";
  } else if (err.message.includes("409"))
    errorMessage = "This user is already registered.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default RegisterPage;

