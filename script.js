window.onload = () => {
  let button = document.querySelector("#btn");

  button.addEventListener("click", calculateBMI);
};

function calculateBMI() {
  let heightInput = document.querySelector("#height");
  let weightInput = document.querySelector("#weight");
  let result = document.querySelector("#result");

  let height = parseFloat(heightInput.value);
  let weight = parseFloat(weightInput.value);

  if (isNaN(height) || height <= 0) {
    result.innerHTML = "<span class=\"error\">Please provide a valid height!</span>";
    return;
  } else if (isNaN(weight) || weight <= 0) {
    result.innerHTML = "<span class=\"error\">Please provide a valid weight!</span>";
    return;
  }
  else {
    let bmi = (weight / ((height / 100) * (height / 100))).toFixed(2); // Corrected BMI calculation

    let weightClass = "";
    if (bmi < 18.5) {
      weightClass = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      weightClass = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      weightClass = "Overweight";
    } else {
      weightClass = "Obese";
    }
    result.innerHTML = `BMI: <span>${bmi}</span><br>Weight Class: <span>${weightClass}</span>`;
  }
}
