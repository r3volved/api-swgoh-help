async function example() {
	
	try {
		
		const SwgohHelp = require('./api-swgoh-help.js');
		const swgoh = new SwgohHelp({
			"username":"YOUR_USERNAME",
			"password":"YOUR_PASSWORD",
			"host":"apiv2.swgoh.help"
		});
		
		let result = null;
		let payload = {};
		
		switch( process.argv[2] ) {
		
			case "player":
				
				payload = {
					allycodes:[ 282392964 ],
					language:"jpn_jp"
				};	
				result = await swgoh.fetchPlayer( payload );
				
				break;
			
			case "guild":
				
				payload = {
					allycode:752112593,
					language:"eng_us"
				};	
				result = await swgoh.fetchGuild( payload );
				
				break;
				
			case "units":
				
				payload = {
					allycode:[ 282392964, 569597317 ],
					language:"eng_us"
				};
				result = await swgoh.fetchUnits( payload );
				
				break;
				
			case "data":
				
				payload = {
				    "collection":"abilityList",
				    "language":"eng_us",
				    "project":{
				        "_id":0,
				        "id":1,
				        "nameKey":1,
				        "descKey":1,
				        "cooldown":1,
				        "abilityType":1,
				        "aiParams":1
				    }
				};
				result = await swgoh.fetchData( payload );
				
				break;
				
			case "rstats":
				
				payload = {
					allycode:[ 282392964, 569597317 ],
					language:"eng_us"
				};
				result = await swgoh.fetchUnits( payload );
				result = await swgoh.rosterStats( result );
				
				break;
				
			case "ustats":
				
				payload = {
					allycodes:282392964
				};	
				result = await swgoh.fetchPlayer( payload );
				result = await swgoh.unitStats([ result.roster[10], result.roster[20] ]);
				
				break;
			
			default:
				result = await swgoh.fetchStatus();
				
		}
		
		console.log( JSON.stringify(result,'','  ') );
		
	} catch(e) {
		console.error(e);
	}
	
}

example();