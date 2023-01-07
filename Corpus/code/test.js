var fs = require('fs');

let files = fs.readdirSync("./song");

// a = {
//     "title": "",
//     "year": "",
//     "album": "",
//     "artist": "",
//     "lyrics": "",
//     "lyricist": "",
//     "metaphors": [],
// };

// b = {
//     "songPart": "",
//     "interpretaion": "",
//     "type": "",
//     "sourceDomain": "",
//     "targetDomain": "",
// };

for (let file of files) {

    let json = JSON.parse(fs.readFileSync(`./song/${file}`).toString());
    let a = JSON.parse(fs.readFileSync(`../all_songs/${file}`).toString());

    a.title = json.title
    a.released_year = json.year
    a.album = json.album
    a.singer = json.artist
    a.lyrics = json.lyrics
    a.lyricist = json.lyricist
    for (let x of json.metaphors) {
        b = {
            "lyrics_part": "",
            "meaning": "",
            "type": "",
            "source_domain": "",
            "target_domain": "",
        };

        b.lyrics_part = x.songPart
        b.meaning = x.interpretation
        b.type = x.type
        b.source_domain = x.sourceDomain
        b.target_domain = x.targetDomain

        a.metaphor.push(b)
    }

    fs.writeFileSync(`../all_songs/${file}`, JSON.stringify(a))
}