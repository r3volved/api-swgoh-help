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
        this.player  = '/swgoh/player';
        this.guild   = '/swgoh/guild';
        this.units   = '/swgoh/units';
        this.events  = '/swgoh/events';
        this.battles = '/swgoh/battles';
        this.zetas   = '/swgoh/zetas';
        this.squads  = '/swgoh/squads';
        
        this.statsUrl = settings.statsUrl || 'https://crinolo-swgoh.glitch.me/baseStats/api/';
        
        this.verbose = settings.verbose || false;
        this.debug   = settings.debug   || false;

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
                result = await response.text();
                let err = new Error(JSON.parse(result).error);
                err.status = JSON.parse(result).status;
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
        		}, 1000*60*59);
        		
			}
			
			this.token = result.access_token || null;
			return this.token;
			
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchAPI( url, payload ) {
    	
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

    		response = await this.fetch(fetchUrl, { 
    		    method: 'POST',
    		    headers: { 
    		    	'Authorization': 'Bearer '+this.token,
    		    	'Content-Type': 'application/json',
    		    	'Content-Length': new Buffer(JSON.stringify(payload)).length
    		    },
    		    body:JSON.stringify(payload)
    		});

            let result = null;
			if( response.ok ) {

    	        result = await response.json();
        		if( this.debug ) {
        			console.info('Fetched! : '+((now()-t0)/1000).toFixed(3)+' seconds');
        	    	console.info('='.repeat(60));
        		}

            } else {
                result = await response.text();
                let err = new Error(JSON.parse(result).error);
                err.status = JSON.parse(result).status;
                throw err;
            }
    		
    		return result;
    		
    	} catch(e) {
    		throw e;
    	}
    	
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
    
    async fetchUnits( payload ) {
    	try {
    		return await this.fetchAPI( this.units, payload );
    	} catch(e) {
    		throw e;
    	}
    }
    
    
    //Calculate individual / array of player profile roster units
    async unitStats( unit ) {
    	try {
    		
    		if( !unit ) { throw new Error('no units passed to stats calc'); }
    		
    		unit = !Array.isArray( unit ) ? [unit] : unit;
    		
    		let payload = [];
    		
    		for( let u of unit ) {
	    	
				let eq = [];
				if( u.equipped.length > 0 ) {
					for( let g of u.equipped ) {
						eq.push( g.equipmentId );
					}
				}

				payload.push({
    				characterID:u.defId,
    				starLevel:u.rarity,
    				level:u.level,
    				gearLevel:u.gear,
    				gear:eq    				
    			});
	    		
    		}
    		
			const stats = await this.fetch(this.statsUrl, {
				method: 'POST',
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
    
    //Calculate all stats from /units
    async rosterStats( units ) {
    	try {
    		
    		if( !units ) { throw new Error('no roster passed to stats calc'); }
    		
			const stats = await this.fetch(this.statsUrl, {
				method: 'POST',
    		    headers: { 
    		    	'Content-Type': 'application/json',
    		    	'Content-Length': new Buffer(JSON.stringify(units)).length
    		    },
    		    body:JSON.stringify(units)
    		});
    		
			return await stats.json();
			
    	} catch(e) {
    		throw e;
    	}
    }

}
