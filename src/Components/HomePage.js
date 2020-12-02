let home = `<div id="explication"></div>
<div id="video"></div>
<div id="bestScore"></div>
<form action="/game">
<div class="form-group">
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
    <label class="form-check-label" for="inlineRadio1">Easy</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
    <label class="form-check-label" for="inlineRadio2">Medium</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
    <label class="form-check-label" for="inlineRadio3">Hard</label>
  </div>
</div>
<button type="submit" class="btn btn-primary">PLAY</button>
</form>`;

const HomePage = () => {  
  let page = document.querySelector("#page");
  page.innerHTML = home;  
  let loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", onLogin);
};

const onLogin = (e) => {
  //e.preventDefault();
  console.log("YO");

};


export default HomePage;
