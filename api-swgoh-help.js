const now = require('performance-now');

module.exports = class SwgohHelp {
	
    constructor(settings) {
        
    	this.user = `username=${settings.username}`;        
    	this.user += `&password=${settings.password}`;
    	this.user += `&grant_type=password`;
    	this.user += `&client_id=${(settings.client_id || '123')}`;
    	this.user += `&client_secret=${(settings.client_secret || 'abc')}`;
    	    	    	
    	this.token = null;
    	
    	this.urlBase = `${(settings.protocol || 'https')}://`;
    	this.urlBase += settings.host || "api.swgoh.help";
    	this.urlBase += settings.port ? ":"+settings.port : '';
    	
    	this.signin  = '/auth/signin';

    	this.data    = '/swgoh/data';
        this.player  = '/swgoh/players';
        this.guild   = '/swgoh/guilds';
        this.units   = '/swgoh/units';
        this.events  = '/swgoh/events';
        this.battles = '/swgoh/battles';
        this.zetas   = '/swgoh/zetas';
        this.squads  = '/swgoh/squads';
        this.roster  = '/swgoh/roster';
        
        this.statsUrl = settings.statsUrl || 'https://crinolo-swgoh.glitch.me/baseStats/api/';
        this.charStatsApi = settings.charStatsApi || 'https://crinolo-swgoh.glitch.me/statCalc/api/characters';
        this.shipStatsApi = settings.shipStatsApi || 'https://crinolo-swgoh.glitch.me/statCalc/api/ships';
        
        this.verbose = settings.verbose || false;
        this.debug   = settings.debug   || false;
        this.dump    = settings.dump    || false;

        this.fetch = require('node-fetch');		
        
    }
    
    async connect( url, body ) {
 
		const t0 = now();

    	try {
			
    		url = url ? this.urlBase+url : this.urlBase+this.signin;
    		body = body || this.user;
    		
    		if( this.debug || this.verbose ) { 
    			console.info('Acquiring token...'); 
    			if( this.debug ) { 
    				console.log('From: '+url);
    				console.log('Body: '+JSON.stringify(body)); 
    			}
        	}
    		
    		let connection = await this.fetch(url, { 
    		    method: 'POST',
    		    headers: { 
    		    	'Content-Type': 'application/x-www-form-urlencoded',
    		    	'Content-Length': new Buffer(JSON.stringify(body)).length
    		    },
    		    body:body    		    
    		});
			
			let result = null;
			if( connection.ok ) {

        	    result = await connection.json();

            } else {
                result = await connection.text();
                let err = null;
                try {
                  err = new Error(JSON.parse(result).error);
                  err.code = JSON.parse(result).code;
                } catch(e) {
                  err = new Error(result);
                }
                throw err;
            }
               		
			if( result.access_token ) {
        		if( this.debug ) {
        			console.info('Acquired! : '+((now()-t0)/1000).toFixed(3)+' seconds');
            		console.log('Token: '+JSON.stringify(result.access_token,'',' '));
        	    	console.info('='.repeat(60));
        		}
        		
        		setTimeout( () => {
        			if( this.debug ) { 
        				console.log('Expiring token: '+this.token);
        			}
        			this.token = null;
        		}, 60000*59);
        		
			}
			
			this.token = result.access_token || null;
			return this.token;
			
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchAPI( url, payload ) {
    	return new Promise( async (resolve, reject) => {
		    const t0 = now();
		    let response = null;
		    payload = payload || {};
        	try {
        		
        		if( !this.token ) { await this.connect(); }
        		
        		let fetchUrl = url.startsWith('http') ? fetchUrl : this.urlBase+url;
        		
        		if( this.debug || this.verbose ) { 
        			console.info('Fetching api...');
	        		if( this.debug ) { 
		        		console.log('From: '+fetchUrl);
		        		console.log('Body: '+JSON.stringify(payload));
        			}
            	}

                let result = null;

                response = this.fetch(fetchUrl, { 
        		    method: 'POST',
			        timeout: 60000*5,
        		    headers: { 
        		    	'Authorization': 'Bearer '+this.token,
        		    	'Content-Type': 'application/json',
        		    	'Content-Length': new Buffer(JSON.stringify(payload)).length
        		    },
        		    body:JSON.stringify(payload)
        		})
        		.then(r => r.json())
        		.then(result => {
            		
                    if( this.debug ) {
            			console.info('Fetched! : '+((now()-t0)/1000).toFixed(3)+' seconds');
            	    	console.info('='.repeat(60));
                		if( this.dump ) {
                            console.log('-'.repeat(50));
                            console.log('response: ', result);
                            console.log('-'.repeat(50));
                        }            
            		}

                    if( result.error && result.error.length > 0 ) {
                        let err = new Error(result.error.error);
                		    err.description = result.error.description;
                            err.code = result.error.code;
                        reject( err );
                    } 
            		
                    resolve( result );                		
        		
        		})
        		.catch(e => reject(e));
	            
        	} catch(e) {
        		reject(e);
        	}
    	});
    }
    
    async fetch( tofetch, payload ) {
    	try {
    		return await this.fetchAPI( '/swgoh/'+tofetch, payload );
    	} catch(e) {
    		throw e;
    	}
    }
        
    async fetchZetas() {
    	try {
    		return await this.fetchAPI( this.zetas, {} );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchSquads() {
    	try {
    		return await this.fetchAPI( this.squads, {} );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchBattles( payload ) {
    	try {
    		return await this.fetchAPI( this.battles, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchEvents( payload ) {
    	try {
    		return await this.fetchAPI( this.events, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchData( payload ) {
    	try {
    		return await this.fetchAPI( this.data, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchPlayer( payload ) {
    	try {
    		return await this.fetchAPI( this.player, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchGuild( payload ) {
    	try {
    		return await this.fetchAPI( this.guild, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
/*
    async fetchUnits( payload ) {
	    try {
            let units = await this.fetchAPI( this.roster, payload );
		    return units.reduce((ucc,p) => {
		        Object.keys(p).forEach(u => {
		            ucc[u] = ucc[u] || [];
		            ucc[u].push(p[u]);
                });
                return ucc;
		    },{});
	    } catch(e) {
		    throw e;
	    }
    }
*/
    
    async fetchUnits( payload ) {
    	try {
    		return await this.fetchAPI( this.units, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchRoster( payload ) {
    	try {
    		return await this.fetchAPI( this.roster, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    
    //Calculate individual / array of player profile roster units
    async rosterStats( unit, flags, type ) {
    	try {
    		
    		if( !unit ) { throw new Error('no units passed to stats calc'); }
    		
    		unit = !Array.isArray( unit ) ? [unit] : unit;
    		
    		let payload = [];
    		
    		for( let u of unit ) {
	    	
				payload.push({
    				defId:u.defId,
    				rarity:u.rarity,
    				level:u.level,
    				gear:u.gear,
    				equipped:u.equipped,
    				mods:u.mods    				
    			});
	    		
    		}
    		
    		let apiUrl = type && ( type === 'SHIP' || type === 2 ) ? this.shipStatsApi : this.charStatsApi;
    		    apiUrl += flags ? '?flags='+flags : '';

			const stats = await this.fetch(apiUrl, {
				method: 'POST',
				timeout: 60000*5,
    		    headers: { 
    		    	'Content-Type': 'application/json',
    		    	'Content-Length': new Buffer(JSON.stringify(payload)).length
    		    },
    		    body:JSON.stringify(payload)
    		});
    		
			return await stats.json();
			
    	} catch(e) {
    		throw e;
    	}
    }
    
    //Calculate all stats from a single /units unit
    async unitsStats( unit, flags, type ) {
    	try {
    		
    		if( !unit ) { throw new Error('no roster passed to stats calc'); }
    		
    		let apiUrl = type && ( type === 'SHIP' || type === 2 ) ? this.shipStatsApi : this.charStatsApi;
    		    apiUrl += flags ? '?flags='+flags : '';
    		    
			const stats = await this.fetch(apiUrl, {
				method: 'POST',
				timeout: 60000*5,
    		    headers: { 
    		    	'Content-Type': 'application/json',
    		    	'Content-Length': new Buffer(JSON.stringify(unit)).length
    		    },
    		    body:JSON.stringify(unit)
    		});
    		
			return await stats.json();
			
    	} catch(e) {
    		throw e;
    	}
    }

    //Calculate all stats from /units
    async calcStats( allycode, baseId, flags, type ) {
    	try {
    		
    		if( !allycode ) { throw new Error('no allycode passed to calc stats'); }
    		baseId = baseId ? baseId.toUpperCase() : baseId;
    		flags = flags ? flags.join(',') : flags;
    		
    		let apiUrl = type && ( type === 'SHIP' || type === 2 ) ? this.shipStatsApi : this.charStatsApi;
    		    apiUrl += '/player/' + allycode;
    		    apiUrl += baseId ? '/'+baseId : '';
    		    apiUrl += flags ? '?flags='+flags : '';
    		
			const stats = await this.fetch(apiUrl);
    		
			return await stats.json();
			
    	} catch(e) {
    		throw e;
    	}
    }

}
