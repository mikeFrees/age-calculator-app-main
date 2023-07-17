let currentDate;

function calculateAge() {
    resetResult();
    currentDate = new Date();
    const birthDate = getBirthDate();
    if(!birthDate){return;}
    const ageInMilliseconds = currentDate - birthDate;
    const age = calculateAgeComponents(ageInMilliseconds);
    displayAge(age);
  }

  function resetResult() {
    document.getElementById("years").textContent = "--";
    document.getElementById("months").textContent = "--";
    document.getElementById("days").textContent = "--";
  }

  function getBirthDate() {
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    let errorPresent = false;

    try {
      validateInput(day, 1, 31, month, year, day.id);
      clearErrorMessage(day.id)
    } catch (error) {
      errorPresent = true;
      displayError(day.id, error.message);
    }

    try {
      validateInput(month, 1, 12, month, year, month.id);
      clearErrorMessage(month.id)
    } catch (error) {
      errorPresent = true;
      displayError(month.id, error.message);
    }

    try {
      validateInput(year, currentDate.getFullYear() - 122, currentDate.getFullYear(), month, year, year.id); // 122 years 164 days oldest person registered
      clearErrorMessage(year.id)
    } catch (error) {
      if (error.message === "Oldest" && !errorPresent){ 
        displayError(year.id, `You are the oldest living person! Apply for your application at the Guinness Book of World Records with the following link: <a href="https://www.guinnessworldrecords.com/search/applicationrecordsearch?term=%2A&contentType=record" target="_blank">Apply for record!</a>`);
      } else if(error.message === "Oldest") { 
        return;
      } else {
      errorPresent = true;
      displayError(year.id, error.message);
      }
    }

    if(errorPresent) {
      return null;
    }

    return new Date(year.valueAsNumber, month.valueAsNumber - 1, day.valueAsNumber);
  }

  function validateInput(value, minValue, maxValue, month, year, fieldType) {
    const valueNumber = value.valueAsNumber;

    if (fieldType === 'day') {
      maxValue = monthSelection(month);
    }

    if (isNaN(valueNumber)){
      throw new Error(`The ${fieldType} field is required`);
    }
  
    if (valueNumber < minValue || valueNumber > maxValue) {
      if (valueNumber < minValue && fieldType === "year") {
        throw new Error("Oldest");
      } else if(fieldType === "year") {
        throw new Error("Must be in the past");
      }
      throw new Error(`Must be a valid ${fieldType}`);
    }

    return null;
  }

  function monthSelection(month){
    let maxValue;

    switch (month.valueAsNumber) {
      //month selection
      case 2:
        maxValue = isLeapYear ? 29 : 28;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        maxValue = 30;
        break;
      default:
        maxValue = 31;
        break;
    }

    return maxValue;
  }

  function isLeapYear() {
    if ((0 === year.valueAsNumber % 4) && (0 !== year.valueAsNumber % 100) || (0 === year.valueAsNumber % 400)) {
      return true;
    }
    return false;
  }
  
  function clearErrorMessage(fieldId) {
    const errorElement = document.querySelector(`.error.${fieldId}`);
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  function displayError(fieldId, errorMessage) {
    const errorElement = document.querySelector(`.error.${fieldId}`);
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
  }

  function calculateAgeComponents(milliseconds) {
    const msInYear = 31556952000;
    const msInMonth = 2629746000;
    const msInDay = 86400000;
  
    const years = Math.floor(milliseconds / msInYear);
    const months = Math.floor((milliseconds % msInYear) / msInMonth);
    const days = Math.ceil(((milliseconds % msInYear) % msInMonth) / msInDay);
  
    return { years, months, days };
  }
  
  function displayAge(age) {
    document.getElementById("years").innerHTML = age.years.toString();
    document.getElementById("months").innerHTML = age.months.toString();
    document.getElementById("days").innerHTML = age.days.toString();
  }