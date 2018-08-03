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

	/* Optional language specification */
	//player = await swapi.fetchPlayer( allycode, null, 'GER_DE' );	
	
Request guild roster by allycode:

	let allycode = 123456789;
	let guild = await swapi.fetchGuild( allycode );
	console.log( guild );

	/* Other guild reports */
	//guild = await swapi.fetchGuild( allycode, 'details' );
	//guild = await swapi.fetchGuild( allycode, 'roster' );	

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


# Available Language Clients

* NodeJS: 	https://github.com/r3volved/api-swgoh-help/tree/node
* PHP: 		https://github.com/r3volved/api-swgoh-help/tree/php
* Java: 	https://github.com/j0rdanit0/api-swgoh-help
* C#:		https://github.com/SdtBarbarossa/SWGOH-Help-Api-C-Sharp