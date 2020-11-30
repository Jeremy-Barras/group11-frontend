import anime from 'animejs';
import cibleImage from "../images/Cible.png";
// destructuring assignment
  let game = `<div id="score"></div>
  <div id="timer"></div>
  <div id="zoneGame"></div>`;

const GamePage = () => {
    let Game = document.querySelector("#page");
    Game.innerHTML = game
    let zoneGame = document.getElementById("zoneGame");
    let divScore = document.getElementById("score");
    let divTimer = document.getElementById("timer");
    let cible;
    let timerCible;
    let minute = 1;
    let seconde = 0;
    divTimer.innerHTML = minute + " : " + seconde+0;
    let score = 0;
    divScore.innerHTML = "Score : " + score;
    let play = false;

    let timerGame = setTimeout(() => {  
    timer()
    }, 1000);

    createCible();

    let animation = anime({
    //here you specify your targeted element through CSS selector syntax
    targets: ".anim", //anim,
    translateX: "250",
    //duration in ms to make one iteration
    duration: 2000,
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
    timerCible = setTimeout(() => {  afficherCible() }, 2000);
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
};

export default GamePage;
