import { RedirectUrl } from "./Router.js";
import videoDemo from "../videos/Demo.mp4";

let home = `<div id="explication"></div>
<div id="video"></div>
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
  

  const myVideo = `<video width="375" height="280" controls loop>
        <source src="${videoDemo}" type="video/mp4"/>
        Votre navigateur ne supporte pas les fichiers video.
     </video>`;   

const video = document.querySelector("#video");
video.innerHTML += myVideo;

let gameForm = document.querySelector("form");
gameForm.addEventListener("submit", onGame);
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


export default HomePage;
