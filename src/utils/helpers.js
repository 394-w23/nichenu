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

export const findUserProfilePicture = (uid,users) => {
   return Object.values(users).filter(user => user.id === uid)[0].profilePicture;

}

// TODO: Make output not save just Dave
export const findUserDisplayName = (uid,users) => {
    // if (error) return <h1>Error loading data: {error.toString()}</h1>;
    // if (data === undefined) return <h1>Loading data...</h1>;
    // if (!data) return <h1>No data found</h1>;
    //return "Dave"
   return Object.values(users).filter(user => user.id === uid)[0].name;
}

// TAG COLORINGS!!!
const textColors=["#37352F","#9B9A97","#64473A","#D9730D","#DFAB01","#0F7B6C","#0B6E99","#6940A5","#AD1A72","#E03E3E"]
const bgColors=["#FFFFFF","#EBECED","#E9E5E3","#FAEBDD","#FBF3DB","#DDEDEA","#DDEBF1","#EAE4F2","#F4DFEB","#FBE4E4"]
export const tagToColor = { "academic": textColors[2], "animals": textColors[2], "arts": textColors[2], "board-games": textColors[3], "books": textColors[3], "clothing": textColors[3], "collecting": textColors[4], "crafts": textColors[4], "dance": textColors[4], "fitness": textColors[5], "food": textColors[5], "garden": textColors[5], "indoor": textColors[6], "making": textColors[6], "music": textColors[6], "nature": textColors[7], "niche": textColors[7], "outdoor": textColors[7], "social": textColors[8], "sports": textColors[8], "tv-film": textColors[8], "theatre": textColors[8], "travel": textColors[9], "video-games": textColors[9], "visual": textColors[9], "volunteer": textColors[9] }
export const tagToBgColor = { "academic": bgColors[2], "animals": bgColors[2], "arts": bgColors[2], "board-games": bgColors[3], "books": bgColors[3], "clothing": bgColors[3], "collecting": bgColors[4], "crafts": bgColors[4], "dance": bgColors[4], "fitness": bgColors[5], "food": bgColors[5], "garden": bgColors[5], "indoor": bgColors[6], "making": bgColors[6], "music": bgColors[6], "nature": bgColors[7], "niche": bgColors[7], "outdoor": bgColors[7], "social": bgColors[8], "sports": bgColors[8], "tv-film": bgColors[8], "theatre": bgColors[8], "travel": bgColors[9], "video-games": bgColors[9], "visual": bgColors[9], "volunteer": bgColors[9] }
// const tagsToName

export const tagToName={"academic": "Academic", "animals": "Animals", "arts": "Arts", "board-games": "Board Games", "books": "Books", "clothing": "Clothing", "collecting": "Collecting", "crafts": "Crafts", "dance": "Dance", "fitness": "Fitness", "food": "Food", "garden": "Garden", "indoor": "Indoor", "making": "Making", "music": "Music", "nature": "Nature", "niche": "Niche", "outdoor": "Outdoor", "social": "Social", "sports": "Sports", "tv-film": "TV & Film", "theatre": "Theatre", "travel": "Travel", "video-games": "Video Games", "visual": "Visual", "volunteer": "Volunteer" }
export const nameToTags={"Academic": "academic", "Animals": "animals", "Arts": "arts", "Board Games": "board-games", "Books": "books", "Clothing": "clothing", "Collecting": "collecting", "Crafts": "crafts", "Dance": "dance", "Fitness": "fitness", "Food": "food", "Garden": "garden", "Indoor": "indoor", "Making": "making", "Music": "music", "Nature": "nature", "Niche": "niche", "Outdoor": "outdoor", "Social": "social", "Sports": "sports", "TV & Film": "tv-film", "Theatre": "theatre", "Travel": "travel", "Video Games": "video-games", "Visual": "visual", "Volunteer": "volunteer"}