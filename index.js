// Select form and input fields
const nameInput = document.querySelector('.name');
const emailInput = document.querySelector('.email');
const subjectInput = document.querySelector('.subject');
const textareaInput = document.querySelector('.textarea');
const contactForm = document.querySelector('.contact-form');
const messageDiv = document.querySelector('.message');

// Form submission event
contactForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  validateInput();
});

// Validate inputs before sending
const validateInput = () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = textareaInput.value.trim();

  // Input checks
  if (!email && !message) {
    setError(emailInput.parentElement);
    setError(textareaInput.parentElement);
    showMessage('Please fill in the required inputs');
    return;
  }
  if (!email) {
    setError(emailInput.parentElement);
    showMessage("Oops! Email can't be empty");
    return;
  }
  if (!message) {
    setError(textareaInput.parentElement);
    showMessage('Please provide a message');
    return;
  }

  // Send using EmailJS
  emailjs.sendForm(
    'service_bsxez74',     // Your service ID
    'template_z3i1xnn',    // Your template ID
    contactForm,           // Form element
    'annlBo0FhDzRLjpXp'    // Your public key
  ).then(() => {
    setSuccess(emailInput.parentElement);
    setSuccess(textareaInput.parentElement);
    showMessage('Message sent successfully', 'green');
    

    // Clear inputs
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    textareaInput.value = '';
  }).catch((error) => {
    console.error('EmailJS error:', error);
    showMessage('Failed to send message. Try again later.', 'red');
  });
};

// Handle error styling
const setError = (element) => {
  element.classList.remove('success');
  element.classList.add('error');
};

// Handle success styling
const setSuccess = (element) => {
  element.classList.remove('error');
  element.classList.add('success');
};

// Show user message
const showMessage = (text, color = 'crimson') => {
  const divContent = document.createElement('div');
  divContent.textContent = text;
  divContent.classList.add('message-content');
  divContent.style.backgroundColor = color;

  messageDiv.prepend(divContent);
  messageDiv.style.transform = `translate(0, 0)`;

  setTimeout(() => {
    divContent.classList.add('hide');
    divContent.addEventListener('transitionend', () => {
      divContent.remove();
    });
  }, 5000);
};
