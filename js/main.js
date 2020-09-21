const btnAskQuestion = document.getElementById('section-ask-questions');
const moduleStepOne = document.getElementById('module-questions__step-one');
const moduleStepTwo = document.getElementById('module-questions__step-two');
const moduleStepThree = document.getElementById('module-questions__step-three');
const moduleStepSuccess = document.getElementById('module-questions__step-success');

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
const moduleStepOneState = function (page) {
  btnAskQuestion.id = 'module-questions';
  btnAskQuestion.innerHTML = `
    some html
  `;
};

// About State
const moduleStepTwoState = function (page) {
  btnAskQuestion.id = 'module-questions';
  btnAskQuestion.innerHTML = `
    some html
  `;
};

const moduleStepThreeState = function (page) {
  btnAskQuestion.id = 'module-questions';
  btnAskQuestion.innerHTML = `
    some html
  `;
};

const moduleStepSuccessState = function (page) {
  btnAskQuestion.id = 'module-questions';
  btnAskQuestion.innerHTML = `
    some html
  `;
};

// Instantiate pageState
const page = new PageState();

// Home
moduleStepOne.addEventListener('click', (e) => {
  page.change(new homeState());

  e.preventDefault();
});

// About
moduleStepTwo.addEventListener('click', (e) => {
  page.change(new aboutState());

  e.preventDefault();
});

// Work
moduleStepThree.addEventListener('click', (e) => {
  page.change(new workState());

  e.preventDefault();
});

// Contact
moduleStepSuccess.addEventListener('click', (e) => {
  page.change(new contactState());

  e.preventDefault();
});

// Init On DOM Load

btnAskQuestion.addEventListener('click', () =>{
  
})