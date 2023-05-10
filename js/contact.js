const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (validateForm()) {
    // Send form data or perform other actions
    contactForm.reset();
  }
});

function validateForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const subjectValue = subjectInput.value.trim();
  const messageValue = messageInput.value.trim();

  let isValid = true;

  if (nameValue.length < 5) {
    setError(nameInput, 'Name must be at least 5 characters long');
    isValid = false;
  } else {
    setSuccess(nameInput);
  }

  if (!isValidEmail(emailValue)) {
    setError(emailInput, 'Please enter a valid email address');
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  if (subjectValue.length < 15) {
    setError(subjectInput, 'Subject must be at least 15 characters long');
    isValid = false;
  } else {
    setSuccess(subjectInput);
  }

  if (messageValue.length < 25) {
    setError(messageInput, 'Message must be at least 25 characters long');
    isValid = false;
  } else {
    setSuccess(messageInput);
  }

  return isValid;
}

function isValidEmail(email) {
  // Simple email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

function setError(input, errorMessage) {
  const formControl = input.parentElement;
  const errorText = formControl.querySelector('.error-text');

  formControl.className = 'form-control error';
  errorText.innerText = errorMessage;
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}