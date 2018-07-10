function formatNumber(n) {
  var num = n.toString();
  return num[1] ? num : (0 + num);
}

function formatTime(time, type) {
  var date = new Date(time * 1000);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
  var time = [year, month, day].map(formatNumber).join('.');
  switch (type) {
    case 1:
      time += ` ${[hour, minute].map(formatNumber).join(':')}`;
      break;
    case 2:
      time += ` ${[hour, minute, second].map(formatNumber).join(':')}`;
      break;
    default:
      break;
  }
  return time;
}

module.exports = {
  formatTime
}
