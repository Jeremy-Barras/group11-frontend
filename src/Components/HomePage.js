import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

let home = `
<div id="bestScore"></div>
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
</form>`;

const HomePage = () => {  
  let page = document.querySelector("#page");
  page.innerHTML = home;  
  let bestScore = document.querySelector("#bestScore");
  bestScore.innerHTML = "Best Score : " + localStorage.getItem("BestScoreEasy");

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

  const user = getUserSessionData();
  if (!user) {
    RedirectUrl("/");
  }

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
  let score = 0;
  if(e.target.myParam === "Easy"){
    if(localStorage.getItem("BestScoreEasy") != null){
      score = localStorage.getItem("BestScoreEasy");
    }
    bestScore.innerHTML = "Best Score : " + score;
  }else if(e.target.myParam === "Medium"){
    if(localStorage.getItem("BestScoreMedium") != null){
      score = localStorage.getItem("BestScoreMedium");
    }
    bestScore.innerHTML = "Best Score : " + score;
  }else{
    if(localStorage.getItem("BestScoreHard") != null){
      score = localStorage.getItem("BestScoreHard");
    }
    bestScore.innerHTML = "Best Score : " + score;
  }
  
 
}


export default HomePage;
