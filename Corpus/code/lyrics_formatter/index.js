var fs = require('fs');

final_lyric = ""

read_lyric = fs.readFileSync("./lyrics_formatter/input.txt").toString();
read_lyric = read_lyric.split("\n");

for (let i = 0; i < read_lyric.length; i++) {
    if (i == 0) {
        final_lyric = final_lyric + read_lyric[i]
    } else {
        final_lyric = final_lyric + "\\n" + read_lyric[i]
    }
}

fs.writeFileSync("./lyrics_formatter/output.txt", final_lyric)