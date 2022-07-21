# `Minecraft Sunucu Üye sayısı`
Minecraft Sunucu üye sayısı API'si

## Installation
```bash
npm i ultra-mpa
```

## Örnek TypeScript
```ts
import { ServerManager } from 'ultra-mpa' // Import the package

let mc = new ServerManager('oyna.sunucu.com')

async function displayPlayers() {
    let players = await mc.getPlayerCount();
    let max = await mc.getMaxPlayers();
    return console.log(`${players}/${max}`)
}

// ...
```
## Örnek JavaScript
```js
const { ServerManager } = require('ultra-mpa')

let mc = new ServerManager('oyna.sunucu.com')
async function displayPlayers() {
    let players = await mc.getPlayerCount();
    let max = await mc.getMaxPlayers();
    return console.log(`${players}/${max}`)
}
```