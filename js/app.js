// Get the carousel container and images
const carouselContainer = document.querySelector('.carousel-container');
const carouselImages = carouselContainer.querySelectorAll('img');

// Set the initial active image
let currentIndex = 0;
carouselImages[currentIndex].classList.add('active');

// Function to rotate the carousel
function rotateCarousel() {
  // Remove the active class from the current image
  carouselImages[currentIndex].classList.remove('active');

  // Increment the current index, wrapping around to 0 if necessary
  currentIndex = (currentIndex + 1) % carouselImages.length;

  // Add the active class to the new current image
  carouselImages[currentIndex].classList.add('active');
}

// Rotate the carousel every 10 seconds
setInterval(rotateCarousel, 10000);

// Get the RSVP form and thank you banner
const rsvpForm = document.getElementById('rsvp-form');
const rsvpBanner = document.getElementById('rsvp-banner');

// Function to validate the RSVP form
function validateRSVPForm() {
  const nameInput = document.getElementById('name');

  // Check if the name input is empty
  if (nameInput.value.trim() === '') {
    alert('Please enter your name.');
    return false;
  }

  return true;
}

// Add an event listener to the RSVP form
rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate the form before submitting
  if (validateRSVPForm()) {
    // Get the form data
    const name = document.getElementById('name').value;

    // Collect diet restrictions
    const dietRestrictions = [];
    const dietCheckboxes = document.querySelectorAll('input[name="diet"]:checked');
    dietCheckboxes.forEach((checkbox) => {
      dietRestrictions.push(checkbox.value);
    });

    // Check if "Other" is selected and add the specified diet
    if (document.getElementById('other').checked) {
      const otherDiet = document.getElementById('otherDiet').value;
      if (otherDiet.trim() !== '') {
        dietRestrictions.push(otherDiet);
      }
    }

    // Display the thank you banner
    rsvpBanner.classList.remove('hidden');

    // Log the collected data
    console.log(`Name: ${name}`);
    console.log(`Diet restrictions: ${dietRestrictions.join(', ')}`);

    // Reset the form
    rsvpForm.reset();
    document.getElementById('other-diet-container').style.display = 'none';
  }
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Floating RSVP button functionality
const rsvpFloatBtn = document.getElementById('rsvp-float-btn');
const rsvpSection = document.getElementById('rsvp');

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function toggleRsvpFloatBtn() {
  if (isElementInViewport(rsvpSection)) {
    rsvpFloatBtn.classList.add('hidden');
  } else {
    rsvpFloatBtn.classList.remove('hidden');
  }
}

window.addEventListener('scroll', toggleRsvpFloatBtn);
window.addEventListener('resize', toggleRsvpFloatBtn);

// Initial check
toggleRsvpFloatBtn();

rsvpFloatBtn.addEventListener('click', () => {
  rsvpSection.scrollIntoView({ behavior: 'smooth' });
});

// Add event listener for the "Other" checkbox
document.getElementById('other').addEventListener('change', function() {
  const otherDietContainer = document.getElementById('other-diet-container');
  otherDietContainer.style.display = this.checked ? 'block' : 'none';
});
