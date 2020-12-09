import { setLayout } from "./utils/render.js";
import {Router} from "./Components/Router.js";
import logo from "./images/logojs.png"; 
import soundOn from "./images/soundOn.png";
import soundOff from "./images/soundOff.png";
import music from "./musique/musique.mp3";



/* use webpack style & css loader*/
import "./stylesheets/style.css";
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
        console.log(myPlayer);
        playAudio(); 
    }else{
        imageSon = true; 
        divLogoSon.innerHTML = "<img id='footerSoundLogo' src="+ soundOff +">"; 
        pauseAudio(); 
    }
    console.log(imageSon)
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

const HEADER_PICTURE = "<a href='/home'><img id='headerLogo' src= " + logo +"  ></a>";
const FOOTER_SOUND = "<img id='footerSoundLogo' src="+ soundOff +">"; 
const PAGE_TITLE = "AIM-LAB";
const FOOTER_SUPPORT_TEXT = "Support contact : jeremy.barras@student.vinci.be";
const FOOTER_CREATE_BY_TEXT = "Create by : Group 11 of IPL Student";

Router();

setLayout(HEADER_PICTURE, FOOTER_SOUND, PAGE_TITLE, FOOTER_SUPPORT_TEXT, FOOTER_CREATE_BY_TEXT);
