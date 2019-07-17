let fs = require('fs');

fs.readFile('input.txt', 'utf8', handlep2);


function handlep1(err, cont) {
    console.log(doReactions(cont.replace("\n", "")));
}

function doReactions(str) {
    let tmp = str;
    for (let i =0; i < tmp.length-1; i += 1) {
        if (tmp[i] !== tmp[i+1] && tmp[i].toLowerCase() === tmp[i+1].toLowerCase()) {
            tmp = tmp.slice(0, i) + tmp.slice(i+2)
        }
    }
    if (str.length === tmp.length) {
        return str.length;
    }
    else {
        return doReactions(tmp);
    }
}

function handlep2(err, cont) {
    let units = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let minlength = cont.length;
    for (let unit of units) {
        let tmp = cont.replace(new RegExp(unit, 'g'), "").replace(new RegExp(unit.toLowerCase(), 'g'), "");
        let testlength = doReactions(tmp);
        minlength = testlength < minlength ? testlength : minlength;
    }
    console.log(minlength);
}

