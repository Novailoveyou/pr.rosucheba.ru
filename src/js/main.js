// import { Materialbox } from 'materialize-css';
import '../scss/main.scss';

// CTA btns
const ctaSubmitBtn = document.getElementById('cta-submit-application');

const btnAskQuestion = document.getElementById('section-ask-questions');
const moduleQuestions = document.getElementById('module-questions');
const moduleQuestionTextarea = document.getElementById(
  'js-text-input-ask-anything'
);

const sectionAskQuestionsInner = document.getElementById('cta-ask-question');

const oneMoreQuestionText = document.getElementById('one-more-question');

const moduleHorizontalCloseBtn = document.getElementById(
  'js-btn-horizontal-line-close'
);

const menuToggler = document.getElementById('menu-toggle');

const inputSelectChooseUni = document.getElementById('input-select-choose-uni');

const inputSelectChooseUniInnerText = document.getElementById(
  'input-select-choose-uni-inner-text'
);

const inputSelectChooseProgramm = document.getElementById(
  'input-select-choose-programm'
);

const inputSelectChooseProgrammInnerText = document.getElementById(
  'input-select-choose-programm-inner-text'
);

const inputSelectChooseUniDropdown = document.getElementById(
  'input-select-choose-uni-dropdown'
);

const inputSelectChooseProgrammDropdown = document.getElementById(
  'input-select-choose-programm-dropdown'
);

const inputSelectChooseProgrammDropdownStepTwo = document.getElementById(
  'input-select-choose-programm-dropdown--step-two'
);

const dropDownUniItems = document.querySelectorAll(
  '.input-select-choose-uni-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item'
);

const dropDownUniItemsP = document.querySelectorAll(
  '.input-select-choose-uni-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p'
);

const dropDownProgrammItems = document.querySelectorAll(
  '.input-select-choose-programm-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item'
);

const dropDownProgrammItemsP = document.querySelectorAll(
  '.input-select-choose-programm-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p'
);

const dropDownProgrammItemsStepTwo = document.querySelectorAll(
  '.input-select-choose-programm-dropdown--step-two .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item'
);

const dropDownProgrammItemsPStepTwo = document.querySelectorAll(
  '.input-select-choose-programm-dropdown--step-two .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p'
);

const selectedItemFromTheFirstStep = document.getElementById(
  'inner-dropdown-items__item--selected'
);

const phoneInputInnerText = document.getElementById('phone-number');

const userInputNameText = document.getElementById('user-name');

const navItemLinks = document.querySelectorAll('.nav-item__link');
const navItemLinksArr = Array.from(navItemLinks);

const dropDownItemUniIcons = document.querySelectorAll(
  '.inner-dropdown-items__item-uni__icon'
);
const dropDownItemUniIconsArr = Array.from(dropDownItemUniIcons);

const dropDownItemProgrammIcons = document.querySelectorAll(
  '.inner-dropdown-items__item-programm__icon'
);
const dropDownItemProgrammIconsArr = Array.from(dropDownItemProgrammIcons);

// Module Ask Question -> Steps
const moduleStepOne = document.getElementById('module-questions__step-one');
const moduleStepTwo = document.getElementById('module-questions__step-two');
const moduleStepThree = document.getElementById('module-questions__step-three');
const moduleStepSuccess = document.getElementById(
  'module-questions__step-success'
);

// Module Ask Question -> Step 1 -> SM Buttons
const telegramBtn = document.getElementById('sm-icons__link--telegram');
const whatsappBtn = document.getElementById('sm-icons__link--whatsapp');
const viberBtn = document.getElementById('sm-icons__link--viber');
const vkBtn = document.getElementById('sm-icons__link--vk');
const phoneBtn = document.getElementById('sm-icons__link--phone');
const emailBtn = document.getElementById('sm-icons__link--email');

// Module Ask Question -> Step 2 -> Btns
const moduleBtnCall = document.getElementById('question-module__radio-call');
const moduleBtnMessage = document.getElementById(
  'question-module__radio-message'
);

// Module Ask Question -> Step 2, Step 3 -> Titles
const moduleStepTwoTitle = document.getElementById('module-step-two-title');
const moduleStepThreeTitle = document.getElementById('module-step-three-title');

// Module Ask Question -> Step 2, Step 3 -> Arrows Back
const moduleStepTwoArrowBack = document.getElementById(
  'step-two-arrow-step-back'
);
const moduleStepThreeArrowBack = document.getElementById(
  'step-three-arrow-step-back'
);

// Module Ask Question -> Step 3 -> Contact input
const moduleLabelEnterContactInfo = document.getElementById(
  'module-label-enter-contact-info'
);
const moduleInputContactInfo = document.getElementById(
  'module-input-contact-info'
);

// Module Ask Question -> Step Success -> Submit
const moduleBtnSubmit = document.getElementById('module_questions-submit-btn');

const carouselBtnLeft = document.getElementById('carrousel-arrow-left-btn');
const carouselBtnRight = document.getElementById('carrousel-arrow-right-btn');

const carouselImgGroupOne = document.getElementById('content__img-group--1');
const carouselImgGroupTwo = document.getElementById('content__img-group--2');
const carouselImgGroupThree = document.getElementById('content__img-group--3');

const svgCheckMark = `<svg
      class="inner-dropdown-items-programm__item__icon"
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.57331 8.62947C3.61787 8.69409 3.67213 8.75362 3.73587 8.80587C4.10173 9.10576 4.64142 9.05228 4.94131 8.68643L10.9143 1.39957C11.2142 1.03371 11.1607 0.494021 10.7948 0.194132C10.429 -0.105757 9.88928 -0.05228 9.58939 0.313576L4.25631 6.81979L1.49654 3.71731C1.18213 3.36385 0.640721 3.3322 0.287266 3.64661C-0.0661882 3.96102 -0.09784 4.50243 0.216571 4.85589L3.57331 8.62947Z"
        fill="#fff"
      />
    </svg>`;

const scrollToTheApplicationBtn = document.getElementById(
  'cta-scroll-to-submit-application'
);

const fillInTheFieldsBelow = document.getElementById('fill-in-fields');

const userNameInput = document.getElementById('container-input--user-name');

const insertAfterLiStepTwo = document.getElementById(
  'js-insert-after--step-two'
);

const numValidation = /^[0-9()-.+ ]+$/;

const locationDependedHeading = document.getElementById(
  'location-depended-heading'
);

const customizedCountryText = document.getElementById('customizedCountryText');

const userDevice = window.navigator.userAgent;

