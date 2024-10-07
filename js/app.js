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

// Add an event listener to the RSVP form
rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const requestParams = {
    name: '',
    glutenFree: false,
    dairyFree: false,
    vegan: false,
    vegetarian: false,
    shellfishAllergy: false,
    nutAllergy: false,
    otherDiet: '',
    plusOnes: ['']
  }

  // Get the name
  requestParams.name = document.getElementById('name').value;

  // Collect diet restrictions
  requestParams.glutenFree = document.getElementById("glutenFree").checked;
  requestParams.dairyFree = document.getElementById("dairyFree").checked;
  requestParams.vegan = document.getElementById("vegan").checked;
  requestParams.vegetarian = document.getElementById("vegetarian").checked;
  requestParams.shellfishAllergy = document.getElementById("shellfishAllergy").checked;
  requestParams.nutAllergy = document.getElementById("nutAllergy").checked;

  // Check if "Other" is selected and add the specified diet
  if (document.getElementById('other').checked) {
    const otherDiet = document.getElementById('otherDiet').value.trim();
    if (otherDiet !== '') {
      requestParams.otherDiet = otherDiet;
    }
  }

  requestParams.plusOnes = document.getElementById('plusOnes').value;

  console.log(requestParams);
  makeRSVPApiCall(requestParams);

  // Display the thank you banner
  rsvpBanner.classList.remove('hidden');

  // Reset the form
  rsvpForm.reset();
  document.getElementById('other-diet-container').style.display = 'none';
});

function makeRSVPApiCall(params) {
  const url = 'https://weddingwebsitebackend.zvnr.ca/rsvps';
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  };

  fetch(url, request)
    .then(response => {
      if (!response.ok) {
        console.log(`Unable to add RSVP: ${response.status}`);
        return false;
      } else {
        return true;
      }
    })
    .catch(error => {
      console.log(error);
    })
}

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
