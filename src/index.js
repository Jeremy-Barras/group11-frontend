import { setLayout } from "./utils/render.js";
import HomePage from "./Components/HomePage.js";
import {Router} from "./Components/Router.js";
import logo from "./images/logojs.png"; 
import soundOn from "./images/soundOn.png";
//import soundOff from "./images/soundOff.png";

/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

const HEADER_PICTURE = " <img id='headerLogo' src= " + logo +"  >";
const HEADER_SOUND = "<img id='headerSoundLogo' src="+soundOn+">"; 
const PAGE_TITLE = "Demo : use of webpack as a module bundler";
const FOOTER_SUPPORT_TEXT = "Support contact : jeremy.barras@student.vinci.be";
const FOOTER_CREATE_BY_TEXT = "Create by : Group 11 of IPL Student";
 

Router();

setLayout(HEADER_PICTURE, HEADER_SOUND, PAGE_TITLE, FOOTER_SUPPORT_TEXT, FOOTER_CREATE_BY_TEXT);
