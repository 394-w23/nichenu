import { useDbData } from "../../firebase";

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

//TODO: move and refactor this so that it is more accessible to other parts of the UI
export const findUserDisplayName = (uid) => {
    const [data, error] = useDbData("/");
    // if (error) return <h1>Error loading data: {error.toString()}</h1>;
    // if (data === undefined) return <h1>Loading data...</h1>;
    // if (!data) return <h1>No data found</h1>;
    return Object.values(data.usrs).filter(user => user.uid === uid)[0].display_name;

}