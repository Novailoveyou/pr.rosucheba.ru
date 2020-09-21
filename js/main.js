const btnAskQuestion = document.getElementById('section-ask-questions');
module-questions__step-one
module-questions__step-two
module-questions__step-three
module-questions__step-success

const PageState = function () {
  let currentState = new homeState(this);

  this.init = function () {
    this.change(new homeState());
  };

  this.change = function (state) {
    currentState = state;
  };
};

// Home State
const homeState = function (page) {
  btnAskQuestion.id = 'module-questions';
  btnAskQuestion.innerHTML = `
    some html
  `;
};

// About State
const homeState = function (page) {
  btnAskQuestion.id = 'module-questions';
  btnAskQuestion.innerHTML = `
    some html
  `;
};

// Instantiate pageState
const page = new PageState();

// Init the first state
page.init();

// Home
home.addEventListener('click', (e) => {
  page.change(new homeState());

  e.preventDefault();
});

// About
about.addEventListener('click', (e) => {
  page.change(new aboutState());

  e.preventDefault();
});

// Work
work.addEventListener('click', (e) => {
  page.change(new workState());

  e.preventDefault();
});

// Contact
contact.addEventListener('click', (e) => {
  page.change(new contactState());

  e.preventDefault();
});

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

btnAskQuestion.addEventListener('click', () =>{
  
})