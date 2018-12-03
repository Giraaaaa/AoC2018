let fs = require('fs');

fs.readFile("input.txt", "UTF-8", handlep1);
fs.readFile("input.txt", "UTF-8", handlep2());

function handlep1(err, cont) {
    // \r cuz Windows
    cont = cont.split("\r\n").map(i => parseInt(i));
    console.log(cont.reduce((i, j) => i+j, 0));
}


function handlep2(err, cont) {
    cont = cont.split("\r\n").map(i => parseInt(i));
    let frequencies = new Set();
    let freq = 0;
    let index = 0;
    //bit of a hack
    while (true) {
        index = (index+1) % cont.length;
        freq += cont[index];
        if (frequencies.has(freq)) {
            console.log(freq);
            break;
        }
        else {
            frequencies.add(freq);
        }
    }
}

