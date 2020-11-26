

/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerTitle} headerTitle
 * @param {pageTitle} pageTitle
 * @param {footerText} footerText
 */
function setLayout(headerTitle, headerPicture,pageTitle, footerSupportText, footerCreateByText) {
  document.querySelector("#headerTitle").innerText = headerTitle;
  document.querySelector("#headerPicture").innerHTML = headerPicture; 

  document.querySelector("title").innerText = pageTitle;
  document.querySelector("#pageTitle").innerText = pageTitle;
  
  document.querySelector("#footerSupportText").innerText = footerSupportText;
  document.querySelector("#footerCreateByText").innerText = footerCreateByText;
}
// named export
export {setLayout};