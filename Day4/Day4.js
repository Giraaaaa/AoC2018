let fs = require('fs');

fs.readFile('input.txt', 'utf8', handlep2);

function handlep1(err, cont) {
    let guardstime = {};
    let currentguard = 0;
    cont = cont.split("\n");
    cont = cont.map(a => a.split(":"));
    cont = parseDates(cont);
    cont = cont.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < cont.length; i += 1) {
        let tijdstip = cont[i];
        if (tijdstip[1].includes("Guard")) {
            currentguard = parseInt(tijdstip[1].slice(11, 15));
            if (!(currentguard in guardstime))
            {
                guardstime[currentguard] = 0;
            }
        }
        else if (tijdstip[1].includes("asleep")) {
            let startmin = tijdstip[0].getMinutes();
            let endmin = cont[i+1][0].getMinutes();
            let totaltime = startmin < endmin ? endmin - startmin : (60-startmin) + endmin;
            guardstime[currentguard] += totaltime;
        }
    }
    let mostsleep = Object.keys(guardstime).reduce((a, b) => guardstime[a] > guardstime[b] ? a : b);
    // guard that has slept the most
    // Now loop again to determine minutes
    let minutesmap = {};
    let relevant = false;
    for (let i = 0; i < cont.length; i += 1) {
        let tijdstip = cont[i];
        if (tijdstip[1].includes(mostsleep)) {
            relevant = true;
        }
        else if (tijdstip[1].includes("Guard")) {
                relevant = false;
        }
        else if (tijdstip[1].includes("asleep") && relevant) {
            let startmin = tijdstip[0].getMinutes();
            let endmin = cont[i+1][0].getMinutes();
            if (startmin < endmin) {
                for (let j = startmin; j < endmin; j += 1) {
                    if (!(j in minutesmap)) {
                        minutesmap[j] = 1;
                    } else { minutesmap[j] += 1;}
                }
            } else {
                for (let j = startmin; j < 60; j += 1) {
                    if (!(j in minutesmap)) {
                        minutesmap[j] = 1;
                    } else { minutesmap[j] += 1;}
                }
                for (let j = 0; j < endmin; j += 1) {
                    if (!(j in minutesmap)) {
                        minutesmap[j] = 1;
                    } else { minutesmap[j] += 1;}
                }
            }
        }
    }
    let mostminute = Object.keys(minutesmap).reduce((a, b) => minutesmap[a] > minutesmap[b] ? a : b);
    console.log(mostminute * mostsleep);
}

function handlep2(err, cont) {
    let guardstime = {};
    let currentguard = 0;
    cont = cont.split("\n");
    cont = cont.map(a => a.split(":"));
    cont = parseDates(cont);
    cont = cont.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < cont.length; i += 1) {
        let tijdstip = cont[i];
        if (tijdstip[1].includes("Guard")) {
            currentguard = parseInt(tijdstip[1].slice(11, 15));
            if (!(currentguard in guardstime))
            {
                guardstime[currentguard] = 0;
            }
        }
    }
    let mostfrequentamount = 0;
    let mostfrequentguard = 0;
    let mostfrequentmin = 0;
    for (let guard in guardstime) {
        let minutesmap = {};
        let relevant = false;
        for (let i = 0; i < cont.length; i += 1) {
            let tijdstip = cont[i];
            if (tijdstip[1].includes(guard)) {
                relevant = true;
            }
            else if (tijdstip[1].includes("Guard")) {
                relevant = false;
            }
            else if (tijdstip[1].includes("asleep") && relevant) {
                let startmin = tijdstip[0].getMinutes();
                let endmin = cont[i + 1][0].getMinutes();
                if (startmin < endmin) {
                    for (let j = startmin; j < endmin; j += 1) {
                        if (!(j in minutesmap)) {
                            minutesmap[j] = 1;
                        } else {
                            minutesmap[j] += 1;
                        }
                    }
                } else {
                    for (let j = startmin; j < 60; j += 1) {
                        if (!(j in minutesmap)) {
                            minutesmap[j] = 1;
                        } else {
                            minutesmap[j] += 1;
                        }
                    }
                    for (let j = 0; j < endmin; j += 1) {
                        if (!(j in minutesmap)) {
                            minutesmap[j] = 1;
                        } else {
                            minutesmap[j] += 1;
                        }
                    }
                }
            }
        }
        if (Object.keys(minutesmap).length === 0) {
            continue;
        } else {
            let frequentminute = Object.keys(minutesmap).reduce((a, b) => minutesmap[a] > minutesmap[b] ? a : b);
            if (minutesmap[frequentminute] > mostfrequentamount) {
                 mostfrequentamount = minutesmap[frequentminute];
                 mostfrequentguard = guard;
                 mostfrequentmin = frequentminute;
            }
        }
    }
    console.log(mostfrequentguard);
    console.log(mostfrequentmin);
}

function parseDates(cont) {
    for (let i = 0; i < cont.length; i += 1) {
        let date = cont[i][0].slice(1, 11);
        let hour = cont[i][0].slice(12);
        let minutes = cont[i][1].slice(0, 2);
        date += " " + hour + ":" + minutes;
        let test = new Date(date);
        cont[i][0] = test;
    }
    return cont;
}