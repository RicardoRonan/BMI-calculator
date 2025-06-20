window.onload = () => {
  // DARK MODE SWITCHER LOGIC
  const darkModeToggle = document.getElementById('darkModeToggle');
  // Set initial state from localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    if (darkModeToggle) darkModeToggle.checked = false;
  }
  // Listen for toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  let button = document.querySelector("#btn");
  let resetButton = document.querySelector("#reset");
  let bmiSections = document.querySelectorAll('.bmi-section');
  let result = document.querySelector("#result");
  let shareBtn = document.getElementById('shareBMI');
  if (shareBtn) shareBtn.style.display = 'none';

  // Hide all BMI sections on load
  bmiSections.forEach(section => section.style.display = 'none');

  let calcAnimation = document.getElementById('calc-animation');
  if (calcAnimation) calcAnimation.style.display = 'none';

  button.addEventListener("click", function() {
    if (calcAnimation) {
      calcAnimation.style.display = '';
    }
    setTimeout(() => {
      calculateBMI();
      if (calcAnimation) {
        calcAnimation.style.display = 'none';
      }
    }, 1000); // 1 second loading effect
  });
  resetButton.addEventListener("click", () => {
    document.querySelector("#height").value = '';
    document.querySelector("#weight").value = '';
    result.innerHTML = 'Your BMI will show up here!';
    result.className = 'mt-4 text-center';
    bmiSections.forEach(section => section.style.display = 'none');
    if (shareBtn) shareBtn.style.display = 'none';
    if (calcAnimation) calcAnimation.style.display = 'none';
  });
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      const text = result.innerText.replace(/\n/g, ' ');
      if (navigator.share) {
        navigator.share({
          title: 'My BMI Result',
          text: text,
          url: window.location.href
        });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text + ' ' + window.location.href);
        shareBtn.innerText = 'Copied!';
        setTimeout(() => { shareBtn.innerText = 'Share BMI'; }, 1500);
      } else {
        alert('Copy this: ' + text + ' ' + window.location.href);
      }
    });
  }

  // Lottie scale animation on homepage
  if (window.lottie && document.getElementById('lottie-scale')) {
    lottie.loadAnimation({
      container: document.getElementById('lottie-scale'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/67854df7-2bde-4024-bdf8-21399d227c2d/GTlidpbQMI.lottie'
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
};

function calculateBMI() {
  let heightInput = document.querySelector("#height");
  let weightInput = document.querySelector("#weight");
  let result = document.querySelector("#result");
  let bmiSections = document.querySelectorAll('.bmi-section');
  let shareBtn = document.getElementById('shareBMI');

  let height = parseFloat(heightInput.value);
  let weight = parseFloat(weightInput.value);

  // Hide all BMI sections before showing the relevant one
  bmiSections.forEach(section => section.style.display = 'none');

  if (isNaN(height) || height <= 0) {
    result.innerHTML = "<span class=\"error\">Please provide a valid height!</span>";
    result.className = 'mt-4 text-center text-danger';
    if (shareBtn) shareBtn.style.display = 'none';
    return;
  } else if (isNaN(weight) || weight <= 0) {
    result.innerHTML = "<span class=\"error\">Please provide a valid weight!</span>";
    result.className = 'mt-4 text-center text-danger';
    if (shareBtn) shareBtn.style.display = 'none';
    return;
  } else {
    let bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    let weightClass = "";
    let sectionId = "";
    let resultClass = 'mt-4 text-center fw-bold fs-3';

    if (bmi < 18.5) {
      weightClass = "Underweight";
      sectionId = "underweight";
      resultClass += ' text-warning';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      weightClass = "Normal weight";
      sectionId = "normal-weight";
      resultClass += ' text-success';
    } else if (bmi >= 25 && bmi < 29.9) {
      weightClass = "Overweight";
      sectionId = "overweight";
      resultClass += ' text-primary';
    } else {
      weightClass = "Obese";
      sectionId = "obese";
      resultClass += ' text-danger';
    }
    result.innerHTML = `BMI: <span>${bmi}</span><br>Weight Class: <span>${weightClass}</span>`;
    result.className = resultClass;
    // Show only the relevant section
    let section = document.getElementById(sectionId);
    if (section) section.style.display = '';
    if (shareBtn) shareBtn.style.display = '';
  }
}
