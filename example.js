async function example() {
	
	try {
		
		const SwgohHelp = require('./api-swgoh-help.js');
		const swgoh = new SwgohHelp({
			"username":"",
			"password":"",
			"debug":true
		});
		
		console.log('=============');        
        console.log('== Testing ==');        
		console.log('=============');        
        console.log('');

        //Test connect
        //await testConnect(swgoh)
        
        //Test player		        
        //await testPlayer(swgoh)
        
        //Test guild		        
        //await testGuild(swgoh)
        
        //Test units
        //await testUnits(swgoh)
        
        //Test data
        //await testData(swgoh)
        
        //Test events		        
        //await testEvents(swgoh)
        
        //Test battles		        
        //await testBattles(swgoh)
        
        //Test squads
        //await testSquads(swgoh)
        
        //Test zetas
        //await testZetas(swgoh)
        
        //Test stats
        await testStatsCalc(swgoh)
        
        console.log('');
		console.log('======================');        
        console.log('== Testing complete ==');        
        console.log('======================');        
        
	} catch(e) {
        console.error('Status: '+e.status);
        console.error(e.stack);
	}
	
}

async function report( result ) {
    try {
        let isArr = Array.isArray(result);
        if( isArr ) {
            console.log('[Array] : '+result.length+' items');
            console.log('[Item Keys] : '+Object.keys(result[0]).join(',\n              '));
        } else {
            console.log('[Object] : '+Object.keys(result).length+' keys');
            console.log('[Keys] : '+Object.keys(result).join(',\n         '));
        }
        console.log('');
    } catch(e) {
        reportError(e);  
    }
}

async function reportError( err ) {
    try {
        console.error('Status: '+err.status);
        console.error(err.stack);
        console.log('');    
    } catch(e) {
        console.error(err);
        console.log('');    
    }            
}    


async function testConnect(swgoh) {
    try {
        console.log('++ Testing connect ++\n');
        console.log('Base connect - no args');
        await swgoh.connect();

        console.log('');
    } catch(e) {
        reportError(e);  
    }
}


async function testStatsCalc(swgoh) {
    try {
        console.log('++ Testing stats calc ++\n');

        let result = null;
        
        try {
            result = await swgoh.calcStats( 282392964, 'BB8', ["includeMods","withModCalc","gameStyle"] );
            console.log( result );

            result = await swgoh.calcStats( 282392964, null, ["includeMods","withModCalc","gameStyle"] );
            console.log( result );

        } catch(e) {
            reportError(e);  
        }
                
    } catch(e) {
        throw e;
    }
}

async function testPlayer(swgoh) {
    try {
        console.log('++ Testing player ++\n');
        
        let payload = null;
        let result = null;
        
        try {
            console.log('Single allycode - no args');
            payload = {
                allycode:282392964
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
        //========
        try {
            console.log('Multiple allycode - no args');
            payload = {
                allycodes:[ 282392964, 764213224 ]
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }

        //========
        try {
            console.log('Multiple allycode - one bad');
            payload = {
                allycodes:[ 282392964, 123456789 ]
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }

        try {
            console.log('Single allycode - english');
            payload = {
                allycode:282392964,
                language:"eng_us"
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }

        try {
            console.log('Single allycode - enums');
            payload = {
                allycode:282392964,
                enums:true
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }

        try {
            console.log('Single allycode - projection');
            payload = {
                allycode:282392964,
                project:{
                    name:1,
                    allyCode:1
                }
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }

    } catch(e) {
        throw e;
    }
}

async function testGuild(swgoh) {
    try {
        console.log('++ Testing guild ++\n');

        let payload = null;
        let result = null;
        
        try {
            console.log('Single allycode - no args');
            payload = {
                allycode:282392964
            };
            await report( 
                await swgoh.fetchGuild( payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
        //========
        try {
            console.log('Multiple allycode - no args');
            payload = {
                allycodes:[ 282392964, 764213224 ]
            };
            await report( 
                await swgoh.fetchGuild( payload )
            );
        } catch(e) {
            reportError(e);  
        }

    } catch(e) {
        throw e;
    }
}

async function testUnits(swgoh) {
    try {
        console.log('++ Testing units ++\n');
        let payload = {
        
        };
        
    } catch(e) {
        throw e;
    }
}

async function testData(swgoh) {
    try {
        console.log('++ Testing data ++\n');
        let payload = {
        
        };
        
    } catch(e) {
        throw e;
    }
}

async function testEvents(swgoh) {
    try {
        console.log('++ Testing events ++\n');

        let payload = null;
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchEvents( '/swgoh/events', payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
    } catch(e) {
        throw e;
    }
}

async function testBattles(swgoh) {
    try {
        console.log('++ Testing battles ++\n');

        let payload = null;
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchBattles( '/swgoh/battles', payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
    } catch(e) {
        throw e;
    }
}

async function testSquads(swgoh) {
    try {
        console.log('++ Testing squads ++\n');

        let payload = null;
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchSquads( '/swgoh/squads', payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
    } catch(e) {
        throw e;
    }
}

async function testZetas(swgoh) {
    try {
        console.log('++ Testing zetas ++\n');

        let payload = null;
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchZetas( '/swgoh/zetas', payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
    } catch(e) {
        throw e;
    }
}

example();
