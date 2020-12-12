import { API_URL } from "../utils/server.js";
import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";
import profilTarget from "../images/profilTarget.png";
import MediaWidget from "./MediaWidget.js";

let home = `<div class="homePage">
<div class="row">

  <div class="formCase col-md-8">
    <div id="formContent">
      <div id="formHeader">
        <div id="leaderBoard"></div>
      </div>
      <div id="formFooter">
        <form action="/game">
        <div class="form-group">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Easy" checked>
            <label class="form-check-label" for="inlineRadio1">Easy</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Medium">
            <label class="form-check-label" for="inlineRadio2">Medium</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Hard">
            <label class="form-check-label" for="inlineRadio3">Hard</label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">PLAY</button>
        </form>
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <div class="col-md-12">
      <div class="formCase">
        <div id="formContent">
          <div id="formHeader">
            <div id="profilImage"></div>
            <p id="userAddress"></p>
            <button class='btn btn-danger' id='logoutButton' type='button'>Logout</button>
          </div>
          <div id="formFooter">
            <div id="score"></div>
            <div id="bestScore"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="mediaWidget"></div>
  </div>
</div>

</div>`;

let user;
let sz;

const HomePage = () => {

  user = getUserSessionData();
  let page = document.querySelector("#page");
  page.innerHTML = home;

  let logout = document.getElementById("logoutButton");
  logout.addEventListener("click", () => {
    RedirectUrl("/logout"); 
  });

  if (!user) {
    RedirectUrl("/");
  }

  let Score = document.querySelector("#score");
  if(localStorage.getItem("ScoreEasy") == null){
    Score.innerHTML = "Your Score : 0";
  }else{
    Score.innerHTML = "Your Score : " + localStorage.getItem("ScoreEasy");
  }

  let bestScore = document.querySelector("#bestScore");
  bestScore.innerHTML = "Best Score : " + user.bestScoreEasy;

  let easyDifficulty = document.querySelector("#inlineRadio1");
  easyDifficulty.addEventListener("click", bestScoreDifficulty,false);
  easyDifficulty.myParam = "Easy";

  let mediumDifficulty = document.querySelector("#inlineRadio2");
  mediumDifficulty.addEventListener("click", bestScoreDifficulty,false);
  mediumDifficulty.myParam = "Medium";

  let hardDifficulty = document.querySelector("#inlineRadio3");
  hardDifficulty.addEventListener("click", bestScoreDifficulty,false);
  hardDifficulty.myParam = "Hard";

  let gameForm = document.querySelector("form");
  gameForm.addEventListener("submit", onGame);

  let userAddress = document.querySelector("#userAddress");
  userAddress.innerHTML = user.email;
  
  let profilImage = document.querySelector("#profilImage");
  profilImage.innerHTML = "<img src='"+ profilTarget +"' width='100%', height='100%'>";

  MediaWidget();

  fetch(API_URL + "users/", {
    method: "GET",
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
    .then((data) => onUserList(data,"Easy"))
};

const onUserList = (data, difficulty) => {
  let userListPage = `<h5>BEST SCORES</h5>
                      <table class="table table-sm">
                      <th>Username</th>
                      <th>Score</th>`;
  if(data.length<5){
    sz = data.length;
  }else{
    sz = 5;
  }
  if(difficulty=="Easy"){
    data.sort(function compare(a, b) {
      return b.bestScoreEasy - a.bestScoreEasy;
    })
  }else if(difficulty=="Medium"){
    data.sort(function compare(a, b) {
      return b.bestScoreMedium - a.bestScoreMedium;
    })
  }else{
    data.sort(function compare(a, b) {
      return b.bestScoreHard - a.bestScoreHard;
    })
  }
  let bestScoreUser;
  for(let i = 0; i< sz; i++){
    if(difficulty=="Easy"){
      bestScoreUser = data[i].bestScoreEasy;
    }else if(difficulty=="Medium"){
      bestScoreUser = data[i].bestScoreMedium;
    }else{
      bestScoreUser = data[i].bestScoreHard;
    }
    if(i === 0){
      userListPage += '<tr id="first"><td>'+data[i].username+'</td><td>'+bestScoreUser+'</td></tr>';
    } else if(i === 1) {
      userListPage += '<tr id="second"><td>'+data[i].username+'</td><td>'+bestScoreUser+'</td></tr>';
    } else if(i === 2) {
      userListPage += '<tr id="third"><td>'+data[i].username+'</td><td>'+bestScoreUser+'</td></tr>';
    }else{
      userListPage += '<tr><td>'+data[i].username+'</td><td>'+bestScoreUser+'</td></tr>'
    }
  }
  userListPage += "</table>";
  let leaderBoard = document.querySelector("#leaderBoard");
  return (leaderBoard.innerHTML = userListPage);
};

const onGame = (e) => {
  e.preventDefault();
  let Difficulty
  let radios = document.getElementsByName("inlineRadioOptions");
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked){
      Difficulty = radios[i].value;
    }
  }
  localStorage.setItem("Difficulty",Difficulty);
  RedirectUrl("/game");
};

const bestScoreDifficulty = (e) =>{
  let bestScore = document.querySelector("#bestScore");
  let bestscore = 0;
  let Score = document.querySelector("#score");
  if(e.target.myParam === "Easy"){
    if(localStorage.getItem("ScoreEasy") == null){
      Score.innerHTML = "Your Score : 0";
    }else{
      Score.innerHTML = "Your Score : " + localStorage.getItem("ScoreEasy");
    }
    bestscore = user.bestScoreEasy;
    bestScore.innerHTML = "Best Score : " + bestscore;
    fetch(API_URL + "users/", {
      method: "GET",
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
      .then((data) => onUserList(data,"Easy"))
  }else if(e.target.myParam === "Medium"){
    if(localStorage.getItem("ScoreMedium") == null){
      Score.innerHTML = "Your Score : 0";
    }else{
      Score.innerHTML = "Your Score : " + localStorage.getItem("ScoreMedium");
    }
    bestscore = user.bestScoreMedium;
    bestScore.innerHTML = "Best Score : " + bestscore;
    fetch(API_URL + "users/", {
      method: "GET",
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
      .then((data) => onUserList(data,"Medium"))
  }else{
    if(localStorage.getItem("ScoreHard") == null){
      Score.innerHTML = "Your Score : 0";
    }else{
      Score.innerHTML = "Your Score : " + localStorage.getItem("ScoreHard");
    }
    bestscore = user.bestScoreHard;
    bestScore.innerHTML = "Best Score : " + bestscore;
    fetch(API_URL + "users/", {
      method: "GET",
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
      .then((data) => onUserList(data,"Hard"))
  } 
}

export default HomePage;