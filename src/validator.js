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
  if (
    input.value.match(mNumberValid) &&
    input.value.length === 17 &&
    input.value.startsWith('+995')
  ) {
    inputValidator.value = 'passed';
  } else {
    inputValidator.value = 'failed';
  }
}

function checkEmailValidity(input, inputValidator) {
  if (input.value.toLowerCase().endsWith('@redberry.ge') && input.value.length >= 13) {
    inputValidator.value = 'passed';
  } else {
    inputValidator.value = 'failed';
  }
}

function checkEmptyValidity(input, inputValidator, emptyAllowed = true, length = 1) {
  if (input.value.length >= length) {
    inputValidator.value = 'passed';
  } else {
    emptyAllowed ? (inputValidator.value = null) : (inputValidator.value = 'failed');
  }
}

function checkSelectValidity(input, inputValidator) {
  if (input.value.title) {
    inputValidator.value = 'passed';
  } else {
    inputValidator.value = 'failed';
  }
}

function checkPassed(inputValidator) {
  if (inputValidator.value === null || inputValidator.value === 'failed') {
    inputValidator.value = 'failed';
    return false;
  }
  return true;
}

export {
  checkPassed,
  checkLanguageValidity,
  checkMobileValidity,
  checkEmailValidity,
  checkEmptyValidity,
  checkSelectValidity,
};
