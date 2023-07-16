function ConvertAge(){
    const day = document.getElementById("day").valueAsNumber;
    const month = document.getElementById("month").valueAsNumber - 1;
    const year = document.getElementById("year").valueAsNumber;
	const birthDate = new Date(year, month, day);
    const currentDate = new Date();
    const age = {years:0, months:0, days:0};
    let difference = new Date().setMilliseconds(currentDate.getTime() - birthDate.getTime());
    age.years = difference.getFullYear();
    age.months = difference.getMonth();
    age.days = difference.getDate();
    console.log(age);
}