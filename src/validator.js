function checkLanguageValidity(input, inputValidator) {
  const georgianOnlyAnd2 = /^[ა-ჰ]{2,}$/;
  if (input.value.match(georgianOnlyAnd2)) {
    inputValidator.value = 'passed';
  } else {
    inputValidator.value = 'failed';
  }
}

function checkMobileValidity(input, inputValidator) {
  const mNumberValid = /[0-9\s+]/;
  if (input.value.match(mNumberValid) && input.value.length === 17) {
    inputValidator.value = 'passed';
  } else {
    inputValidator.value = 'failed';
  }
}

function checkEmailValidity(input, inputValidator) {
  if (input.value.toLowerCase().endsWith('@redberry.ge')) {
    inputValidator.value = 'passed';
  } else {
    inputValidator.value = 'failed';
  }
}

function checkEmptyValidity(input, inputValidator, emptyAllowed = true) {
  if (input.value.length >= 1) {
    inputValidator.value = 'passed';
  } else if (input.value.length === 0) {
    emptyAllowed ? (inputValidator.value = null) : (inputValidator.value = 'failed');
  }
}

export {
  checkLanguageValidity,
  checkMobileValidity,
  checkEmailValidity,
  checkEmptyValidity,
};
