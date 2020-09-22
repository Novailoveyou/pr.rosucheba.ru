const btnAskQuestion = document.getElementById('section-ask-questions');
const moduleQuestions = document.getElementById('module-questions');
const body = document.getElementById('body');
const moduleQuestionTextarea = document.getElementById('js-text-input-ask-anything');

const sectionAskQuestionsInner = document.getElementById('section-ask-questions__inner');

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

// Module Ask Question -> Step Success -> Submit
const moduleBtnSubmit = document.getElementById('module_questions-submit-btn');

// Ask question clicked
btnAskQuestion.addEventListener('click', (e) =>{

  btnAskQuestion.classList.add('hidden');
  moduleQuestions.classList.remove('hidden');
  moduleStepOne.classList.remove('hidden');
  body.classList.add('dark-overlay');
  moduleQuestionTextarea.focus();

  // Telegram clicked
  telegramBtn.addEventListener('click', (e) =>{

    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'Telegram';

    // Telegram -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Telegram / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Telegram -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Telegram / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) =>{
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) =>{
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  // Whatsapp clicked
  whatsappBtn.addEventListener('click', (e) =>{
    
    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'Whats App';

    // Whatsapp -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Whatsapp / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Whatsapp -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Whatsapp / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) =>{
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) =>{
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })


  viberBtn.addEventListener('click', (e) =>{
    
    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'Viber';

    // Viber -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Viber / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Viber -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Viber / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) =>{
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) =>{
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  vkBtn.addEventListener('click', (e) =>{
    
    moduleStepOne.classList.add('hidden');
    moduleStepTwo.classList.remove('hidden');
    moduleStepTwoTitle.innerHTML = 'VK';

    // VK -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'VK / Позвонить'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // VK -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'VK / Написать'
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) =>{
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    })

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) =>{
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  // Phone button clicked
  phoneBtn.addEventListener('click', (e) =>{
    
    moduleStepOne.classList.add('hidden');
    moduleStepThree.classList.remove('hidden');
    moduleStepThreeTitle.innerHTML = 'Позвонить'
    moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер'

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) =>{
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    })

    e.preventDefault();
  })

  // Email button clicked
  emailBtn.addEventListener('click', (e) =>{
    
    moduleStepOne.classList.add('hidden');
    moduleStepThree.classList.remove('hidden');
    moduleStepThreeTitle.innerHTML = 'Написать'
    moduleLabelEnterContactInfo.innerHTML = 'Напишите свой e-mail'

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) =>{
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');

      e.preventDefault();
    })

    e.preventDefault();
  })

  // Submit btn clicked
  moduleBtnSubmit.addEventListener('click', (e) => {

    moduleStepThree.classList.add('hidden');
    moduleStepTwo.classList.add('hidden');
    moduleStepOne.classList.add('hidden');
    moduleStepSuccess.classList.remove('hidden');

    setTimeout(() => {
      moduleStepSuccess.classList.add('hidden');
      btnAskQuestion.classList.remove('hidden');
      sectionAskQuestionsInner.innerHTML = 'Спасибо! Вы с вами свяжемся!'
      moduleQuestions.classList.add('hidden');
      // moduleStepOne.classList.add('hidden');
      body.classList.remove('dark-overlay');
    }, 3000);

    e.preventDefault();
  })

  e.preventDefault();
})