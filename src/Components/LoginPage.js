/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";
import { API_URL } from "../utils/server.js";
import MediaWidget from "./MediaWidget.js"
import videoDemo from "../videos/Demo.mp4";

let loginPage = `<div class="loginPage">

<div class="row">
  <div class="formCase col-md-8">
    <div id="formContent">
      <div id="formHeader">
        <div class="row">
          <div class="col-md-12" id="instructions">
            <h2>About the game</h2>  
            <h5>Instructions :</h5>
              <p>Please login or sign up to access the game. Then you have to choose your level (Easy, Medium or Difficult). 
              The difference between the levels lies in the speed at which the targets are displayed. 
              Click on the "Play" button to start the game. You have 60 seconds to make the best score. 
              Each fixed target gives 10 points and each moving target 15 points. 
              After that, you can check your rank for each level in relation to the other players.</p>
            <h5>Demonstration video :</h5>
          </div>
          <div class="col-md-12" id="demoVideo">
            <div id="video"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <div class="formCase col-md-12">
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
        <div id="formFooter">
          <a class="btn underlineHover" href="/register">Not registered yet ? Sign up</a>
        </div>
      </div>
    </div>

    <div id="mediaWidget"></div>
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

  const myVideo = `<video width="80%" controls loop>
        <source src="${videoDemo}" type="video/mp4"/>
        Votre navigateur ne supporte pas les fichiers video.
     </video>`;   

  const video = document.querySelector("#video");
  video.innerHTML = myVideo;

  MediaWidget();

};

const onLogin = (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  if(localStorage.getItem("GlowCookies")!=1){
    console.log(localStorage.getItem("GlowCookies"));
    onError(411).end();
  }

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
  if(err===411){
    errorMessage = "Cookies no accepted.";
  }else if (err.message.includes("401")){
    errorMessage = "Wrong username or password.";
  } else{
    errorMessage = err.message;
  }
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default LoginPage;

