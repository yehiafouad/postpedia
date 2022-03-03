import moment from "moment";

export function formatTime(time) {
  if (time === "") {
    return "";
  }
  return moment(time).format("hh:mm A");
}

export function formatDate(date) {
  if (!date) {
    return "";
  }
  return moment(date).format("DD-MM-YYYY");
}

export function stringToDate(date) {
  return moment(date, "DD-MM-YYYY").format();
}

export function timeToDate(date, time) {
  if (date !== "" && time === "") {
    return date;
  } else if (time !== "" && date === "") {
    return time;
  }
  return moment(`${date} ${time}`, "DD-MM-YYYY hh:mm A").format();
}

export function fromatDateTime(datetime) {
  return moment(datetime).format("DD-MM-YYYY hh:mm A");
}

export function nOfDaysBetween(date1, date2) {
  const a = moment(date1).startOf("day");
  const b = moment(date2).startOf("day");

  return Math.abs(a.diff(b, "day"));
}
