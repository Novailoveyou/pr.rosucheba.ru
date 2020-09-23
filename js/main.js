const btnAskQuestion = document.getElementById('section-ask-questions');
const moduleQuestions = document.getElementById('module-questions');
const moduleQuestionTextarea = document.getElementById('js-text-input-ask-anything');

const sectionAskQuestionsInner = document.getElementById('section-ask-questions__inner');

const oneMoreQuestionText = document.getElementById('one-more-question');

const moduleHorizontalCloseBtn = document.getElementById('js-btn-horizontal-line-close');

const menuToggler = document.getElementById('menu-toggle');

const inputSelectChooseUni = document.getElementById('input-select-choose-uni');

const inputSelectChooseUniInnerText = document.getElementById('input-select-choose-uni-inner-text');

const inputSelectChooseProgramm = document.getElementById('input-select-choose-programm');

const inputSelectChooseProgrammInnerText = document.getElementById('input-select-choose-programm-inner-text');

const inputSelectChooseUniDropdown = document.getElementById('input-select-choose-uni-dropdown');

const inputSelectChooseProgrammDropdown = document.getElementById('input-select-choose-programm-dropdown');

const dropDownUniItems = document.querySelectorAll('.input-select-choose-uni-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item');

const dropDownUniItemsP = document.querySelectorAll('.input-select-choose-uni-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p');

const dropDownProgrammItems = document.querySelectorAll('.input-select-choose-programm-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item');

const dropDownProgrammItemsP = document.querySelectorAll('.input-select-choose-programm-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p');

const navItemLinks = document.querySelectorAll('.nav-item__link');
const navItemLinksArr = Array.from(navItemLinks);

navItemLinks.forEach(item => {
  item.addEventListener('click', function closeMobileMenu(e) {
    setTimeout(() => {
      menuToggler.checked = false;
    }, 300);

    e.preventDefault()
  })
})
// menuToggler

// Module Ask Question -> Steps
const moduleStepOne = document.getElementById('module-questions__step-one');
const moduleStepTwo = document.getElementById('module-questions__step-two');
const moduleStepThree = document.getElementById('module-questions__step-three');
const moduleStepSuccess = document.getElementById('module-questions__step-success');

// Module Ask Question -> Step 1 -> SM Buttons
const telegramBtn = document.getElementById('sm-icons__link--telegram');
const whatsappBtn = document.getElementById('sm-icons__link--whatsapp');
const viberBtn = document.getElementById('sm-icons__link--viber');
const vkBtn = document.getElementById('sm-icons__link--vk');
const phoneBtn = document.getElementById('sm-icons__link--phone');
const emailBtn = document.getElementById('sm-icons__link--email');

// Module Ask Question -> Step 2 -> Btns
const moduleBtnCall = document.getElementById('question-module__radio-call');
const moduleBtnMessage = document.getElementById('question-module__radio-message');

// Module Ask Question -> Step 2, Step 3 -> Titles
const moduleStepTwoTitle = document.getElementById('module-step-two-title');
const moduleStepThreeTitle = document.getElementById('module-step-three-title');

// Module Ask Question -> Step 2, Step 3 -> Arrows Back
const moduleStepTwoArrowBack = document.getElementById('step-two-arrow-step-back');
const moduleStepThreeArrowBack = document.getElementById('step-three-arrow-step-back');

// Module Ask Question -> Step 3 -> Contact input
const moduleLabelEnterContactInfo = document.getElementById('module-label-enter-contact-info');
const moduleInputContactInfo = document.getElementById('module-input-contact-info');

// Module Ask Question -> Step Success -> Submit
const moduleBtnSubmit = document.getElementById('module_questions-submit-btn');

const carouselBtnLeft = document.getElementById('carrousel-arrow-left-btn');
const carouselBtnRight = document.getElementById('carrousel-arrow-right-btn');

const carouselImgGroupOne = document.getElementById('content__img-group--1');
const carouselImgGroupTwo = document.getElementById('content__img-group--2');
const carouselImgGroupThree = document.getElementById('content__img-group--3');

