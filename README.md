# api-swgoh-help
JavaScript client wrapper for the API at https://api.swgoh.help

For api access or support, please visit us on discord: https://discord.gg/kau4XTB


## Usage

Install via npm:

	npm install api-swgoh-help
	
Require and initialize connection:

	const ApiSwgohHelp = require('api-swgoh-help');
	const swapi = new ApiSwgohHelp({
		"username":"YOUR_USERNAME",
		"password":"YOUR_PASSWORD"
	});

Request player profile by allycode:

	let allycode = 123456789;
	let player = await swapi.fetchPlayer( allycode );
	console.log( player );

	/* Other player reports */
	//player = await swapi.fetchPlayer( allycode, 'mods' );
	//player = await swapi.fetchPlayer( allycode, 'zetas' );	
	//player = await swapi.fetchPlayer( allycode, 'units' );	

	/* Optional language specification */
	//player = await swapi.fetchPlayer( allycode, null, 'GER_DE' );	
	
Request guild roster by allycode (lengthy request):

	let allycode = 123456789;
	let guild = await swapi.fetchGuild( allycode );
	console.log( guild );

	/* Other guild reports */
	//guild = await swapi.fetchGuild( allycode, 'details' );
	//guild = await swapi.fetchGuild( allycode, 'roster' );	
	//guild = await swapi.fetchGuild( allycode, 'units' );	

	/* Optional language specification */
	//guild = await swapi.fetchGuild( allycode, null, 'JPN_JP' );	
	
Request available support data:

	let criteria = 'units';
	let data = await swapi.fetchData( criteria );
	console.log( data );
	
	/* Available data criteria */
	// events
	// units
	// arena
	// gear
	// mod-sets
	// mod-stats
	// skills
	// skill-types
	// tb
	// zetas
	// zeta-abilities
	// zeta-recommendations
	// battles
	
	/* Optional language specification */
	//data = await swapi.fetchData( 'units', null, 'KOR_KR' );	


## Utilities ##

### Unit (base) stats ###

Calculate unit stats from a player profile roster

	let allycode = 123456789;
	const player   = await swapi.fetchPlayer( allycode );
	
	let units    = [ player.roster[10], player.roster[20] ];
	const stats  = await swapi.unitStats( units );
	
Calculate a player's entire roster stats 

	let allycode = 123456789;
	const units  = await swapi.fetchPlayer( allycode, 'units' );
	const stats  = await swapi.rosterStats( units );
	
Calculate entire guild roster stats (lengthy request)

	let allycode = 123456789;
	const units  = await swapi.fetchGuild( allycode, 'units' );
	const stats  = await swapi.rosterStats( units );
	

# Available language clients

* NodeJS: 	https://github.com/r3volved/api-swgoh-help/tree/node
* PHP: 		https://github.com/r3volved/api-swgoh-help/tree/php
* Java: 	https://github.com/j0rdanit0/api-swgoh-help
* C#:		https://github.com/SdtBarbarossa/SWGOH-Help-Api-C-Sharp