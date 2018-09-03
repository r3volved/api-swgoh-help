# api-swgoh-help
JavaScript client wrapper for the API at https://apiv2.swgoh.help

For api access or support, please visit us on discord: https://discord.gg/kau4XTB


## Setup

Install via npm:

```
npm install api-swgoh-help
```
	
Require and initialize connection:

```js
const ApiSwgohHelp = require('api-swgoh-help');
const swapi = new ApiSwgohHelp({
	"username":"YOUR_USERNAME",
	"password":"YOUR_PASSWORD"
});
```


## API Access Token

This package is set up to auto-connect, acquire, and float your access token for a 59 minute lifetime before auto-expiration.

To acquire a new token manually:

```js
let acquiredToken = await swapi.connect();
```


## Usage

### Payloads ###

For current structure and available payload parameters for each available endpoint, see full api documentation at https://api.swgoh.help/swgoh 


### Fetch ###

/swgoh/* endpoints can be fetched via the prepared methods below, or with the generic fetch method shown here.

```js
let players = await swapi.fetch( 'player',  payload );
let guild   = await swapi.fetch( 'guild',   payload );
let units   = await swapi.fetch( 'units',   payload );
let data    = await swapi.fetch( 'data',    payload );
let zetas   = await swapi.fetch( 'zetas',   payload );
let squads  = await swapi.fetch( 'squads',  payload );
let events  = await swapi.fetch( 'events',  payload );
let battles = await swapi.fetch( 'battles', payload );
```


### Player profiles ###

```js
let player = await swapi.fetchPlayer( payload );
console.log( player );
```


### Guild profiles ###

```js
let guild = await swapi.fetchGuild( payload );
console.log( guild );
```


### Units index ###

```js
let rosters = await swapi.fetchUnits( payload );
console.log( rosters );
```


### Game details / support data ###
	
```js
let data = await swapi.fetchData( payload );
console.log( data );
```


### Zeta recommendations ###
	
```js
let zetas = await swapi.fetchZetas();
console.log( zetas );
```


### Squad recommendations ###
	
```js
let squads = await swapi.fetchSquads();
console.log( squads );
```


### Current event schedule ###
	
```js
let events = await swapi.fetchEvents( payload );
console.log( events );
```


### Current campaigns and battles ###
	
```js
let battles = await swapi.fetchBattles( payload );
console.log( battles );
```


## Utilities ##

### Unit (base) stats ###

Calculate one or more unit stats from a player profile roster-unit object

```js
let payload  = { allycode:123456789 };
const player = await swapi.fetchPlayer( payload );

let units    = [ player.roster[10], player.roster[20] ];
const stats  = await swapi.unitStats( units );
```
	
Calculate one or more player's entire roster stats from units index

```js
let payload   = { allycodes:[ 123456789, 234567890 ] };
const roster  = await swapi.fetchUnits( payload );
const rStats  = await swapi.rosterStats( roster );
```


# Available language clients

* NodeJS: 	https://github.com/r3volved/api-swgoh-help/tree/node
* PHP: 		https://github.com/r3volved/api-swgoh-help/tree/php
* Java: 	https://github.com/j0rdanit0/api-swgoh-help
* C#:		https://github.com/SdtBarbarossa/SWGOH-Help-Api-C-Sharp