// UTM PARAMS
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const utmSource = urlParams.get('utm_source');
const utmMedium = urlParams.get('utm_medium');
const utmCampaign = urlParams.get('utm_campaign');
const utmContent = urlParams.get('utm_content');
const utmTerm = urlParams.get('utm_term');

// Track IP

// let user_location;
// fetch("https://www.cloudflare.com/cdn-cgi/trace")
//   .then((data) => data.json())
//   .then((data) => {
//     user_location = data;
//     console.log(user_location);
//   });
// let userLocation;

const locationUrlAPI = 'https://ipinfo.io?token=b16e76b622236e';
// const locationUrlAPI = '';
// let locationUrlAPI = 'https://ipapi.co/8.8.8.8/json/';
// let locationUrlAPI = 'http://ip-api.com/json'; // no https
// let locationUrlAPI = 'https://api.ipify.org/?format=json';

let userCity;
let userCountry;
let userCountryCode; // KZ, RU, UZ
fetch((locationUrlAPI))
  .then((data) => data.json())
  .then((data) => {
    // console.log(data);
    userCity = data.city;
    userCountry = data.country;
    userCountryCode = data.country;
    if (userCountry === 'RU') {
      userCountry = 'Russia';
    } else if (userCountry === 'KZ') {
      userCountry = 'Kazakhstan';
    } else if (userCountry == 'UZ') {
      userCountry = 'Uzbekistan';
    }

    // console.log(data);
    // // console.log(locationDependedHeading);
    // // console.log(userCountryCode);
    changeLocationDependedHeading(
      locationDependedHeading,
      'дистанционно в вузах Москвы',
      'дистанционно в вузах Москвы без ЕГЭ и ЕНТ',
      'дистанционно в вузах Москвы без ЕГЭ',
      'дистанционно в вузах Москвы'
    );

    changeCustomizedCountryText(
      '',
      'из Казахстана',
      'из Узбекистана',
      ''
    );

    // Docs steps
    const kzUzEls = document.querySelectorAll('.kz-uz-only');
    const kzUzElsArr = Array.from(kzUzEls);
    const ruEls = document.querySelectorAll('.ru-only');
    const ruElsArr = Array.from(ruEls);
    if (userCountryCode === 'RU') {
      ruElsArr.forEach(el =>{
        el.classList.add('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.remove('show');
      })
    } else if (userCountryCode === 'KZ') {
      ruElsArr.forEach(el =>{
        el.classList.remove('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.show('show');
      })
    } else if (userCountryCode === 'UZ') {
      ruElsArr.forEach(el =>{
        el.classList.remove('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.show('show');
      })
    } else {
      ruElsArr.forEach(el =>{
        el.classList.add('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.remove('show');
      })
    }
    // /Docs needed
  })
  .catch((error) => {
    // `Can't access ${locationUrlAPI} :(`;
    changeLocationDependedHeading(
      locationDependedHeading,
      'дистанционно в вузах Москвы',
      'дистанционно в вузах Москвы без ЕГЭ и ЕНТ',
      'дистанционно в вузах Москвы без ЕГЭ',
      'дистанционно в вузах Москвы'
    );

    changeCustomizedCountryText(
      '',
      'из Казахстана',
      'из Узбекистана',
      ''
    );

    // Docs steps
    const kzUzEls = document.querySelectorAll('.kz-uz-only');
    const kzUzElsArr = Array.from(kzUzEls);
    const ruEls = document.querySelectorAll('.ru-only');
    const ruElsArr = Array.from(ruEls);
    if (userCountryCode === 'RU') {
      ruElsArr.forEach(el =>{
        el.classList.add('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.remove('show');
      })
    } else if (userCountryCode === 'KZ') {
      ruElsArr.forEach(el =>{
        el.classList.remove('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.show('show');
      })
    } else if (userCountryCode === 'UZ') {
      ruElsArr.forEach(el =>{
        el.classList.remove('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.show('show');
      })
    } else {
      ruElsArr.forEach(el =>{
        el.classList.add('show');
      })
      kzUzElsArr.forEach(el =>{
        el.classList.remove('show');
      })
    }
    // /Docs needed

    return;
  });

function changeLocationDependedHeading(
  textBefore = '',
  textAfterRU = '',
  textAfterKZ = '',
  textAfterUZ = '',
  textFallback = ''
) {
  if (userCountryCode === 'RU') {
    textBefore.innerText = textAfterRU;
  } else if (userCountryCode === 'KZ') {
    textBefore.innerText = textAfterKZ;
  } else if (userCountryCode === 'UZ') {
    textBefore.innerText = textAfterUZ;
  } else {
    textBefore.innerText = textFallback;
  }
}

function changeCustomizedCountryText(
  textAfterRU = '',
  textAfterKZ = '',
  textAfterUZ = '',
  textFallback = ''
) {
  if (userCountryCode === 'RU') {
    customizedCountryText.innerText = textAfterRU;
  } else if (userCountryCode === 'KZ') {
    customizedCountryText.innerText = textAfterKZ;
  } else if (userCountryCode === 'UZ') {
    customizedCountryText.innerText = textAfterUZ;
  } else {
    customizedCountryText.innerText = textFallback;
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function dropDownStepTwoInsertItem(text = '') {
  let el;
  el = document.createElement('li');
  el.classList.add('inner-dropdown-items__item');
  el.innerHTML = `
        <p>
          ${svgCheckMark}
          ${text}
        </p>
      `;
  insertAfter(insertAfterLiStepTwo, el);
}

let isSumbitted = false;

// Send to email
async function sumbitData(data) {
  if(isSumbitted === false){
    const res = await fetch('/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await res.json();
    isSumbitted = true;

    // Prevent spamming 
    setTimeout(() => {
      isSumbitted = false;
    }, 5000);

  }else{
    return;
  }
}

// Menu
menuToggler.addEventListener('click', () => {
  if(menuToggler.checked === true){
    btnAskQuestion.classList.add('hidden');
  }else{
    btnAskQuestion.classList.remove('hidden');
  }
})

navItemLinks[0].addEventListener('click', (e) => {
  // window.location = "#about";
  const aboutSection = document.getElementById('about');
  aboutSection.scrollIntoView({
    behavior: 'smooth',
  });
  menuToggler.checked = false;
  e.preventDefault();
});

navItemLinks[1].addEventListener('click', (e) => {
  // window.location = "#partners";
  const partnersSection = document.getElementById('partners');
  partnersSection.scrollIntoView({
    behavior: 'smooth',
  });
  menuToggler.checked = false;
  e.preventDefault();
});

navItemLinks[2].addEventListener('click', (e) => {
  // window.location = "#trusted-by";
  const trustedBySection = document.getElementById('trusted-by');
  trustedBySection.scrollIntoView({
    behavior: 'smooth',
  });
  menuToggler.checked = false;
  e.preventDefault();
});

// Select Dropdown Uni
inputSelectChooseUni.addEventListener('click', (e) => {
  inputSelectChooseUniDropdown.classList.toggle('show-dropdown');

  // window.location = '#input-select-choose-uni';
  if (
    inputSelectChooseUniDropdown.classList.contains('show-dropdown') &&
    document.body.clientWidth < 768
  ) {
    inputSelectChooseUni.scrollIntoView({
      behavior: 'smooth',
    });
  }

  document.body.addEventListener('click', function closeInputUniDropDown(e) {
    if (
      inputSelectChooseUniDropdown.classList.contains('show-dropdown') &&
      !inputSelectChooseUniDropdown.contains(e.target) &&
      e.target !== inputSelectChooseUniDropdown &&
      !inputSelectChooseUni.contains(e.target) &&
      e.target !== inputSelectChooseUni
    ) {
      // Close question module
      inputSelectChooseUniDropdown.classList.toggle('show-dropdown');
      document.body.removeEventListener('click', closeInputUniDropDown);
    }
  });

  e.preventDefault();
});

scrollToTheApplicationBtn.addEventListener('click', (e) => {
  fillInTheFieldsBelow.classList.remove('hidden');

  if (document.body.clientWidth < 768) {
    fillInTheFieldsBelow.scrollIntoView({
      behavior: 'smooth',
    });
  } else {
    const mainHeading = document.getElementById('js-section-heading');
    mainHeading.scrollIntoView({
      behavior: 'smooth',
    });
  }

  setTimeout(() => {
    fillInTheFieldsBelow.classList.add('hidden');
  }, 3000);

  e.preventDefault();
});

// Dropdown Uni
inputSelectChooseUniDropdown.addEventListener('mousedown', (e) => {
  // Convert Dropdown Uni items into an array
  const dropDownUniItemsArr = Array.from(dropDownUniItems);
  const dropDownUniItemsArrP = Array.from(dropDownUniItemsP);

  // Add the color to the selected text in the dropdown and clean the colors from other elements
  dropDownUniItemsArr.forEach((item) => {
    item.classList.remove('text-highlight--color');
  });
  dropDownUniItemsArrP.forEach((item) => {
    item.classList.remove('text-highlight--color');
  });

  // Change the inner text of the select to the selected text
  if (e.target.tagName === 'svg') {
    inputSelectChooseUniInnerText.innerText = e.target.parentElement.innerText;

    if(inputSelectChooseUniInnerText.innerText !== 'Определюсь после консультации'){
      inputSelectChooseUniInnerText.innerText = inputSelectChooseUniInnerText.innerText
      .substring(inputSelectChooseUniInnerText.innerText.indexOf('(') + 1)
      .slice(0, -1);
    }
    

    e.target.parentElement.classList.add('text-highlight--color');
  } else if (e.target.tagName == 'path') {
    inputSelectChooseUniInnerText.innerText =
      e.target.parentElement.parentElement.innerText;

      if(inputSelectChooseUniInnerText.innerText !== 'Определюсь после консультации'){
        inputSelectChooseUniInnerText.innerText = inputSelectChooseUniInnerText.innerText
        .substring(inputSelectChooseUniInnerText.innerText.indexOf('(') + 1)
        .slice(0, -1);
      }
    
    e.target.parentElement.parentElement.classList.add('text-highlight--color');
  } else {
    inputSelectChooseUniInnerText.innerText = e.target.innerText;

    if(inputSelectChooseUniInnerText.innerText !== 'Определюсь после консультации'){
      inputSelectChooseUniInnerText.innerText = inputSelectChooseUniInnerText.innerText
      .substring(inputSelectChooseUniInnerText.innerText.indexOf('(') + 1)
      .slice(0, -1);
    }
    
    e.target.classList.add('text-highlight--color');
  }

  // Add the color to the selected text in the input
  inputSelectChooseUniInnerText.classList.add('text-highlight--color');

  // On select hide the module
  inputSelectChooseUniDropdown.classList.toggle('show-dropdown');

  e.preventDefault();
});

// Select Dropdown Programm
inputSelectChooseProgramm.addEventListener('click', (e) => {
  if (
    inputSelectChooseProgrammDropdownStepTwo.classList.contains('show-dropdown')
  ) {
    inputSelectChooseProgrammDropdownStepTwo.classList.remove('show-dropdown');
    inputSelectChooseProgrammDropdown.classList.remove('show-dropdown');
  } else {
    inputSelectChooseProgrammDropdownStepTwo.classList.remove('show-dropdown');
    inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');
  }

  // window.location = '#input-select-choose-uni';
  if (
    inputSelectChooseProgrammDropdown.classList.contains('show-dropdown') &&
    document.body.clientWidth < 768
  ) {
    inputSelectChooseProgrammInnerText.scrollIntoView({
      behavior: 'smooth',
    });
  }

  document.body.addEventListener('click', function closeInputProgrammDropDown(
    e
  ) {
    if (
      (inputSelectChooseProgrammDropdown.classList.contains('show-dropdown') ||
        inputSelectChooseProgrammDropdownStepTwo.classList.contains(
          'show-dropdown'
        )) &&
      !inputSelectChooseProgrammDropdown.contains(e.target) &&
      e.target !== inputSelectChooseProgrammDropdown &&
      !inputSelectChooseProgramm.contains(e.target) &&
      e.target !== inputSelectChooseProgrammDropdownStepTwo &&
      !inputSelectChooseProgrammDropdownStepTwo.contains(e.target) &&
      e.target !== inputSelectChooseProgramm &&
      !selectedItemFromTheFirstStep.contains(e.target) &&
      e.target !== selectedItemFromTheFirstStep
    ) {
      // Close question module
      inputSelectChooseProgrammDropdown.classList.remove('show-dropdown');
      inputSelectChooseProgrammDropdownStepTwo.classList.remove(
        'show-dropdown'
      );
      document.body.removeEventListener('click', closeInputProgrammDropDown);
    }
  });

  e.preventDefault();
});

// Dropdown Programm
inputSelectChooseProgrammDropdown.addEventListener('click', (e) => {
  const dropDownProgrammItemsArr = Array.from(dropDownProgrammItems);
  const dropDownProgrammItemsArrP = Array.from(dropDownProgrammItemsP);

  dropDownProgrammItemsArr.forEach((item) => {
    item.classList.remove('text-highlight--color');
  });
  dropDownProgrammItemsArrP.forEach((item) => {
    item.classList.remove('text-highlight--color');
  });

  // Change the inner text of the select to the selected text
  if (e.target.tagName === 'svg') {
    inputSelectChooseProgrammInnerText.innerText =
      e.target.parentElement.innerText;
    e.target.parentElement.classList.add('text-highlight--color');
  } else if (e.target.tagName == 'path') {
    inputSelectChooseProgrammInnerText.innerText =
      e.target.parentElement.parentElement.innerText;
    e.target.parentElement.parentElement.classList.add('text-highlight--color');
  } else {
    inputSelectChooseProgrammInnerText.innerText = e.target.innerText;
    e.target.classList.add('text-highlight--color');
  }

  // Add the color to the selected text in the input
  inputSelectChooseProgrammInnerText.classList.add('text-highlight--color');

  // Dropdown Programm Step 2

  if (
    inputSelectChooseProgrammInnerText.innerText ===
    'Определюсь после консультации'
  ) {
    inputSelectChooseProgrammDropdownStepTwo.classList.remove('show-dropdown');
  } else {
    inputSelectChooseProgrammDropdownStepTwo.classList.add('show-dropdown');

    const selectedItemFromTheFirstStepText = document.getElementById(
      'programm-dropdown-step-two-selected-step-one-item'
    );

    const selectedItemFromTheFirstStep = document.getElementById(
      'inner-dropdown-items__item--selected'
    );

    selectedItemFromTheFirstStepText.innerText =
      inputSelectChooseProgrammInnerText.innerText;

    const listItemsStepTwo = document.getElementById(
      'inner-dropdown-items--step-two'
    );

    const svgArrowBack = `<svg
    width="9"
    height="15"
    viewBox="0 0 9 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.20471 13.2882L2.41412 7.49765L8.20471 1.70706C8.5953 1.31647 8.5953 0.683529 8.20471 0.292941C7.81412 -0.097647 7.18118 -0.097647 6.79059 0.292941L0.292941 6.79059C-0.0976471 7.18118 -0.0976471 7.81412 0.292941 8.2047L6.79059 14.7024C7.18118 15.0929 7.81412 15.0929 8.20471 14.7024C8.5953 14.3118 8.5953 13.6788 8.20471 13.2882Z"
      fill="#2874FF"
    />
  </svg>`;

    if (selectedItemFromTheFirstStepText.innerText === 'Колледж') {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('Информационные системы и программирование');

      dropDownStepTwoInsertItem('Гостиничное дело​');

      dropDownStepTwoInsertItem('Банковское дело​​');

      dropDownStepTwoInsertItem('Экономика и бухгалтерский учет по отраслям');

      dropDownStepTwoInsertItem('Право и организация социального обеспечения');

      dropDownStepTwoInsertItem('Коммерция по отраслям');
      
    }

    if (selectedItemFromTheFirstStepText.innerText === 'Бакалавриат') {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('Юриспруденция');

      dropDownStepTwoInsertItem('Дизайн​');

      dropDownStepTwoInsertItem('Лингвистика');

      dropDownStepTwoInsertItem('Информационные системы и технологии');

      dropDownStepTwoInsertItem('Прикладная информатика');

      dropDownStepTwoInsertItem('Реклама и связи с общественностью');

      dropDownStepTwoInsertItem('Бизнес-информатика');

      dropDownStepTwoInsertItem('Государственное и муниципальное управление');

      dropDownStepTwoInsertItem('Управление персоналом');

      dropDownStepTwoInsertItem('Теплоэнергетика и теплотехника');

      dropDownStepTwoInsertItem('Электроэнергетика и электротехника');

      dropDownStepTwoInsertItem('Строительство');

      dropDownStepTwoInsertItem('Психолого-педагогическое образование');

      dropDownStepTwoInsertItem('Психология');

      dropDownStepTwoInsertItem('Менеджмент');

      dropDownStepTwoInsertItem('Экономика');
    }

    if (selectedItemFromTheFirstStepText.innerText === 'Специалитет') {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('Экономическая безопасность');
    }

    if (selectedItemFromTheFirstStepText.innerText === 'Магистратура') {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('Юриспруденция');

      dropDownStepTwoInsertItem('Реклама и связи с общественностью');

      dropDownStepTwoInsertItem('Психология');

      dropDownStepTwoInsertItem('Прикладная информатика');

      dropDownStepTwoInsertItem('Государственное и муниципальное управление');

      dropDownStepTwoInsertItem('Управление персоналом');

      dropDownStepTwoInsertItem('Менеджмент');

      dropDownStepTwoInsertItem('Финансы и кредит');

      dropDownStepTwoInsertItem('Экономика');
    }

    if (
      selectedItemFromTheFirstStepText.innerText ===
      'Профессиональная переподготовка'
    ) {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('Гуманитарные науки');

      dropDownStepTwoInsertItem('Электроэнергетика');

      dropDownStepTwoInsertItem('Строительство');

      dropDownStepTwoInsertItem('Теплоэнергетика');

      dropDownStepTwoInsertItem('Безопасность дорожного движения');

      dropDownStepTwoInsertItem('Продукты питания - технология производства');

      dropDownStepTwoInsertItem('Юриспруденция');

      dropDownStepTwoInsertItem('Охрана труда');

      dropDownStepTwoInsertItem('Информатика и вычислительная техника');

      dropDownStepTwoInsertItem('Реклама и PR');

      dropDownStepTwoInsertItem('Журналистика');

      dropDownStepTwoInsertItem('Дизайн');

      dropDownStepTwoInsertItem('Маркетинг');

      dropDownStepTwoInsertItem('Туризм');

      dropDownStepTwoInsertItem('Государственное и муниципальное управление');

      dropDownStepTwoInsertItem('Логистика');

      dropDownStepTwoInsertItem('Социальная работа');

      dropDownStepTwoInsertItem('Экономика');

      dropDownStepTwoInsertItem('Психология');

      dropDownStepTwoInsertItem('Педагогика');

      dropDownStepTwoInsertItem('Менеджмент');
    }

    if (
      selectedItemFromTheFirstStepText.innerText === 'Повышение квалификации'
    ) {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('Гуманитарные науки');

      dropDownStepTwoInsertItem('Электроэнергетика');

      dropDownStepTwoInsertItem('Строительство');

      dropDownStepTwoInsertItem('Теплоэнергетика');

      dropDownStepTwoInsertItem('Безопасность дорожного движения');

      dropDownStepTwoInsertItem('Продукты питания - технология производства');

      dropDownStepTwoInsertItem('Юриспруденция');

      dropDownStepTwoInsertItem('Охрана труда');

      dropDownStepTwoInsertItem('Информатика и вычислительная техника');

      dropDownStepTwoInsertItem('Реклама и PR');

      dropDownStepTwoInsertItem('Журналистика');

      dropDownStepTwoInsertItem('Дизайн');

      dropDownStepTwoInsertItem('Маркетинг');

      dropDownStepTwoInsertItem('Туризм');

      dropDownStepTwoInsertItem('Медицина');

      dropDownStepTwoInsertItem('Государственное и муниципальное управление');

      dropDownStepTwoInsertItem('Логистика');

      dropDownStepTwoInsertItem('Социальная работа​');

      dropDownStepTwoInsertItem('Экономика​​');

      dropDownStepTwoInsertItem('Психология');

      dropDownStepTwoInsertItem('Педагогика');

      dropDownStepTwoInsertItem('Менеджмент');
    }

    if (
      selectedItemFromTheFirstStepText.innerText ===
      'Master of Business Administration (МВА)'
    ) {
      const listItemsStepTwoArr = Array.prototype.slice.call(
        listItemsStepTwo.childNodes
      );

      listItemsStepTwoArr.forEach((item, index) => {
        if (index > 3) {
          item.remove();
        }
      });

      dropDownStepTwoInsertItem('Другое');

      dropDownStepTwoInsertItem('MBA Industry');

      dropDownStepTwoInsertItem('MBA Professional');

      dropDownStepTwoInsertItem('MBA Intensive');

      dropDownStepTwoInsertItem('Mini-MBA');
    }

    // Step back
    selectedItemFromTheFirstStep.addEventListener('click', (e) => {
      inputSelectChooseProgrammDropdownStepTwo.classList.remove(
        'show-dropdown'
      );
      inputSelectChooseProgrammDropdown.classList.add('show-dropdown');

      e.preventDefault();
    });

    inputSelectChooseProgrammDropdownStepTwo.addEventListener('click', (e) => {
      const dropDownProgrammItemsStepTwoArr = Array.from(
        dropDownProgrammItemsStepTwo
      );
      const dropDownProgrammItemsPStepTwoArr = Array.from(
        dropDownProgrammItemsPStepTwo
      );

      dropDownProgrammItemsStepTwoArr.forEach((item) => {
        item.classList.remove('text-highlight--color');
      });
      dropDownProgrammItemsPStepTwoArr.forEach((item) => {
        item.classList.remove('text-highlight--color');
      });

      // Change the inner text of the select to the selected text
      if (e.target.tagName === 'svg') {
        // Make sure we don't insert a step back btn inner text into the div (that looks kinda like select input)
        inputSelectChooseProgrammInnerText.innerText ===
        e.target.parentElement.innerText
          ? inputSelectChooseProgrammInnerText.innerText
          : (inputSelectChooseProgrammInnerText.innerText = `${inputSelectChooseProgrammInnerText.innerHTML}, ${e.target.parentElement.innerText}`);

        e.target.parentElement.classList.add('text-highlight--color');
      } else if (e.target.tagName == 'path') {
        // Make sure we don't insert a step back btn inner text into the div (that looks kinda like select input)
        inputSelectChooseProgrammInnerText.innerText ===
        e.target.parentElement.parentElement.innerText
          ? inputSelectChooseProgrammInnerText.innerText
          : (inputSelectChooseProgrammInnerText.innerText = `${inputSelectChooseProgrammInnerText.innerText}, ${e.target.parentElement.parentElement.innerText}`);

        e.target.parentElement.parentElement.classList.add(
          'text-highlight--color'
        );
      } else {
        // Make sure we don't insert a step back btn inner text into the div (that looks kinda like select input)
        inputSelectChooseProgrammInnerText.innerText === e.target.innerText
          ? (inputSelectChooseProgrammInnerText.innerText =
              inputSelectChooseProgrammInnerText.innerText)
          : (inputSelectChooseProgrammInnerText.innerText = `${inputSelectChooseProgrammInnerText.innerText}, ${e.target.innerText}`);

        e.target.classList.add('text-highlight--color');
      }

      inputSelectChooseProgrammInnerText.innerHTML = inputSelectChooseProgrammInnerText.innerHTML.replace(
        /,\s*$/,
        ''
      );

      if (document.body.clientWidth < 768) {
        inputSelectChooseProgrammInnerText.scrollIntoView({
          behavior: 'smooth',
        });
      }

      inputSelectChooseProgrammDropdownStepTwo.classList.remove(
        'show-dropdown'
      );
    });
  }

  // On select hide the module
  inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');

  e.preventDefault();
});

// Show ask question btn on the scroll position
// window.addEventListener('scroll', function showQuestionBtn(e) {
//   // console.log(window.scrollY);
//   if (window.scrollY >= 720 && window.scrollY <= 2000) {
//     btnAskQuestion.classList.remove('hidden');
//   } else {
//     btnAskQuestion.classList.add('hidden');
//   }

//   e.preventDefault();
// });

// Ask question clicked
btnAskQuestion.addEventListener('click', (e) => {
  // window.removeEventListener("scroll", showQuestionBtn);
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
      (e.target === btnAskQuestion && btnAskQuestion.contains(e.target))
    ) {
      // Close question module
      btnAskQuestion.classList.remove('hidden');
      moduleQuestions.classList.add('hidden');
      moduleStepOne.classList.add('hidden');
      document.body.classList.remove('dark-overlay');
      document.body.removeEventListener('click', closeQuestionModule);
    }

    e.preventDefault();
  });

  // Telegram clicked
  telegramBtn.addEventListener('click', (e) => {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener(
        'keyup',
        function highlightBgDanger(e) {
          e.target.value !== ''
            ? moduleQuestionTextarea.classList.remove('bg-danger')
            : moduleQuestionTextarea.classList.add('bg-danger');
        }
      );
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');

      moduleStepTwoTitle.innerHTML = 'Telegram';
    }

    // Telegram -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Telegram / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Telegram -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Telegram / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    });

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });

    e.preventDefault();
  });

  // Whatsapp clicked
  whatsappBtn.addEventListener('click', (e) => {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener(
        'keyup',
        function highlightBgDanger(e) {
          e.target.value !== ''
            ? moduleQuestionTextarea.classList.remove('bg-danger')
            : moduleQuestionTextarea.classList.add('bg-danger');
        }
      );
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'Whats App';
    }

    // Whatsapp -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Whatsapp / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Whatsapp -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Whatsapp / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    }); 

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    });

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });

    e.preventDefault();
  });

  // Viber clicked
  viberBtn.addEventListener('click', (e) => {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener(
        'keyup',
        function highlightBgDanger(e) {
          e.target.value !== ''
            ? moduleQuestionTextarea.classList.remove('bg-danger')
            : moduleQuestionTextarea.classList.add('bg-danger');
        }
      );
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'Viber';
    }

    // Viber -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Viber / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Viber -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'Viber / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    });

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });

    e.preventDefault();
  });

  // Vk clicked
  vkBtn.addEventListener('click', (e) => {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener(
        'keyup',
        function highlightBgDanger(e) {
          e.target.value !== ''
            ? moduleQuestionTextarea.classList.remove('bg-danger')
            : moduleQuestionTextarea.classList.add('bg-danger');
        }
      );
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'VK';
    }

    // VK -> Call clicked
    moduleBtnCall.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'VK / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // VK -> Message clicked
    moduleBtnMessage.addEventListener('click', (e) => {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      moduleStepThreeTitle.innerHTML = 'VK / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();

      e.preventDefault();
    });

    // Step 2 -> Arrow back
    moduleStepTwoArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');

      e.preventDefault();
    });

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });

    e.preventDefault();
  });

  // Phone button clicked
  phoneBtn.addEventListener('click', (e) => {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener(
        'keyup',
        function highlightBgDanger(e) {
          e.target.value !== ''
            ? moduleQuestionTextarea.classList.remove('bg-danger')
            : moduleQuestionTextarea.classList.add('bg-danger');
        }
      );
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.remove('hidden');
      moduleStepThreeTitle.innerHTML = 'Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
    }

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });

    e.preventDefault();
  });

  // Email button clicked
  emailBtn.addEventListener('click', (e) => {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener(
        'keyup',
        function highlightBgDanger(e) {
          e.target.value !== ''
            ? moduleQuestionTextarea.classList.remove('bg-danger')
            : moduleQuestionTextarea.classList.add('bg-danger');
        }
      );
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.remove('hidden');
      moduleStepThreeTitle.innerHTML = 'Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой e-mail';
      moduleInputContactInfo.placeholder = 'example@gmail.com';
      moduleInputContactInfo.type = 'email';
      moduleInputContactInfo.focus();
    }

    // Step 3 -> Arrow Back
    moduleStepThreeArrowBack.addEventListener('click', (e) => {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');

      e.preventDefault();
    });

    e.preventDefault();
  });

  // Submit btn clicked
  moduleBtnSubmit.addEventListener('click', function submitQuestionModule(e) {
    if (moduleInputContactInfo.type === 'email') {
      // todo: validate email
      if (moduleInputContactInfo.value === '') {
        moduleInputContactInfo.classList.add('bg-danger');
        setTimeout(() => {
          moduleInputContactInfo.classList.remove('bg-danger');
        }, 1500);
      } else {
        moduleStepThree.classList.add('hidden');
        moduleStepTwo.classList.add('hidden');
        moduleStepOne.classList.add('hidden');
        moduleStepSuccess.classList.remove('hidden');

        // Submit
        const question = moduleQuestionTextarea.value.trim();
        const contactWay = moduleStepThreeTitle.innerText.trim();
        const contact = moduleInputContactInfo.value.trim();

        // const googleClientId = ga.getAll()[0].get('clientId');

        let number;

        const data = {
          number,
          question,
          contactWay,
          contact,
          userCity,
          userCountry,
          // googleClientId,
          userDevice,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        };

        if(data.contact !== '' && data.contact !== null && !data.contact.includes('@')){
          data.number = data.contact;
          data.contact = '-';
        }

        sumbitData(data);

        setTimeout(() => {
          moduleStepSuccess.classList.add('hidden');
          btnAskQuestion.classList.remove('hidden');

          // console.log(sectionAskQuestionsInner.innerHTM);
          oneMoreQuestionText.innerText = 'ещё один';
          const sectionAskQuestionInnerSaver =
            sectionAskQuestionsInner.innerHTML;
          // console.log(sectionAskQuestionInnerSaver);
          sectionAskQuestionsInner.innerHTML = 'Спасибо! Мы с вами свяжемся!';
          setTimeout(() => {
            sectionAskQuestionsInner.innerHTML = sectionAskQuestionInnerSaver;
          }, 3000);

          moduleQuestions.classList.add('hidden');
          document.body.classList.remove('dark-overlay');
          // document.body.removeEventListener("click", closeQuestionModule);
          moduleBtnSubmit.removeEventListener('click', submitQuestionModule);
        }, 3000);
      }
    } else {
      if (
        moduleInputContactInfo.value.trim() !== '' &&
        moduleInputContactInfo.value.trim().match(numValidation)
      ) {
        moduleStepThree.classList.add('hidden');
        moduleStepTwo.classList.add('hidden');
        moduleStepOne.classList.add('hidden');
        moduleStepSuccess.classList.remove('hidden');

        moduleStepSuccess.classList.add('showed');

        // Submit
        const question = moduleQuestionTextarea.value.trim();
        const contactWay = moduleStepThreeTitle.innerText.trim();
        const contact = moduleInputContactInfo.value.trim();
        
        // const googleClientId = ga.getAll()[0].get('clientId');

        let number;

        const data = {
          number,
          question,
          contactWay,
          contact,
          userCity,
          userCountry,
          // googleClientId,
          userDevice,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        };

        if(data.contact !== '' && data.contact !== null && !data.contact.includes('@')){
          data.number = data.contact;
          data.contact = '-';
        }

        sumbitData(data);

        setTimeout(() => {
          moduleStepSuccess.classList.add('hidden');
          btnAskQuestion.classList.remove('hidden');

          moduleStepSuccess.classList.remove('showed');

          // console.log(sectionAskQuestionsInner.innerHTM);
          oneMoreQuestionText.innerText = 'ещё один';
          const sectionAskQuestionInnerSaver =
            sectionAskQuestionsInner.innerHTML;
          // console.log(sectionAskQuestionInnerSaver);
          sectionAskQuestionsInner.innerHTML = 'Спасибо! Мы с вами свяжемся!';
          setTimeout(() => {
            sectionAskQuestionsInner.innerHTML = sectionAskQuestionInnerSaver;
          }, 3000);

          moduleQuestions.classList.add('hidden');
          document.body.classList.remove('dark-overlay');
          // document.body.removeEventListener("click", closeQuestionModule);
          moduleBtnSubmit.removeEventListener('click', submitQuestionModule);
        }, 3000);
      } else {
        moduleInputContactInfo.classList.add('bg-danger');

        if (moduleInputContactInfo.type === 'email') {
          // todo: validate email
        } else {
          moduleInputContactInfo.addEventListener('keyup', (e) => {
            // console.log("event keyup");
            if (
              moduleInputContactInfo.value.trim() !== '' &&
              moduleInputContactInfo.value.trim().match(numValidation)
            ) {
              // console.log("correct");
              moduleInputContactInfo.classList.remove('bg-danger');
            } else {
              // console.log("wrong");
              moduleInputContactInfo.classList.add('bg-danger');
            }

            e.preventDefault();
          });
        }
      }
    }

    e.preventDefault();
  });

  e.preventDefault();
});

