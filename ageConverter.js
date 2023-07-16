let currentDate;

function calculateAge() {
    currentDate = new Date();
    const birthDate = getBirthDate();
    const ageInMilliseconds = currentDate - birthDate;
    const age = calculateAgeComponents(ageInMilliseconds);
    displayAge(age);
  }

  function getBirthDate() {
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    try {
      validateInput(day, 1, 31, month, year, day.id);
    } catch (error) {
      console.error(error.message);
    }

    try {
      validateInput(month, 1, 12, month, year, month.id);
    } catch (error) {
      console.error(error.message);
    }

    try {
      validateInput(year, currentDate.getFullYear() - 123, currentDate.getFullYear(), month, year, year.id); // 122 years 164 days oldest person registered
    } catch (error) {
      console.error(error.message);
    }

    return new Date(year.valueAsNumber, month.valueAsNumber - 1, day.valueAsNumber);
  }

  function validateInput(value, minValue = 1, maxValue = 0, month = 0, year = 0, fieldType = "") {
    const valueNumber = value.valueAsNumber;

    if (fieldType == 'day') {
      maxValue = monthSelection(month, year);
    }

    if (isNaN(valueNumber)){
      throw new Error(`The ${fieldType} field is required`);
    }
  
    if (valueNumber < minValue || valueNumber > maxValue) {
      if (valueNumber < minValue && fieldType === "year") {
        throw new Error(`You are the oldest living person! Apply for your application at the Guinness Book of World Records with the following link: [Apply for record!](https://www.guinnessworldrecords.com/search/applicationrecordsearch?term=%2A&contentType=record)`);
      }
      if (fieldType === "year") {
        throw new Error("Must be in the past");
      }
      throw new Error(`Must be a valid ${fieldType}`);
    }

    return null;
  }

  function monthSelection(month, year){
    let maxValue;

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
  

/*
 * Error Messages:
 * The error object contains the "error" property with the respective error message.
 * - "The ${fieldType} field is required"
 * - "Must be in the past"
 * - "Must be a valid ${fieldType}"
 * - "You are the oldest living person! Apply for your application at the Guinness Book of World Records with the following link: [Apply for record!](https://www.guinnessworldrecords.com/search/applicationrecordsearch?term=%2A&contentType=record)"
 */