import { setLayout } from "./utils/render.js";
import {Router} from "./Components/Router.js";
import logo from "./images/logojs.png"; 
import soundOn from "./images/soundOn.png";
import soundOff from "./images/soundOff.png";

/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

let imageSon = true; 

let divLogoSon = document.getElementById("headerSound"); 
divLogoSon.addEventListener("click", () => {
    if(imageSon === true) {
        imageSon = false; 
        divLogoSon.innerHTML = "<img id='headerSoundLogo' src="+ soundOff +">"; 
    }else{
        imageSon = true; 
        divLogoSon.innerHTML = "<img id='headerSoundLogo' src="+ soundOn +">"; 
    }
    console.log(imageSon)
});

     
const HEADER_PICTURE = "<a href='/'><img id='headerLogo' src= " + logo +"  ></a>";
const HEADER_SOUND = "<img id='headerSoundLogo' src="+ soundOn +">"; 
const PAGE_TITLE = "AIM-LAB";
const FOOTER_SUPPORT_TEXT = "Support contact : jeremy.barras@student.vinci.be";
const FOOTER_CREATE_BY_TEXT = "Create by : Group 11 of IPL Student";

Router();

setLayout(HEADER_PICTURE, HEADER_SOUND, PAGE_TITLE, FOOTER_SUPPORT_TEXT, FOOTER_CREATE_BY_TEXT);
