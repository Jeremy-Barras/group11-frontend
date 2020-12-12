import { setLayout } from "./utils/render.js";
import {Router, RedirectUrl} from "./Components/Router.js";
import logo from "./images/logojs.png"; 
import soundOn from "./images/soundOn.png";
import soundOff from "./images/soundOff.png";
import music from "./musique/musique.mp3";
import background from "./images/cinematic.png";
import cinematic from "./videos/cinematic.mp4";
import CookiesConsent from "./Components/CookiesConsent.js"



/* use webpack style & css loader*/
import "./stylesheets/style.css";
import "./stylesheets/cookies-consent.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

let imageSon = true; 
let divLogoSon = document.getElementById("footerSound"); 
divLogoSon.addEventListener("click", () => {
    if(imageSon === true) {
        imageSon = false; 
        divLogoSon.innerHTML = "<img id='footerSoundLogo' src="+ soundOn +">";
        playAudio(); 
    }else{
        imageSon = true; 
        divLogoSon.innerHTML = "<img id='footerSoundLogo' src="+ soundOff +">"; 
        pauseAudio(); 
    }
});

const myPlayer = `<audio  id="audioPlayer" loop>
        <source 
            src="${music}"
            type="audio/mpeg"
        />
        Votre navigateur ne supporte pas les fichiers audio.
     </audio>`;   

const main = document.querySelector("main");
main.innerHTML += myPlayer;

var x = document.getElementById("audioPlayer"); 
function playAudio(){
    x.play(); 
}

function pauseAudio(){
    x.pause(); 
}

CookiesConsent();

const HEADER_PICTURE = "<a href='/home'><img id='headerLogo' src= " + logo +"  ></a>";
const FOOTER_SOUND = "<img id='footerSoundLogo' src="+ soundOff +">"; 
const PAGE_TITLE = "AIM-LAB";
const FOOTER_TEXT = "© All right reserved. Created by Group 11 students of IPL VINCI School.";
const CINEMATIC_VIDEO = `<video playsinline autoplay muted loop poster="${background}" id="cinematic">
<source src="${cinematic}" type="video/mp4">
</video>`;

Router();

setLayout(HEADER_PICTURE, FOOTER_SOUND, PAGE_TITLE, FOOTER_TEXT, CINEMATIC_VIDEO);
