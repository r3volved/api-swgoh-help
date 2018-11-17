# api-swgoh-help
JavaScript client wrapper for the API at https://api.swgoh.help
(Version 3.x.x)

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

The response from api is structured as an object with: 
"result"  containing any results returned from request, 
"error"   containing any errors returned from request,
"warning" containing any warnings returned from request


```js
let { result, error, warning } = await swapi.fetch( 'player',  payload );
let { result, error, warning } = await swapi.fetch( 'guild',   payload );
let { result, error, warning } = await swapi.fetch( 'units',   payload );
let { result, error, warning } = await swapi.fetch( 'data',    payload );
let { result, error, warning } = await swapi.fetch( 'zetas',   payload );
let { result, error, warning } = await swapi.fetch( 'squads',  payload );
let { result, error, warning } = await swapi.fetch( 'events',  payload );
let { result, error, warning } = await swapi.fetch( 'battles', payload );
```


### Player profiles ###

```js
let { result, error, warning } = await swapi.fetchPlayer( payload );
console.log( result );
```


### Guild profiles ###

```js
let { result, error, warning } = await swapi.fetchGuild( payload );
console.log( result );
```


### Units index ###

```js
let { result, error, warning } = await swapi.fetchUnits( payload );
console.log( result );
```


### Game details / support data ###
	
```js
let { result, error, warning } = await swapi.fetchData( payload );
console.log( result );
```


### Zeta recommendations ###
	
```js
let { result, error, warning } = await swapi.fetchZetas();
console.log( result );
```


### Squad recommendations ###
	
```js
let { result, error, warning } = await swapi.fetchSquads();
console.log( result );
```


### Current event schedule ###
	
```js
let { result, error, warning } = await swapi.fetchEvents( payload );
console.log( result );
```


### Current campaigns and battles ###
	
```js
let { result, error, warning } = await swapi.fetchBattles( payload );
console.log( result );
```


## Utilities ##

### Unit (base) stats ###

Calculate one or more unit stats from a profile roster array
Optionally include flags for Crinolo's stat api

```js
let payload  = { allycode:123456789 };
let { result, error, warning } = await swapi.fetchPlayer( payload );

const units  = [ result.roster[10], result.roster[20] ];
const stats  = await swapi.rosterStats( units, [ "includeMods","withModCalc","gameStyle" ] );
```
	
Calculate one or more player's specific unit stats from units index
Optionally include flags for Crinolo's stat api

```js
let payload  = { allycodes:[ 123456789, 234567890 ] };
let { result, error, warning } = await swapi.fetchUnits( payload );

const unit   = {"DARTHTRAYA":result["DARTHTRAYA"]};
const stats  = await swapi.unitStats( unit, [ "includeMods","withModCalc","gameStyle" ] );
```

Calculate player unit stats including mods
Optionally include flags for Crinolo's stat api

```js
let allycode = 123456789;
const baseId = "BB8"; //null for all units
const stats  = await swapi.calcStats( allycode, baseId, [ "includeMods","withModCalc","gameStyle" ] );
```



# Available language clients

* NodeJS: 	https://github.com/r3volved/api-swgoh-help/tree/node
* PHP: 		https://github.com/r3volved/api-swgoh-help/tree/php
* Java: 	https://github.com/j0rdanit0/api-swgoh-help
* C#:		https://github.com/SdtBarbarossa/SWGOH-Help-Api-C-Sharp
* Python:   https://github.com/platzman/swgoh.help.python
