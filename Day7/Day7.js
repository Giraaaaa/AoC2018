let fs = require('fs');

fs.readFile('input.txt', 'utf8', handlep1);

function handlep1(err, cont) {
    let incoming = {};
    let outgoing = {};
    cont = cont.split("\n");
    for (let line of cont) {
        line = line.split(" ");
        let finished = line[1];
        let canbegin = line[7];
        if (canbegin in incoming) {
            incoming[canbegin].add(finished);
        } else {
            incoming[canbegin] = new Set(finished);
        }
        // Make sure we also include the steps that do not depend on any other
        if (!(finished in incoming)) {
            incoming[finished] = new Set();
        }
        if (finished in outgoing) {
            outgoing[finished].add(canbegin);
        } else {
            outgoing[finished] = new Set(canbegin);
        }
    }
    let noincoming = Object.keys(incoming).filter(a => incoming[a].size === 0).sort();
    let sortering = [];
    while (!(noincoming.length === 0)) {
        noincoming.sort();
        let current = noincoming.shift();
        sortering.push(current);
        if (outgoing[current] === undefined) { break; }
        for (let node of Array.from(outgoing[current])) {
            outgoing[current].delete(node);
            incoming[node].delete(current);
            if (incoming[node].size === 0) {
                noincoming.push(node);
            }
        }
    }
    console.log(sortering.join(""));
}