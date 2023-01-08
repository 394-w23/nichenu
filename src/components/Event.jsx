import './Event.css'
export const parseAlarmTimeString = (alarmObj) => {
    const alarmHour = parseInt(alarmObj.getHours());
  
    let displayHour;
  
    if (alarmHour % 12 === 0) {
      displayHour = 12;
    } else {
      displayHour = alarmHour % 12;
    };
  
    return String(displayHour).padStart(2, '0') + ":" + String(alarmObj.getMinutes()).padStart(2, '0') + " " + ((alarmHour >= 12) ? "PM" : "AM");
  };

const Event = ({ event }) => {
    const months = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const start = new Date(event.start_timestamp);
    const end = new Date(event.end_timestamp);

    return (
        <div className="event-card">
            <div className="calendar">
                <div className="calendar-month">{months[start.getMonth()]}</div>
                <div className="calendar-day">{start.getDate()}</div>
            </div>
            <div className="event-info">
                <div className="event-name">{event.name}</div>
                <div>
                    {parseAlarmTimeString(start)} - {parseAlarmTimeString(end)}
                </div>
            </div>
        </div>
    );
}

export default Event;