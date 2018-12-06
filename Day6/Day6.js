let fs = require('fs');

fs.readFile('input.txt', 'utf8', handlep1);
fs.readFile('input.txt', 'utf8', handlep2);

function handlep1(err, cont) {
    let areas = {};
    let infiniteareas = new Set();
    cont = cont.split("\n");
    cont = cont.map((a) => a.split(","));
    cont = cont.map(a => a.map(b => parseInt(b)));
    let xsort = cont.sort((a, b) => a[0] - b[0]);
    let minx = xsort[0][0];
    let maxx = xsort[xsort.length - 1][0];
    let ysort = cont.sort((a, b) => a[1] - b[1]);
    let miny = ysort[0][1];
    let maxy = ysort[ysort.length - 1][1];
    for (let i = minx; i <= maxx; i += 1) {
        for (let j = miny; j <= maxy; j += 1) {
            let dst = Number.MAX_SAFE_INTEGER;
            let closestcoord = null;
            let multiple = false;
            for (let coordinate of cont) {
                let newdst = Math.abs(i - coordinate[0]) + Math.abs(j - coordinate[1]);
                if (newdst < dst) {
                    dst = newdst;
                    closestcoord = coordinate;
                    multiple = false;
                } else if (newdst === dst) {multiple = true; }
            }
            if (!multiple) {
                if (closestcoord.toString() in areas) {
                    areas[closestcoord.toString()] += 1
                } else {
                    areas[closestcoord.toString()] = 1
                }
            }
            if (i === minx || i === maxx || j === miny || j === maxy) {
                infiniteareas.add(closestcoord.toString());
            }
        }
    }
    while (true) {
        let largest = Object.keys(areas).reduce(function(a, b){ return areas[a] > areas[b] ? a : b });
        if (infiniteareas.has(largest.toString())) {
            delete areas[largest];
        }
        else {
            console.log(areas[largest]);
            break;
        }
    }
}function handlep2(err, cont) {
    let areas = {};
    let infiniteareas = new Set();
    cont = cont.split("\n");
    cont = cont.map((a) => a.split(","));
    cont = cont.map(a => a.map(b => parseInt(b)));
    let xsort = cont.sort((a, b) => a[0] - b[0]);
    let minx = xsort[0][0];
    let maxx = xsort[xsort.length - 1][0];
    let ysort = cont.sort((a, b) => a[1] - b[1]);
    let miny = ysort[0][1];
    let maxy = ysort[ysort.length - 1][1];
    let total = 0;
    for (let i = minx - 10000/cont.length; i <= maxx + 10000/cont.length; i += 1) {
        for (let j = miny - 10000/cont.length; j <= maxy + 10000/cont.length; j += 1) {
            let dst = 0;
            for (let coordinate of cont) {
                let newdst = Math.abs(i - coordinate[0]) + Math.abs(j - coordinate[1]);
                dst += newdst;
            }
            if (dst < 10000) {
                total += 1;
            }
        }
    }
    console.log(total);
}
