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

    const dayIsValid = validateInput(day, month, year);
    const monthIsValid = validateInput(month, 12);
    const yearIsValid = validateInput(year, currentDate.getFullYear() - 123, currentDate.getFullYear()); // 122 years 164 days oldest person registered

    return new Date(year.valueAsNumber, month.valueAsNumber - 1, day.valueAsNumber);
  }

  function validateInput(value, month = 0, year = 0, minValue = 1, maxValue = 0) {
    const valueNumber = value.valueAsNumber;
    if (value.id == 'day') {
      maxValue = monthSelection(month, year);
    }

    if (!isNaN(valueNumber)){
      return "This field is required";
    }

    if (valueNumber < minValue || valueNumber > maxValue) {
      if (valueNumber > maxValue && value.id == "year") {
        return "You are the oldest living person! apply for your application at the guines book of world records with the following link. https://www.guinnessworldrecords.com/search/applicationrecordsearch?term=%2A&contentType=record";
      }
      return `Must be a valid ${value.id}`
    }

    return;
  }

  function monthSelection(month, year){
    switch (month.valueAsNumber) {
      //month selection
      case 2:
        maxValue = 28;
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
    //leap year calculation
    if ((0 == year.valueAsNumber % 4) && (0 != year.valueAsNumber % 100) || (0 == year.valueAsNumber % 400)) {
      maxValue = 29;
    }
    return maxValue;
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
  