// Carousel
const carouselItems = [
  carouselImgGroupOne,
  carouselImgGroupTwo,
  carouselImgGroupThree,
];

// Terrible solution for carousel, it works tho
let i = 0;
carouselBtnRight.addEventListener('click', (e) => {
  i > 2 ? (i = 0) : i;
  i < 0 ? (i = 2) : i;

  carouselItems[i].classList.add('hidden');
  carouselItems[i + 1 > 2 ? 0 : i + 1].classList.remove('hidden');
  carouselItems[i - 1 < 0 ? 2 : i - 1].classList.add('hidden');

  i++;

  e.preventDefault();
});

// Don't look below
carouselBtnLeft.addEventListener('click', (e) => {
  i < 0 ? (i = 2) : i;
  i > 2 ? (i = 0) : i;
  carouselItems[i].classList.add('hidden');
  carouselItems[i + 1 > 2 ? 0 : i + 1].classList.add('hidden');
  carouselItems[i - 1 < 0 ? 2 : i - 1].classList.remove('hidden');
  i--;

  e.preventDefault();
});

// On submit
ctaSubmitBtn.addEventListener('click', (e) => {
  const field = inputSelectChooseProgrammInnerText.innerText.trim();
  const uni = inputSelectChooseUniInnerText.innerText.trim();
  const number = phoneInputInnerText.value.trim();
  const userName = userInputNameText.value.trim();

  // const googleClientId = ga.getAll()[0].get('clientId');

  const data = {
    field,
    uni,
    number,
    userName,
    userCity,
    userCountry,
    // googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };

  // console.log(data);
  // console.log(JSON.stringify(data));

  // Validate input number
  if (number !== '' && number.match(numValidation)) {
    const appIsSumbitted = document.getElementById('js-app-is-submitted');

    appIsSumbitted.classList.add('showed');

    document
      .getElementById('step-success-row__back-to-main')
      .addEventListener('click', (e) => {
        appIsSumbitted.classList.add('removing');
        setTimeout(() => {
          appIsSumbitted.classList.remove('showed');
          appIsSumbitted.classList.remove('removing');
        }, 300);

        e.preventDefault();
      });

    // console.log("correct");
    sumbitData(data);
  } else {
    phoneInputInnerText.classList.add('bg-danger');
    // console.log("wrong");
    phoneInputInnerText.addEventListener('keyup', (e) => {
      // console.log("event keyup");
      if (
        phoneInputInnerText.value.trim() !== '' &&
        phoneInputInnerText.value.trim().match(numValidation)
      ) {
        // console.log("correct");
        phoneInputInnerText.classList.remove('bg-danger');
      } else {
        // console.log("wrong");
        phoneInputInnerText.classList.add('bg-danger');
      }

      e.preventDefault();
    });
  }

  e.preventDefault();
});

phoneInputInnerText.addEventListener('input', (e) => {
  const number = phoneInputInnerText.value.trim();
  // Validate input number
  if (number !== '' && number.match(numValidation) && number.length >= 3) {
    console.log(number.length);
    userNameInput.classList.add('showed');
  }
});

phoneInputInnerText.addEventListener('click', (e) => {
  const containerInputPhoneNum = document.getElementById(
    'container-input-phone-num'
  );
  if (document.body.clientWidth < 768) {
    containerInputPhoneNum.scrollIntoView({
      behavior: 'smooth',
    });
  }
});


// Pop up btns
function showPopUp(button = ''){
  const buttonSelected = document.getElementById(button);
  buttonSelected.addEventListener('click', (e) => {

    const popupFormTitle = document.getElementById('pop-up-form-title');
    const popupFormInfo = document.getElementById('popup-form-info');

    const popUpFormSubmit = document.getElementById('pop-up-form-submit');

    switch(button){
      case 'learn-more-btn':
        // console.log('Узнайте подробнее о вузах');
        popupFormTitle.innerHTML = 'Узнайте больше о наших вузах-партнерах';
        popupFormInfo.innerHTML = 'Оставьте свои контакты, консультант приемной комиссии подробно расскажет Вам о вузах и подберет программу!';
        popUpFormSubmit.dataset.form = 'learn-more';
      break;
      case 'js-popup-choose-from-many':
        // console.log('Узнайте о наличии своего направления');
        popupFormTitle.innerHTML = `Узнайте о наличии <br />своего направления`;
        popupFormInfo.innerHTML = 'Оставьте свои контакты, менеджер свяжется с Вами и расcкажет на какие направления сейчас идет набор';
        popUpFormSubmit.dataset.form = 'choose-from-many';
      break;
      case 'js-popup-what-to-do':
        // console.log('Узнайте что делать если нет ЕГЭ');
        popupFormTitle.innerHTML = 'Узнайте что делать, если нет ЕГЭ и диплома колледжа';
        popupFormInfo.innerHTML = 'Оставьте свои контакты, менеджер свяжется с Вами и расскажет как можно поступить без ЕГЭ и диплома колледжа ';
        popUpFormSubmit.dataset.form = 'what-to-do';
      break;
      default:
        return;
    }

    showPopUpContant();
  
    submitPopUpForm();
  
    closePopUpContant();
  
    e.preventDefault();
  })
}

showPopUp('learn-more-btn');
showPopUp('js-popup-choose-from-many');
showPopUp('js-popup-what-to-do');

function showPopUpContant(){
  const moduleForm = document.getElementById('module-popup-form');
  moduleForm.classList.add('show');
  btnAskQuestion.classList.add('hidden');
}

function closePopUpContant(){
  const moduleForm = document.getElementById('module-popup-form');
  const popUpForm = document.getElementById('pop-up-form');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  const learnMoreBtn2 = document.getElementById('js-popup-choose-from-many');
  const learnMoreBtn3 = document.getElementById('js-popup-what-to-do');
  document.body.addEventListener('click', function closePopUpContactEvent(e){
    // console.log(e.target);
    if(moduleForm.classList.contains('show') && e.target !== popUpForm && !popUpForm.contains(e.target) && e.target !== learnMoreBtn && !learnMoreBtn.contains(e.target) && e.target !== learnMoreBtn2 && !learnMoreBtn2.contains(e.target) && e.target !== learnMoreBtn3 && !learnMoreBtn3.contains(e.target)){
      // console.log(e.target);
      moduleForm.classList.remove('show');
      btnAskQuestion.classList.remove('hidden');
      document.body.removeEventListener('click', closePopUpContactEvent);
    }
  })
}

function showMorePartnersDesktop(){
  const partnersSecondRow = document.querySelector('.section-trust-boost .content__img-group:nth-child(2)')
  if(document.body.clientWidth > 768){
    partnersSecondRow.classList.remove('hidden');
  }else{
    partnersSecondRow.classList.add('hidden');
  };
  window.addEventListener('resize', () => {
    if(document.body.clientWidth > 768){
      partnersSecondRow.classList.remove('hidden');
    }else{
      partnersSecondRow.classList.add('hidden');
    };
  })
}

showMorePartnersDesktop();


// Submit Data from Forms
function submitPopUpForm(){
  const popUpFormSubmit = document.getElementById('pop-up-form-submit');
  const moduleForm = document.getElementById('module-popup-form');
  popUpFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    
  // Submit
  const userName = document.getElementById('pop-up-form-name').value.trim();
  const userNameEl = document.getElementById('pop-up-form-name');
  const number = document.getElementById('pop-up-form-number').value.trim();
  const numberEl = document.getElementById('pop-up-form-number');

  // const googleClientId = ga.getAll()[0].get('clientId');
 
  const data = {
    number,
    userName,
    userCity,
    userCountry,
    // googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };

    if(number !== '' && number !== null && number !== undefined && number.match(numValidation)){

      const appIsSumbitted = document.getElementById('js-app-is-submitted--learn-more');
      const popUpFormSubmit = document.getElementById('pop-up-form-submit');

      if(popUpFormSubmit.dataset.form === 'choose-from-many'){
        appIsSumbitted.id = 'popup--is-submitted-choose-from-many';
      }else if(popUpFormSubmit.dataset.form === 'learn-more'){
        appIsSumbitted.id = 'popup--is-submitted-learn-more';
      }else if(popUpFormSubmit.dataset.form === 'what-to-do'){
        appIsSumbitted.id = 'popup--is-submitted-what-to-do';
      }

    appIsSumbitted.classList.add('showed');

    document
      .getElementById('step-success-row__back-to-main--form-popup')
      .addEventListener('click', (e) => {
        appIsSumbitted.id = 'js-app-is-submitted--learn-more';
        appIsSumbitted.classList.add('removing');
        setTimeout(() => {
          appIsSumbitted.classList.remove('showed');
          appIsSumbitted.classList.remove('removing');
        }, 300);

        e.preventDefault();
      });

      const success = document.getElementById('module-popup-is-submitted');
      success.classList.remove('hidden');
      sumbitData(data);
      moduleForm.classList.remove('show');
      userNameEl.value = '';
      numberEl.value = '';
    }else{

      numberEl.classList.add('bg-danger');
      numberEl.focus();
      numberEl.addEventListener('keyup', (e) =>{
        e.target.value !== '' ? numberEl.classList.remove('bg-danger') : numberEl.classList.add('bg-danger');
      })
    }
  })
}

