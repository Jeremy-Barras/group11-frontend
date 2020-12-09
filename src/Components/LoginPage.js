/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";
import { API_URL } from "../utils/server.js";
import videoDemo from "../videos/Demo.mp4";

let loginPage = `<div class="welcome">
<h3>Welcome</h3>
<p>Please log in for access to game.</p>
<div class="formCase">
<div id="formContent">
  <div id="formHeader">
  <form>
    <div class="form-group">
      <label for="email">Email</label>
      <input class="form-control" id="email" type="text" name="email" placeholder="Enter your email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input class="form-control" id="password" type="password" name="password" placeholder="Enter your password" required="" pattern=".*[A-Z]+.*" />
    </div>
    <button class="btn btn-primary" id="btn" type="submit">Login</button>
    <!-- Create an alert component with bootstrap that is not displayed by default-->
    <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div>
  </form>
  </div>
  <div id="formFooter"><a class="btn underlineHover" href="/register">Not register yet ? Sign up</a></div>
</div>
</div>
<h2>What about ?</h2>
<div class="row">
<div class="col-md-6" id="demoVideo">
  <div id="video"></div>
</div>
<div class="col-md-6" id="instructions">
  <h5>Game instructions :</h5>
  <li>Login or Register</li>
  <li>Choose your level (Easy, Medium or Hard). The difference between levels are in the target speed change.</li>
  <li>Click on Play button for start the game.</li>
  <li>You have 60 secondes for make the best score. Each fixed target give 10 points and slided target 15 points.</li>
  <li>Check your rank by level.</li>
</div>
</div>
</div>
</div>`;

const LoginPage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = loginPage;
  let loginForm = document.querySelector("form");
  const user = getUserSessionData();
  if (user) {
    RedirectUrl("/home");
  } else loginForm.addEventListener("submit", onLogin);

  const myVideo = `<video width="100%" height="100%" controls loop>
        <source src="${videoDemo}" type="video/mp4"/>
        Votre navigateur ne supporte pas les fichiers video.
     </video>`;   

  const video = document.querySelector("#video");
  video.innerHTML += myVideo;
};

const onLogin = (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  fetch(API_URL + "users/login", {
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
    .then((data) => onUserLogin(data))
    .catch((err) => onError(err));
};

const onUserLogin = (userData) => {
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  RedirectUrl("/home");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Wrong username or password.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default LoginPage;
