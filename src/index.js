import { setLayout } from "./utils/render.js";
import HomePage from "./Components/HomePage.js";
import {Router} from "./Components/Router.js";
import logo from "./images/logo_js.png"; 
/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

const HEADER_TITLE = "Aim-Lab";
const HEADER_PICTURE = " <img id='headerLogo' src= " + logo +"  >";
const PAGE_TITLE = "Demo : use of webpack as a module bundler";
const FOOTER_SUPPORT_TEXT = "Support contact : jeremy.barras@student.vinci.be";
const FOOTER_CREATE_BY_TEXT = "Create by : Group 11 of IPL Student";
 

Router();

setLayout(HEADER_TITLE, HEADER_PICTURE, PAGE_TITLE, FOOTER_SUPPORT_TEXT, FOOTER_CREATE_BY_TEXT);
//(headerTitle, headerPicture, pageTitle, footerSupportText, footerCreateByText)