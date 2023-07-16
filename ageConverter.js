function calculateAge() {
    const birthDate = validateInput();
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const age = calculateAgeComponents(ageInMilliseconds);
    displayAge(age);
  }

  function validateInput() {
    const day = document.getElementById("day").valueAsNumber;
    const month = document.getElementById("month").valueAsNumber - 1;
    const year = document.getElementById("year").valueAsNumber;

    return new Date(year, month, day);
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
  