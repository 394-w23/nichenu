export const parseTimeString = (dateObj) => {
    const alarmHour = parseInt(dateObj.getHours());
  
    let displayHour;
  
    if (alarmHour % 12 === 0) {
      displayHour = 12;
    } else {
      displayHour = alarmHour % 12;
    };
  
    return String(displayHour).padStart(2, '0') + ":" + String(dateObj.getMinutes()).padStart(2, '0') + " " + ((alarmHour >= 12) ? "PM" : "AM");
  };