import { useDbData } from "./firebase";

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

// export const findUserProfilePicture = (uid,users) => {
//     // if (error) return <h1>Error loading data: {error.toString()}</h1>;
//     // if (data === undefined) return <h1>Loading data...</h1>;
//     // if (!data) return <h1>No data found</h1>;
//     //return "Dave"
//    return Object.values(users).filter(user => user.id === uid)[0].name;

// }

// TODO: Make output not save just Dave
export const findUserDisplayName = (uid,users) => {
    // if (error) return <h1>Error loading data: {error.toString()}</h1>;
    // if (data === undefined) return <h1>Loading data...</h1>;
    // if (!data) return <h1>No data found</h1>;
    //return "Dave"
   return Object.values(users).filter(user => user.id === uid)[0].name;

}