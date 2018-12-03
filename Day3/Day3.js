let fs = require('fs');

fs.readFile('input.txt', 'utf8', handlep1);
fs.readFile('input.txt', 'utf8', handlep2);

// a bit slow but it works
function handlep1(err, cont) {
    cont = cont.split('\n');
    let overlapping = 0;
    let alreadycounted = new Set();
    for (let i = 0; i < cont.length; i += 1) {
        for (let j = i+1; j < cont.length; j += 1) {
            //Determine if there are overlapping squares
            let fstclaim = cont[i];
            let sndclaim = cont[j];
            let fstdimensions = getDims(fstclaim);
            let snddimensions = getDims(sndclaim);
            for (let x = fstdimensions[0]; x < fstdimensions[1]; x += 1) {
                for (let y = fstdimensions[2]; y < fstdimensions[3]; y += 1) {
                    if (!alreadycounted.has([x, y].toString())) {
                        if (x >= snddimensions[0] && x < snddimensions[1]) {
                            if (y >= snddimensions[2] && y < snddimensions[3]) {
                                overlapping += 1;
                                alreadycounted.add([x, y].toString());
                            }
                        }
                    } else {}
                }
            }
        }
    }
    console.log(overlapping);
}

function getDims(claim) {
    claim = claim.split(" ");
    claim = claim.slice(2,4);
    let leftright = claim[0].split(",");
    let fromleft = parseInt(leftright[0]);
    let fromtop = parseInt(leftright[1].replace(":", ""));
    let dims = claim[1].split("x");
    let width = parseInt(dims[0]);
    let height = parseInt(dims[1]);
    return [fromleft, fromleft+width, fromtop, fromtop+height];
}

function handlep2(err, cont) {
    cont = cont.split('\n');
    for (let i = 0; i < cont.length; i += 1) {
        let overlap = false;
        for (let j = 0; j < cont.length; j += 1) {
            if (j !== i) {
                //Determine if there are overlapping squares
                let fstclaim = cont[i];
                let sndclaim = cont[j];
                let fstdimensions = getDims(fstclaim);
                let snddimensions = getDims(sndclaim);
                for (let x = fstdimensions[0]; x < fstdimensions[1]; x += 1) {
                    for (let y = fstdimensions[2]; y < fstdimensions[3]; y += 1) {
                        if (x >= snddimensions[0] && x < snddimensions[1]) {
                            if (y >= snddimensions[2] && y < snddimensions[3]) {
                                overlap = true;
                            }
                        }
                    }
                }
            }
        }
        if (!overlap) { console.log(cont[i])}
    }
}