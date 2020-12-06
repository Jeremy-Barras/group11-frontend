import { RedirectUrl } from "./Router.js";
import anime from 'animejs';
import cibleImage from "../images/Cible.png";
// destructuring assignment
  let game = `
  <div id="GameFunction">
    <div class="score">
        <div id="BestScore"></div>
        <div id="score"></div>
    </div>
    <div id="timer"></div>
    <div class="button">
        <button type="button" id="Replay" class="btn btn-primary">Replay</button>
        <button type="button" id="Stop" class="btn btn-danger">Stop</button>
    </div>
  </div>
  <div id="zoneGame"></div>`;

const GamePage = () => {
    let Difficulty = localStorage.getItem("Difficulty");
    let Game = document.querySelector("#page");
    Game.innerHTML = game
    let zoneGame = document.getElementById("zoneGame");
    let divScore = document.getElementById("score");
    let divBestScore = document.getElementById("BestScore");
    let divTimer = document.getElementById("timer");
    let buttonReplay = document.getElementById("Replay");
    let buttonStop = document.getElementById("Stop");
    let cible;
    let timerCible;
    let minute = 1;
    let seconde = 0;
    divTimer.innerHTML = minute + " : " + seconde+0;
    let score = 0;
    let BestScore = 0;
    if(Difficulty === "Easy"){
        if(localStorage.getItem("BestScoreEasy") != null){
            BestScore = localStorage.getItem("BestScoreEasy");
        }
    } else if(Difficulty === "Medium") {
        if(localStorage.getItem("BestScoreMedium") != null){
            BestScore = localStorage.getItem("BestScoreMedium");
        }
    } else {
        if(localStorage.getItem("BestScoreHard") != null){
            BestScore = localStorage.getItem("BestScoreHard");
        }
    }
    divBestScore.innerHTML = "BestScore : " + BestScore;
    divScore.innerHTML = "Score : " + score;
    let play = false;
    
    console.log("..Dificulty :" + Difficulty);
    let dureeAnim = 0;
    let dureeCible = 0;
    if(Difficulty == "Easy"){
        dureeAnim = 2000;
        dureeCible = 2000;
    }else if(Difficulty == "Medium"){
        dureeAnim = 1500;
        dureeCible = 1000;
    }else{
        dureeAnim = 1000;
        dureeCible = 500;
    }

    let timerGame = setTimeout(() => {  
    timer()
    }, 1000);

    createCible();

    let animation = anime({
    //here you specify your targeted element through CSS selector syntax
    targets: ".anim", //anim,
    translateX: "250",
    //duration in ms to make one iteration
    duration: dureeAnim,
    //number of iterations or true for indefinitely
    loop: true,
    //don't start automatically the animation
    autoplay: false,
    easing: "linear",
    direction: "alternate",
    });

    afficherCible();

    function timer(){
    if(minute == 1){
        minute = 0;
        seconde = 59;
        divTimer.innerHTML = minute + " : " + seconde;
    }else{
        seconde --;
        divTimer.innerHTML = minute + " : " + seconde;
    }
    if(seconde == 0){
        clearTimeout(timerGame);
        clearTimeout(timerCible);
        cible.src ="";
        divTimer.innerHTML = "FIN";
        if(Difficulty === "Easy"){
            if(score>BestScore){
                localStorage.setItem("BestScoreEasy",score);
            }
        } else if(Difficulty === "Medium") {
            if(score>BestScore){
                localStorage.setItem("BestScoreMedium",score);
            }
        } else {
            if(score>BestScore){
                localStorage.setItem("BestScoreHard",score);
            }
        }
        localStorage.setItem("Score",score);
        RedirectUrl("/");
    }else{
        timerGame = setTimeout(() => {  
        timer()
        }, 1000);
    }
    };

    function createCible(){
    cible = document.createElement("img");
    cible.src = cibleImage;
    cible.setAttribute("onmousedown","return false");
    cible.setAttribute("class","cible anim");
    zoneGame.appendChild(cible);
    };

    function afficherCible(){
    let zoneWidth = zoneGame.offsetWidth;
    let zoneHeight = zoneGame.offsetHeight;
    console.log("..ZoneWidth"+zoneWidth);
    console.log("..ZoneHeight"+zoneHeight);
    clearTimeout(timerCible);
    let random = Math.floor(Math.random() * 10);
    console.log("..RANDOM"+random);
    if(random == 8 || random == 9){
        animation.play();
        play=true;
        cible.setAttribute("style","position:relative;left:"+Math.floor(Math.random() * (zoneWidth-cible.offsetWidth-250))+"px;top:"+Math.floor(Math.random() * (zoneHeight-cible.offsetHeight))+"px;");
    } else {
        animation.pause();
        play=false;
        cible.setAttribute("style","position:relative;left:"+Math.floor(Math.random() * (zoneWidth-cible.offsetWidth))+"px;top:"+Math.floor(Math.random() * (zoneHeight-cible.offsetHeight))+"px;");
    }
    timerCible = setTimeout(() => {  afficherCible() }, dureeCible);
    };

    cible.addEventListener("click", () =>{
        clearTimeout(timerCible);
        if(play){
            score +=15;
        }else{
            score +=10;
        }
        divScore.innerHTML = "Score : " + score;
        afficherCible();
    });

    buttonReplay.addEventListener("click", () =>{
        console.log("..REPLAY")
        document.location.reload();
    });

    buttonStop.addEventListener("click", () =>{
        console.log("..STOP")
        clearTimeout(timerGame);
        clearTimeout(timerCible);
        cible.src ="";
        divTimer.innerHTML = "FIN";
        RedirectUrl("/");
    });
};

export default GamePage;
