async function example() {
	
	try {
		
		const SwgohHelp = require('./SwgohHelp.js');
		const swgoh = new SwgohHelp({
			"protocol":"https",
			"host":"api.swgoh.help",
			"username":"YOUR_USERNAME",
			"password":"YOUR_PASSWORD",
			"client_id":"YOUR_ID",
			"client_secret":"YOUR_SECRET"
		});
		
		let result = null;
		switch( process.argv[2] ) {
		
			case "player":
				result = await swgoh.fetchPlayer( parseInt(process.argv[3]) );
			
			case "guild":
				result = await swgoh.fetchGuild( parseInt(process.argv[3]) );
				
			default:
				result = await swgoh.fetchData( process.argv[2] );
				
		}
		
		console.log( JSON.stringify(result,'','  ') );
		
	} catch(e) {
		console.error(e);
	}
	
}

example();