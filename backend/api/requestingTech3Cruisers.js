console.log("grabbing all of the tech 3 cruisers");
const axios = require('axios');

const lokiArray = [29990];
const shipName = "Loki";
let page = 1;
let zkillData = [];
const subsystemIDArr = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633, 45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597, 45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621, 45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609]

const getLokis = async () => {
    if (page === 11) {
        return;
    }
    console.log("looping through zkill");
    axios.get(`https://zkillboard.com/api/losses/shipTypeID/${lokiArray[0]}/page/${page}/`, headers = { 'User-agent': 'Johnson Kanjus - evesubsystemanalysis.com' })
        .catch(err => {
            if (err) {
                console.log("error on line 18 page " + page);
                return;
            }
        })
        .then(response => {
            if (response) {
                zkillData.push(response.data);
                if(page === 10){
                    zkillData = [].concat.apply([], zkillData);
                    getEsiData(zkillData);
                }
                setTimeout(() => {
                    page++;
                    getLokis();
                }, 1000);
            }
        })
}

getLokis();

let esiData = [];

let subsystems = {
    "45622": 0,
    "45623": 0,
    "45624": 0,
    "45625": 0,
    "45626": 0,
    "45627": 0,
    "45628": 0,
    "45629": 0,
    "45630": 0,
    "45631": 0,
    "45632": 0,
    "45633": 0,
    "45586": 0,
    "45587": 0,
    "45588": 0,
    "45589": 0,
    "45590": 0,
    "45591": 0,
    "45592": 0,
    "45593": 0,
    "45594": 0,
    "45595": 0,
    "45596": 0,
    "45597": 0,
    "45610": 0,
    "45611": 0,
    "45612": 0,
    "45613": 0,
    "45614": 0,
    "45615": 0,
    "45616": 0,
    "45617": 0,
    "45618": 0,
    "45619": 0,
    "45620": 0,
    "45621": 0,
    "45598": 0,
    "45599": 0,
    "45600": 0,
    "45601": 0,
    "45602": 0,
    "45603": 0,
    "45604": 0,
    "45605": 0,
    "45606": 0,
    "45607": 0,
    "45608": 0,
    "45609": 0
}

let esiRequests = 0;
const getEsiData = (zkillData) => {
    console.log(`fetching esi info for ${zkillData.length} dead ${shipName}s hnnngggg`);
    zkillData.forEach(kill => {
        axios.get(`https://esi.evetech.net/latest/killmails/${kill.killmail_id}/${kill.zkb.hash}/?datasource=tranquility`)
            .catch(err => {
                console.log("error on line 98");
            })
            .then(response => {
                if (response) {
                    esiRequests += 1;
                    response.data.victim.items.forEach(item => {
                        if (subsystemIDArr.includes(item.item_type_id)) {
                            subsystems[item.item_type_id] += 1;
                        }
                    })
                    if (esiRequests === zkillData.length - 1) {
                        console.log("done");
                        for(let subsystem in subsystems){
                            axios.get(`https://esi.evetech.net/latest/universe/types/${subsystem}/?datasource=tranquility`)
                                .catch(err => {
                                    console.log("error on line 115");
                                })
                                .then(response => {
                                    if(response){
                                        subsystems[response.data.name] = subsystems[subsystem];
                                        delete subsystems[subsystem];
                                        subsystems = Object.fromEntries(
                                            Object.entries(subsystems).sort(([,a],[,b]) => b-a)
                                        );
                                        console.log(subsystems);
                                    }
                                })
                        }
                    }
                }
            })
    })
}
