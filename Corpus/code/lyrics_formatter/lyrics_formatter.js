var fs = require('fs');
var os = require('os');

final_lyric = ""

read_lyric = fs.readFileSync("input.txt");
read_lyric = read_lyric.split("\n");

for (let line in read_lyric):