# api-swgoh-help
Connection wrapper for api.swgoh.help


## Usage

Install via npm:

	npm install api-swgoh-help
	
In code, require and initialize connection:

	const ApiSwgohHelp = require('api-swgoh-help');
	const swapi = new ApiSwgohHelp({
		"username":"YOUR_USERNAME",
		"password":"YOUR_PASSWORD",
		"client_id":"YOUR_ID",
		"client_secret":"YOUR_SECRET"
	});

Request player profile by allycode:

	let allycode = 123456789;
	const player = await swapi.fetchPlayer( allycode );
	console.log( player );
	
Request guild roster by allycode:

	let allycode = 123456789;
	const guild = await swapi.fetchGuild( allycode );
	console.log( guild );

Request available support data:

	let criteria = 'stats';
	const data = await swapi.fetchData( criteria );
	console.log( data );
	
	criteria = 'events';
	data = await swapi.fetchData( criteria );
	console.log( data );

## Data criteria

events, units, arena, gear, mod-sets, mod-stats, skills, skill-types, tb, zetas, zeta-abilities, zeta-recommendations, battles
