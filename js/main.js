const app = (() => {
  const submitForm = (e) => {
    e.preventDefault();

    const allInputsValid = this.formInputs.every((input) => input.checkValidity());

    if (allInputsValid) {
      const [name, email, message] = this.formInputs;

      const serviceId = 'default_service';
      const templateId = 'template_0Dk2Vuaa';
      const templateParams = {
        from_name: name.value,
        from_email: email.value,
        message_html: message.value,
      };

      emailjs.send(serviceId, templateId, templateParams).then(
        (res) => {
          this.submitButton.classList.add('submitted');
          this.submitButton.innerText = 'Sent';
          this.submitButton.disabled = true;

          this.form.reset();

          setTimeout(() => {
            this.submitButton.classList.remove('submitted');
            this.submitButton.innerText = 'Submit';
            this.submitButton.disabled = false;
          }, 3000);
        },
        (error) => {
          this.submitButton.classList.add('errored');
          this.submitButton.innerText = 'Error';
          this.submitButton.disabled = true;

          setTimeout(() => {
            this.submitButton.classList.remove('errored');
            this.submitButton.innerText = 'Submit';
            this.submitButton.disabled = false;
          }, 3000);
        }
      );
    }
  };

  // Custom form input validation, to prevent validity circumvention by editing HTML
  const handleInput = (e) => {
    const { target } = e;
    const { name, value } = target;

    let foundError = null;
    let min,
      max = 0;

    switch (name) {
      case 'name':
        min = 3;
        max = 128;

        if (value.length < min || value.length > max) {
          foundError = `Name must be between ${min} and ${max} characters of length.`;
        }

        break;
      case 'email':
        min = 3;
        max = 254;

        const emailRegex =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const emailIsValid = emailRegex.test(value);

        if (value.length < min || value.length > max) {
          foundError = `Email must be between ${min} and ${max} characters of length.`;
        } else if (!emailIsValid) {
          foundError = 'Invalid email address.';
        }

        break;
      case 'message':
        min = 10;
        max = 1000;

        if (value.length < min || value.length > max) {
          foundError = `Message must be between ${min} and ${max} characters of length.`;
        }

        break;
      default:
        return;
    }

    target.setCustomValidity(foundError || '');
    target.reportValidity();
  };

  const init = async () => {
    // Prevent app from reinitializing if called more than once
    if (this.hasInit) {
      return;
    }

    // Initialize animate on scroll
    if (AOS) {
      AOS.init();
    }

    // Setup form submit event listener
    const form = document.querySelector('#contact-form');
    this.form = form;

    form.addEventListener('submit', submitForm);

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const submitButton = form.querySelector('.btn');

    // Save form input references to app instance for form submit event
    this.submitButton = submitButton;
    this.formInputs = [name, email, message];

    // Setup event listeners to validate inputs on change
    this.formInputs.forEach((input) => input.addEventListener('input', handleInput));

    // Add stagger effect to skill logos
    const logos = [...document.querySelectorAll('.logos > img')];

    let delayIncrement = 100;
    let startingDelay = 200;

    logos.forEach((logo) => {
      // Reset delays once the next category is reached
      if (!logo.previousElementSibling) {
        delayIncrement = 100;
        startingDelay = 200;
      }

      logo.dataset.aosDelay = startingDelay;
      startingDelay += delayIncrement;
    });

    // Get github profile picture
    const githubApi = await fetch('https://api.github.com/users/jarethill');
    const data = await githubApi.json();

    const { avatar_url } = data;

    if (avatar_url) {
      const imageElement = document.getElementById('headshot');
      const img = document.createElement('img');

      img.src = avatar_url;
      img.alt = 'My Github Profile Picture';

      imageElement.appendChild(img);
    }

    this.hasInit = true;
  };

  return {
    init,
  };
})();

app.init();
