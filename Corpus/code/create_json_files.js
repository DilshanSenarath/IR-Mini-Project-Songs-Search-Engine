var fs = require('fs');

required_json_structure = {
    "title": "",
    "released_year": "",
    "album": "",
    "genre": "",
    "lyrics": "",
    "lyricist": "",
    "musician": "",
    "singer": "",
    "mp3_listen": {
        "songhub": "",
        "spotify": "",
        "apple": "",
    },
    "video_watch": "",
    "download": "",
    "metaphor": [
        {
            "lyrics_part": "",
            "meaning": "",
            "type": "",
            "source_domain": "",
            "target_domain": "",
        }
    ],
};

let jsonString = JSON.stringify(required_json_structure);

// Read the selected_songs.txt file
let songs = fs.readFileSync("../selected_songs.txt").toString();
songs = songs.split("\n");

function containsDuplicates(array) {
    if (array.length !== new Set(array).size) {
        console.log(new Set(array).size)
        return true;
    }

    return false;
}

console.log(containsDuplicates(songs))

// Write json structure for files
// let counter = 0;
// for (let song_title of songs) {
//     counter = counter + 1;
//     fs.writeFileSync(`../all_songs/${counter}_${song_title}.json`, jsonString);
// }
