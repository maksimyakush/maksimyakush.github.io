export function getDayOfWeek(a) {
  let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
  return week[a];
}

export function weekShort(a) {
  let week = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"]; 
  return week[a];
}

export function getMonthOfYear(a) {
  let year = ["January",  "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
  return year[a];
}

export function msToTime(duration) {
  let minutes = parseInt((duration/(1000 * 60)) % 60);
  let hours = parseInt((duration/(1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  return `${hours} hr ${minutes} min`;
}

export function beautifyTime(hrs, mins) {
  return `${hrs} hrs ${mins} mins`;
}

export function stringifyWeekMode(a) {
  return `${getMonthOfYear(a.getMonth())} ${a.getDate()}`
}

export function startTime(hrs, mins) {
  return `${hrs}:${mins}`;
}

