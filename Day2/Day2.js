let fs = require('fs');

fs.readFile("input.txt", "UTF-8", handlep1);
fs.readFile("input.txt", "UTF-8", handlep2);


function handlep1(err, cont) {
    cont = cont.split("\r\n");
    let appearstwice = 0;
    let appearsthreetimes = 0;
    for (let word of cont) {
        let map = {};
        for (let letter of word) {
            if (letter in map) {
                map[letter] += 1;
            }
            else { map[letter] = 1}
        }
        for (let letter in map) {
            if (map[letter] === 3) {
                appearsthreetimes += 1;
                break;
            }
        }
        for (let letter in map) {
            if (map[letter] === 2) {
                appearstwice += 1;
                break;
            }
        }
    }
    console.log(appearstwice * appearsthreetimes);
}

function handlep2(err, cont) {
    cont = cont.split("\r\n");
    for (let word of cont) {
        for (let otherword of cont) {
            let different = 0;
            for (let i = 0; i < word.length; i += 1) {
                if (word[i] !== otherword[i]) {
                    different += 1;
                }
            }
            if (different === 1) {
                console.log((word.match(new RegExp('[' + otherword + ']', 'g')) || []).join(''))
            }
        }
    }
}