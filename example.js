const SwgohHelp = require('./api-swgoh-help.js');
		
async function example() {
	
	try {
		
		const swgoh = new SwgohHelp({
			"username":"",
			"password":"",
			"debug":true
		});
		
		console.log('=============');        
        console.log('== Testing ==');        
		console.log('=============');        
        console.log('');

        let errors = [];
        let promises = []
        
        //Test connect
        try {
            await testConnect(swgoh)
        } catch(e) {
            errors.push(e);
        }

        //Test player		        
        try {
            promises.push( await testPlayer(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test guild		        
        try {
            promises.push( await testGuild(swgoh) )
            //promises.push( testPlayer(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test units
        try {
            promises.push( await testUnits(swgoh) )
            //promises.push( testGuild(swgoh) )
            //promises.push( testPlayer(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test roster
        try {
            promises.push( await testRoster(swgoh) )
        } catch(e) {
            errors.push(e);
        }

        //Test data
        try {
            promises.push( await testData(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test events		        
        try {
            promises.push( await testEvents(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test battles		        
        try {
            promises.push( await testBattles(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test squads
        try {
            promises.push( await testSquads(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test zetas
        try {
            promises.push( await testZetas(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        //Test stats
        try {
            //promises.push( testStatsCalc(swgoh) )
        } catch(e) {
            errors.push(e);
        }
        
        Promise.all(promises).then(p => {
        
            errors.forEach(e => { reportError(e) });
            
            console.log('');
		    console.log('======================');        
            console.log('== Testing complete ==');        
            console.log('======================');    

            process.exit(0);    
        });
        
	} catch(e) {
        console.error('Status: '+e.status);
        console.error(e);
        process.exit(-1);
	}
	
}

const structurify = (key, value) => {
    if( !value ) { return null }
    if( Array.isArray(value) ) { 
        return [ value[0] ];
    } else {
        if( typeof value !== 'object' ) {
            return typeof value;
        }
        return value;
    }
};

async function report( result ) {
    try {
        let isArr = Array.isArray(result);
        if( isArr ) {
            console.log('[Array] : '+result.length+' items');
        } else {
            console.log('[Object] : '+Object.keys(result).length+' keys');
        }
        if( !result.result || result.result.error ) { 
            console.log('[Result] : '+JSON.stringify(result.result,null,2));        
        } else {
            console.log('[Result] : '+JSON.stringify(result.result,structurify));        
        }
        console.log('[Error] : '+JSON.stringify(result.error,null,2));        
        console.log('[Warning] : '+JSON.stringify(result.warning,null,2));
		console.log('[Headers] : '+JSON.stringify(result.headers,null,2));
        console.log('');
    } catch(e) {
        reportError(e);  
    }
}

async function reportError( err ) {
    try {

        console.error("[ ERROR ]");    
        console.error('| Code: '+err.code);
        console.error('| Message: '+err.message);
        console.error('| Description: '+err.description);

        console.log('');    
    } catch(e) {
        console.error(err);
        console.log('');    
    }            
}    


async function testConnect(swgoh, all) {
    try {
        console.log('++ Testing connect ++\n');
        console.log('Base connect - no args');
        await swgoh.connect();


        if( all ) {
            let badswgoh = null;
            try {
                console.log('++ Testing connect ++\n');
                console.log('Bad username');
                badswgoh = new SwgohHelp({
			        "username":"badname",
			        "password":"shittybilly",
			        "debug":true,
			        "host":"apiv2.swgoh.help"
		        });
		        await report(
		            await badswgoh.connect()
		        )
            } catch(err) {
                reportError(err)
            }

            try {
                console.log('++ Testing connect ++\n');
                console.log('Bad password');
                badswgoh = new SwgohHelp({
			        "username":"shittybill",
			        "password":"badpass",
			        "debug":true,
			        "host":"apiv2.swgoh.help"
		        });
		        await report(
		            await badswgoh.connect()
		        )
            } catch(err) {
                reportError(err)
            }

        }

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
            //result = await swgoh.calcStats( 282392964, 'BB8', ["includeMods","withModCalc","gameStyle"] );
            //console.log( result );

            let payload = {
                allycode:282392964,
                units:true,
                mods:true
            };
            
            let player = await swgoh.fetchPlayer( payload );
                player = Array.isArray(player) ? player[0] : player;
            result = await swgoh.rosterStats( player.roster );
            
            let guild = await swgoh.fetchGuild( payload )
            let unit = { "DARTHTRAYA":guild.roster["DARTHTRAYA"] };
            
            result = await swgoh.unitStats( unit, ["includeMods","withModCalc","gameStyle"] );
            
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
                allycodes:[282392964],
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
                allycodes:[ 282392964, 123456789 ]
            };
            await report( 
                await swgoh.fetchPlayer( payload )
            );
        } catch(e) {
            reportError(e);  
        }

        //========
        //try {
        //    console.log('DiscordId');
        //    payload = {
        //        discordIds:[ "305465187799007232" ]
        //    };
        //    await report( 
        //        await swgoh.fetchPlayer( payload )
        //    );
        //} catch(e) {
        //    reportError(e);  
        //}

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
            payload = {"allycodes":[215841538],"lang":"ENG_US","enums":true,"allycode":215841538};
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

        //========
        try {
            console.log('Single allycode with roster');
            payload = {"allycodes":[282392964],"lang":"ENG_US","enums":true,"allycode":215841538, "roster":true};
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
            allycodes:[ 282392964, 764213224 ]
        };
        await report( 
            await swgoh.fetchUnits( payload )
        )
    } catch(e) {
        throw e;
    }
}


async function testRoster(swgoh) {
    try {
        console.log('++ Testing roster ++\n');
        let payload = {
            allycodes:[ 282392964, 764213224 ]
        };
        await report( 
            await swgoh.fetchRoster( payload )
        )
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

        let payload = {};
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchEvents( payload )
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

        let payload = {};
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchBattles( payload )
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

        let payload = {};
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchSquads( payload )
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

        let payload = {};
        let result = null;
        
        try {
            console.log('No args');
            payload = {};
            await report( 
                await swgoh.fetchZetas( payload )
            );
        } catch(e) {
            reportError(e);  
        }
                
    } catch(e) {
        throw e;
    }
}

return example();
