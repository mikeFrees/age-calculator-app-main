function calculateAge() {
    const currentDate = new Date();
    const birthDate = getBirthDate();
    const ageInMilliseconds = currentDate - birthDate;
    const age = calculateAgeComponents(ageInMilliseconds);
    displayAge(age);
  }

  function getBirthDate() {
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    if (!validateInputDay(day) || !validateInputMonth(month) || !validateInputYear(year, currentDate)) {
        // error message needed
        return;
    }

    return new Date(year.valueAsNumber, month.valueAsNumber - 1, day.valueAsNumber);
  }

  function validateInputDay(inputElement) {
    const value = inputElement.valueAsNumber;
    if (isNaN(value)) {
        return false;
    }
    if (value < 1) {
        return false;
    }
    if (value > 31) {
        return false;
    }
    return true;
  }

  function validateInputMonth(inputElement) {
    const value = inputElement.valueAsNumber;
    if (isNaN(value)) {
        return false;
    }
    if (value < 1) {
        return false;
    }
    if (value > 12) {
        return false;
    }
    return true;
  }

  function validateInputYear(inputElement, currentDate) {
    const value = inputElement.valueAsNumber;
    if (isNaN(value)) {
        return false;
    }
    if (value < 0) {
        return false;
    }
    if (value > currentDate.getYear()) {
        return false;
    }
    return true;
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
  