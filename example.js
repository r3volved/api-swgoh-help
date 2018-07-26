async function example() {
	
	try {
		
		const SwgohHelp = require('./api-swgoh-help.js');
		const swgoh = new SwgohHelp({
			"username":"YOUR_USERNAME",
			"password":"YOUR_PASSWORD",
		});
		
		let result = null;
		switch( process.argv[2] ) {
		
			case "player":
				result = await swgoh.fetchPlayer( parseInt(process.argv[3]) );
				break;
			case "guild":
				result = await swgoh.fetchGuild( parseInt(process.argv[3]) );
				break;
			default:
				result = await swgoh.fetchData( process.argv[2] );
				
		}
		
		console.log( JSON.stringify(result,'','  ') );
		
	} catch(e) {
		console.error(e);
	}
	
}

example();