// Select Dropdown Uni
inputSelectChooseUni.addEventListener('click', (e) => {

  inputSelectChooseUniDropdown.classList.toggle('show-dropdown');

  document.body.addEventListener('click', function closeInputUniDropDown(e) {
    if (
      inputSelectChooseUniDropdown.classList.contains('show-dropdown') &&
      !inputSelectChooseUniDropdown.contains(e.target) &&
      e.target !== inputSelectChooseUniDropdown &&
      !inputSelectChooseUni.contains(e.target) &&
      e.target !== inputSelectChooseUni) {
      // Close question module
      inputSelectChooseUniDropdown.classList.toggle('show-dropdown');
      document.body.removeEventListener('click', closeInputUniDropDown);
    }
  });



  e.preventDefault();
})

// Dropdown Uni
inputSelectChooseUniDropdown.addEventListener('click', (e) => {

  // Convert Dropdown Uni items into an array
  const dropDownUniItemsArr = Array.from(dropDownUniItems);
  const dropDownUniItemsArrP = Array.from(dropDownUniItemsP);

  // Change the inner text of the select to the selected text
  inputSelectChooseUniInnerText.innerText = e.target.innerText;

  // Add the color to the selected text in the input
  inputSelectChooseUniInnerText.classList.add('text-highlight--color');

  // Add the color to the selected text in the dropdown and clean the colors from other elements
  dropDownUniItemsArr.forEach(item => {
    item.classList.remove('text-highlight--color');
  });
  dropDownUniItemsArrP.forEach(item => {
    item.classList.remove('text-highlight--color');
  });
  e.target.classList.add('text-highlight--color');

  // On select hide the module
  inputSelectChooseUniDropdown.classList.toggle('show-dropdown');

  e.preventDefault()
})

// Select Dropdown Programm
inputSelectChooseProgramm.addEventListener('click', (e) => {

  inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');

  document.body.addEventListener('click', function closeInputProgrammDropDown(e) {
    if (
      inputSelectChooseProgrammDropdown.classList.contains('show-dropdown') &&
      !inputSelectChooseProgrammDropdown.contains(e.target) &&
      e.target !== inputSelectChooseProgrammDropdown &&
      !inputSelectChooseProgramm.contains(e.target) &&
      e.target !== inputSelectChooseProgramm) {
      // Close question module
      inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');
      document.body.removeEventListener('click', closeInputProgrammDropDown);
    }
  });

  e.preventDefault();
})

// Dropdown Programm
inputSelectChooseProgrammDropdown.addEventListener('click', (e) => {

  const dropDownProgrammItemsArr = Array.from(dropDownProgrammItems);
  const dropDownProgrammItemsArrP = Array.from(dropDownProgrammItemsP);

  inputSelectChooseProgrammInnerText.innerText = e.target.innerText;
  inputSelectChooseProgrammInnerText.classList.add('text-highlight--color');

  dropDownProgrammItemsArr.forEach(item => {
    item.classList.remove('text-highlight--color');
  });
  dropDownProgrammItemsArrP.forEach(item => {
    item.classList.remove('text-highlight--color');
  });
  e.target.classList.add('text-highlight--color');

  inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');

  e.preventDefault()
})

