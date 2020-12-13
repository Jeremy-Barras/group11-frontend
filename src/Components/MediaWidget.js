import facebookLogo from "../images/facebook.png";
import instagramLogo from "../images/instagram.png";
import twitterLogo from "../images/twitter.png";
import youtubeLogo from "../images/youtube.png";

let mediaWidget = `
  <div class="formCase col-md-12">
  <div id="formContent">
    <div id="formHeader">
      <p>Follow us :</p>
    </div>
    <div id="formFooter">
      <div class="row socialMedia">
        <div class="col-md-3" id="facebook"></div>
        <div class="col-md-3" id="instagram"></div>
        <div class="col-md-3" id="twitter"></div>
        <div class="col-md-3" id="youtube"></div>
      </div>
    </div>
  </div>
  </div>
  <div class="col-md-12">
    </br><button class="btn btn-danger" id="supportButton" type="button"></button>
  </div>
`;

const MediaWidget = () => {
  
  let page = document.querySelector("#mediaWidget");
  page.innerHTML = mediaWidget;
  
  const myFacebook = `<a href="#"><img src="${facebookLogo}" height="35px"></a>`;

  const myInstagram = `<a href="#"><img src="${instagramLogo}" height="35px"></a>`;

  const myTwitter = `<a href="#"><img src="${twitterLogo}" height="35px"></a>`;

  const myYoutube = `<a href="https://youtu.be/RoFdlsCXdMo"><img src="${youtubeLogo}" height="35px"></a>`;

  const supportBut = `<a href="mailto:jeremy.barras@student.vinci.be">Need help ? Contact support</a>`;

  const facebook = document.querySelector("#facebook");
  facebook.innerHTML = myFacebook;

  const instagram = document.querySelector("#instagram");
  instagram.innerHTML = myInstagram;

  const twitter = document.querySelector("#twitter");
  twitter.innerHTML = myTwitter;

  const youtube = document.querySelector("#youtube");
  youtube.innerHTML = myYoutube;

  const supportButton = document.querySelector("#supportButton");
  supportButton.innerHTML = supportBut;

};

export default MediaWidget;