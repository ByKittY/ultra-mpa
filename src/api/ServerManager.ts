import axios from 'axios'

enum OutputType {
    RAW,
    CLEAN,
    HTML
}

export class ServerManager {
    readonly adress: string;
    readonly port: number;

    readonly debug: boolean;

    /**
     * @param adress ip adress for the server
     */
    constructor(adress: string) {
        this.adress = adress;

        this.debug = true;
    }

    /**
     * @example <ServerManager>.getPlayerCount().then((data) => console.log(data))
     * @returns current amount of players connected
     */
    getPlayerCount () {
        let p = new Promise((handle, reject) => {
            axios.get('https://api.mcsrvstat.us/2/' + this.adress).then((body) => {
                handle(body.data.players.online);
            }).catch((err) => {
                reject(err);
            }) 
        })

        this.debugMode('Found 0 errors. getPlayers has been used.');
        return p;
    }

    /**
     * @example <ServerManager>.getMaxPlayers().then((data) => console.log(data))
     * @returns max amount of players that can connect
     */
    getMaxPlayers() {
        let p = new Promise((handle, reject) => {
            axios.get('https://api.mcsrvstat.us/2/' + this.adress).then((body) => {
                handle(body.data.max);
            }).catch((err) => {
                reject(err);
            })
        })

        this.debugMode('Found 0 errors. getPlayers has been used.');
        return p;
    }

    /**
     * @example <ServerManager>.getStatus().then((data) => console.log(data))
     * @returns true or false
     */
    getStatus () {
        let p = new Promise((handle, reject) => {
            let x: boolean = false;
            axios.get('https://api.mcsrvstat.us/2/' + this.adress).then((body) => {
                if(body.data.online == true) x = true;
                handle(x);
            }).catch((err) => {
                reject(err);
            })
        })

        this.debugMode('Found 0 errors. getStatus has been used.');
        return p;
    }

    /**
     * @example <ServerManager>.getVersion().then((data) => console.log(data))
     * @returns supported versions
     */
    getVersion() {
        let p = new Promise((handle, reject) => {
            axios.get('https://api.mcsrvstat.us/2/' + this.adress).then((body) => {
                handle(body.data.version);
            }).catch((err) => {
                reject(err);
            })
        })

        this.debugMode('Found 0 errors. getVersion has been used.');
        return p;
    }

    /**
     * 
     * @param output output type
     * @returns server motd 
     */
    getMOTD(output: ServerManager.OutputTypeString) {
        let x: string;

        let p = new Promise((handle, reject) => {
            axios.get('https://api.mcsrvstat.us/2/' + this.adress).then((body) => {
                if(output === "RAW") {
                    x = body.data.motd.raw; 
                } else if(output === "CLEAN") {
                    x = body.data.motd.clean;
                } else {
                    x = body.data.motd.html
                }
                
                handle(x)
            }).catch((err) => {
                reject(err)
            })
        })

        this.debugMode('Found 0 errors. getMOTD has been used.');
        return p;
    }

    private debugMode(message: string) {
        if(this.debug) {
            let data = new Date();
            let [hour, minute, second] = [data.getHours(), data.getMinutes(), data.getSeconds()];
            console.log(`[\u001b[1;30m${hour}:${minute}:${second}\u001b[0;m] ` + message + '\n');
        }
    }
}

module ServerManager {
    export type OutputTypeString = keyof typeof OutputType;
}