// Ask question clicked
btnAskQuestion.addEventListener('click', (e) => {

  btnAskQuestion.classList.add('hidden');
  moduleQuestions.classList.remove('hidden');
  moduleStepOne.classList.remove('hidden');
  document.body.classList.add('dark-overlay');
  moduleQuestionTextarea.focus();

  document.body.addEventListener('click', function closeQuestionModule(e) {
    // moduleHorizontalCloseBtn
    if (
      (!btnAskQuestion.contains(e.target) &&
        e.target !== btnAskQuestion &&
        !moduleQuestions.contains(e.target) &&
        e.target !== moduleQuestions) ||
      (e.target === btnAskQuestion &&
        btnAskQuestion.contains(e.target))
    ) {
      // Close question module
      btnAskQuestion.classList.remove('hidden');
      moduleQuestions.classList.add('hidden');
      moduleStepOne.classList.add('hidden');
      document.body.classList.remove('dark-overlay');
      document.body.removeEventListener('click', closeQuestionModule);
    }

    e.preventDefault();
  })

  // Telegram clicked
  telegramBtn.addEventListener('click', (e) => {

    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'Telegram';

    // Telegram -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Telegram / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Telegram -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Telegram / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  // Whatsapp clicked
  whatsappBtn.addEventListener('click', (e) => {

    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'Whats App';

    // Whatsapp -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Whatsapp / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Whatsapp -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Whatsapp / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })


  viberBtn.addEventListener('click', (e) => {

    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'Viber';

    // Viber -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Viber / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Viber -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Viber / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  vkBtn.addEventListener('click', (e) => {

    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'VK';

    // VK -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'VK / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // VK -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'VK / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  // Phone button clicked
  phoneBtn.addEventListener('click', (e) => {

    moduleStepOne.classList.add('hidden');
    moduleStepThree.classList.remove('hidden');
    moduleStepThreeTitle.innerHTML = 'Позвонить'
    moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'
    moduleInputContactInfo.focus();

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  // Email button clicked
  emailBtn.addEventListener('click', (e) => {

    moduleStepOne.classList.add('hidden');
    moduleStepThree.classList.remove('hidden');
    moduleStepThreeTitle.innerHTML = 'Написать'
    moduleLabelEnterContactInfo.innerHTML = 'Напишите свой e-mail'
    moduleInputContactInfo.placeholder = 'example@gmail.com';
    moduleInputContactInfo.focus();

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');

      e.preventDefault();
    })

    e.preventDefault();
  })

  // Submit btn clicked
  moduleBtnSubmit.addEventListener('click', function submitQuestionModule(e) {

    moduleStepThree.classList.add('hidden');
    moduleStepTwo.classList.add('hidden');
    moduleStepOne.classList.add('hidden');
    moduleStepSuccess.classList.remove('hidden');

    setTimeout(() => {
      moduleStepSuccess.classList.add('hidden');
      btnAskQuestion.classList.remove('hidden');

      // console.log(sectionAskQuestionsInner.innerHTM);
      oneMoreQuestionText.innerText = 'ещё один';
      const sectionAskQuestionInnerSaver = sectionAskQuestionsInner.innerHTML;
      // console.log(sectionAskQuestionInnerSaver);
      sectionAskQuestionsInner.innerHTML = 'Спасибо! Мы с вами свяжемся!'
      setTimeout(() => {
        sectionAskQuestionsInner.innerHTML = sectionAskQuestionInnerSaver;
      }, 3000);

      moduleQuestions.classList.add('hidden');
      document.body.classList.remove('dark-overlay');
      document.body.removeEventListener('click', closeQuestionModule);
      moduleBtnSubmit.removeEventListener('click', submitQuestionModule);
    }, 3000);

    e.preventDefault();
  })

  e.preventDefault();
})

// Carousel
const carouselItems = [carouselImgGroupOne, carouselImgGroupTwo, carouselImgGroupThree];

// Terrible solution for carousel, it works tho
let i = 0;
carouselBtnRight.addEventListener('click', (e) => {
  i > 2 ? i = 0 : i;
  i < 0 ? i = 2 : i;

  carouselItems[i].classList.add('hidden');
  carouselItems[i + 1 > 2 ? 0 : i + 1].classList.remove('hidden');
  carouselItems[i - 1 < 0 ? 2 : i - 1].classList.add('hidden');

  i++;

  e.preventDefault();
});

// Don't look below
carouselBtnLeft.addEventListener('click', (e) => {
  i < 0 ? i = 2 : i;
  i > 2 ? i = 0 : i;
  carouselItems[i].classList.add('hidden');
  carouselItems[i + 1 > 2 ? 0 : i + 1].classList.add('hidden');
  carouselItems[i - 1 < 0 ? 2 : i - 1].classList.remove('hidden');
  i--;

  e.preventDefault();
});