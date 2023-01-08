const fs = require('fs');
const { stringify } = require("csv-stringify");

// Function for shuffling an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

let song_files = fs.readdirSync("../all_songs");

// Shuffle songs list
// song_files = shuffleArray(song_files);

const songs_list = [];
let count = 0;
for (let file of song_files) {
    count = count + 1;
    song = JSON.parse(fs.readFileSync(`../all_songs/${file}`).toString());
    song.id = `S-${count.toString().padStart(3, '0')}`;
    songs_list.push(song);
}

const filename = "../final_csv/corpus.csv";
const writableStream = fs.createWriteStream(filename);

const columns = [
    "id",
    "title",
    "album",
    "genre",
    "lyrics",
    "lyricist",
    "musician",
    "singer",
    "mp3_listen_spotify",
    "mp3_listen_apple",
    "mp3_listen_songhub",
    "watch_video",
    "download",
    "metaphor_1_lyrics_part",
    "metaphor_1_meaning",
    "metaphor_1_type",
    "metaphor_1_source_domain",
    "metaphor_1_target_domain",
    "metaphor_2_lyrics_part",
    "metaphor_2_meaning",
    "metaphor_2_type",
    "metaphor_2_source_domain",
    "metaphor_2_target_domain",
    "metaphor_3_lyrics_part",
    "metaphor_3_meaning",
    "metaphor_3_type",
    "metaphor_3_source_domain",
    "metaphor_3_target_domain",
    "metaphor_4_lyrics_part",
    "metaphor_4_meaning",
    "metaphor_4_type",
    "metaphor_4_source_domain",
    "metaphor_4_target_domain",
    "metaphor_5_lyrics_part",
    "metaphor_5_meaning",
    "metaphor_5_type",
    "metaphor_5_source_domain",
    "metaphor_5_target_domain",
];

const stringifier = stringify({ header: true, columns: columns });

for (let song of songs_list) {
    row = [];
    row.push(song.id);
    row.push(song.title);
    row.push(song.album);
    row.push(song.genre);
    row.push(song.lyrics);
    row.push(song.lyricist);
    row.push(song.musician);
    row.push(song.singer);
    row.push(song.mp3_listen.spotify);
    row.push(song.mp3_listen.apple);
    row.push(song.mp3_listen.songhub);
    row.push(song.video_watch);
    row.push(song.download);

    for (let m of song.metaphor) {
        row.push(m.lyrics_part);
        row.push(m.meaning);
        row.push(m.type);
        row.push(m.source_domain);
        row.push(m.target_domain);
    }
    for (let i = 0; i < 5 - song.metaphor.length; i++) {
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
    }

    stringifier.write(row);
    break;
}

stringifier.pipe(writableStream);