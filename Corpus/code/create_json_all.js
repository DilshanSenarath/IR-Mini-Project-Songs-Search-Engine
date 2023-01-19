const fs = require('fs');

// Generate single json file with all songs

const index = {
    "index": {
        "_index": "songs-corpus"
    }
}

let song_files = fs.readdirSync("../all_songs");
let count = 0;
for (let file of song_files) {
    count = count + 1;
    song = JSON.parse(fs.readFileSync(`../all_songs/${file}`).toString());
    song.id = `${count}`; // Add an unique id
    if (count == 1) {
        fs.writeFileSync(`../../search-engine/indexing/songs.json`, JSON.stringify(index) + "\n" + JSON.stringify(song));
    } else if (count == song_files.length) {
        fs.appendFileSync(`../../search-engine/indexing/songs.json`, "\n" + JSON.stringify(index) + "\n" + JSON.stringify(song) + "\n");
    } else {
        fs.appendFileSync(`../../search-engine/indexing/songs.json`, "\n" + JSON.stringify(index) + "\n" + JSON.stringify(song));
    }
}