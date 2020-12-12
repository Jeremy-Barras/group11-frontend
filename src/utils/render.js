/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerPicture} headerPicture
 * @param {footerSound} footerSound
 * @param {pageTitle} pageTitle
 * @param {footerText} footerText
 * @param {cookiesConsent} cookiesConsent
 * @param {cinematicVideo} cinematicVideo
 */
function setLayout(headerPicture, footerSound, pageTitle, footerText, cookiesConsent, cinematicVideo) {
  document.querySelector("#headerPicture").innerHTML = headerPicture; 
  document.querySelector("#footerSound").innerHTML = footerSound; 

  document.querySelector("title").innerText = pageTitle;
  
  document.querySelector("#footerText").innerText = footerText;

  document.querySelector("#cookiesConsent").innerHTML = cookiesConsent;
  document.querySelector("#cinematicVideo").innerHTML = cinematicVideo;
}


// named export
export {setLayout};