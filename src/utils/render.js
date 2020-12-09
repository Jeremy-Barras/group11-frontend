/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerPicture} headerPicture
 * @param {footerSound} footerSound
 * @param {pageTitle} pageTitle
 * @param {footerSupportText} footerSupportText
 * @param {footerCreateByText} footerCreateByText
 */
function setLayout(headerPicture, footerSound, pageTitle, footerSupportText, footerCreateByText) {
  document.querySelector("#headerPicture").innerHTML = headerPicture; 
  document.querySelector("#footerSound").innerHTML = footerSound; 

  document.querySelector("title").innerText = pageTitle;
  
  document.querySelector("#footerSupportText").innerText = footerSupportText;
  document.querySelector("#footerCreateByText").innerText = footerCreateByText;
}
// named export
export {setLayout};