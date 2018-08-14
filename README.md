# api-swgoh-help
JavaScript client wrapper for the API at https://api.swgoh.help

For api access or support, please visit us on discord: https://discord.gg/kau4XTB


## Setup

Install via npm:

	npm install api-swgoh-help
	
Require and initialize connection:

	const ApiSwgohHelp = require('api-swgoh-help');
	const swapi = new ApiSwgohHelp({
		"username":"YOUR_USERNAME",
		"password":"YOUR_PASSWORD"
	});


## Usage

### Player profiles ###

Required parameters (one of):

* allycode:<int> - single allycode
* allycodes:[ <int> ] - array of allycodes

Optional parameters:

* language:<string> - include localized names in response
* project:<object> - reduce response size by specifying only the fields you want  

	let payload = {
		allycodes:[ 123456789, 234567890 ],
		language:"eng_us",
		project:{
			name:1,
			allyCode:1,
			arena:1
		}
	};
	
	let player = await swapi.fetchPlayer( payload );
	console.log( player );


### Guild profiles ###

Required parameters:

* allycode:<int> - single allycode

Optional parameters:

* project:<object> - reduce response size by specifying only the fields you want  

	let payload = { 
		allycode:123456789 
	};
	
	let guild = await swapi.fetchGuild( payload );
	console.log( guild );


### Units index ###

Required parameters (one of):

* allycode:<int> - single allycode
* allycodes:[ <int> ] - array of allycodes

	let payload = {
		allycodes:[ 123456789, 234567890 ]
	};
	
	let rosters = await swapi.fetchUnits( payload );
	console.log( rosters );


### Game details / support data ###
	
Required parameters:

* collection:<string> - the list you want to access (for a list of available collections, see https://apiv2.swgoh.help/

Optional parameters:

* language:<string> - include localized names in response
* match:<object> - match criteria to filter against
* project:<object> - reduce response size by specifying only the fields you want  

	let payload = {
		collection:"unitsList",
		language:"eng_us",
		match:{
			rarity:7
		},
		project:{
			baseId:1,
			nameKey:1,
			descKey:1
		}
	};
	
	let units = await swapi.fetchData( payload );
	console.log( units );
	

## Utilities ##

### Unit (base) stats ###

Calculate one or more unit stats from a player profile roster-unit object

	let payload  = { allycode:123456789 };
	const player = await swapi.fetchPlayer( payload );
	
	let units    = [ player.roster[10], player.roster[20] ];
	const stats  = await swapi.unitStats( units );
	
Calculate one or more player's entire roster stats from units index

	let payload   = { allycodes:[ 123456789, 234567890 ] };
	const roster  = await swapi.fetchUnits( payload );
	const rStats  = await swapi.rosterStats( roster );
		

# Available language clients

* NodeJS: 	https://github.com/r3volved/api-swgoh-help/tree/node
* PHP: 		https://github.com/r3volved/api-swgoh-help/tree/php
* Java: 	https://github.com/j0rdanit0/api-swgoh-help
* C#:		https://github.com/SdtBarbarossa/SWGOH-Help-Api-C-Sharp