function submitContactForm(){
  const popUpFormSubmit = document.getElementById('submit-btn-contact-form');
  popUpFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    
  // Submit
  const userName = document.getElementById('user-name-contact-from').value.trim();
  const userNameEl = document.getElementById('user-name-contact-from');
  const number = document.getElementById('number-contact-form').value.trim();
  const numberEl = document.getElementById('number-contact-form');

  // const googleClientId = ga.getAll()[0].get('clientId');

  const data = {
    number,
    userName,
    userCity,
    userCountry,
    // googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };

  if(number !== '' && number !== null && number !== undefined && number.match(numValidation)){
    const success = document.getElementById('footer-form-is-submitted');
    success.classList.remove('hidden');
    sumbitData(data);
    numberEl.value = '';
    userNameEl.value = '';
  }else{
    numberEl.classList.add('bg-danger');
    numberEl.focus();
    numberEl.addEventListener('keyup', (e) =>{
      e.target.value !== '' ? numberEl.classList.remove('bg-danger') : numberEl.classList.add('bg-danger');
    })
  }
  })
}

submitContactForm();

// AreThereQuestions
function submitQuestionsForm(){
  const popUpFormSubmit = document.getElementById('submit-btn-contact-form-are-there-questions');
  popUpFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    
  // Submit
  const userName = document.getElementById('user-name-are-there-questions').value.trim();
  const userNameEl = document.getElementById('user-name-are-there-questions');
  const number = document.getElementById('phone-are-there-questions').value.trim();
  const numberEl = document.getElementById('phone-are-there-questions');

  // const googleClientId = ga.getAll()[0].get('clientId');

  const data = {
    number,
    userName,
    userCity,
    userCountry,
    // googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };

  if(number !== '' && number !== null && number !== undefined && number.match(numValidation)){
    const success = document.getElementById('are-there-questions-form-is-submitted');
    success.classList.remove('hidden');
    sumbitData(data);
    numberEl.value = '';
    userNameEl.value = '';
  }else{
    numberEl.classList.add('bg-danger');
    numberEl.focus();
    numberEl.addEventListener('keyup', (e) =>{
      e.target.value !== '' ? numberEl.classList.remove('bg-danger') : numberEl.classList.add('bg-danger');
    })
  }
  })
}

submitQuestionsForm();


// Hide ask question on the top of the page and on the bottom of the page
btnAskQuestion.classList.add('hidden');
document.addEventListener('scroll', (e) => {
  // moduleQuestions
  // console.log(window.scrollY);
  if(moduleQuestions.classList.contains('hidden')){
    // if (window.scrollY >= 300)
    // {
    //   btnAskQuestion.classList.remove('hidden');
    // }else{
    //   btnAskQuestion.classList.add('hidden');
    // }
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 300)
    {
      btnAskQuestion.classList.add('hidden');
    }else{
      btnAskQuestion.classList.remove('hidden');
    }
  }
  
})