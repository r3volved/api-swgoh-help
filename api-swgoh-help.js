const now = require('performance-now');

module.exports = class SwgohHelp {
	
    constructor(settings) {
        
    	this.user = "username="+settings.username;        
    	this.user += "&password="+settings.password;
    	this.user += "&grant_type=password";
    	this.user += "&client_id="+(settings.client_id || '123');
    	this.user += "&client_secret="+(settings.client_secret || 'abc');
    	    	    	
    	this.token = null;
    	
    	this.urlBase = (settings.protocol || 'https')+"://";
    	this.urlBase += settings.host || "api.swgoh.help";
    	this.urlBase += settings.port ? ":"+settings.port : '';
    	
    	this.signin = '/auth/signin';
        this.data   = '/swgoh/data/';
        this.player = '/swgoh/player/';
        this.guild  = '/swgoh/guild/';
        
        this.statsUrl = settings.statsUrl || 'https://crinolo-swgoh.glitch.me/baseStats/api/';
        
        this.verbose = settings.verbose || false;
        this.debug   = settings.debug || false;

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
    				console.log('Body: '+body); 
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
			
    		connection = await connection.json();
    		
			if( connection.access_token ) {
    			connection = { 
    		    	'Content-Type':'application/x-www-form-urlencoded',
    				'Authorization':'Bearer '+connection.access_token 
    			};
    			
        		if( this.debug ) {
        			console.info('Acquired! : '+((now()-t0)/1000).toFixed(3)+' seconds');
            		console.log('Token: '+JSON.stringify(this.token,'',' '));
        	    	console.info('='.repeat(60));
        		}
			}
			
			return connection;
			
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchAPI( url, criteria, lang, body ) {
    	
		const t0 = now();
		let response = null;
		
    	try {
    		
    		if( !this.token ) { this.token = await this.connect(); }
    		
    		let fetchUrl = lang ? this.urlBase+url+(criteria || '')+"?lang="+lang : this.urlBase+url+(criteria || '');
    		body = body || '';
    		
    		if( this.debug || this.verbose ) { 
    			console.info('Fetching api...');
	    		if( this.debug ) { 
		    		console.log('From: '+fetchUrl);
		    		console.log('Body: '+body);
    			}
        	}

    		response = await this.fetch(fetchUrl, { 
    		    method: 'POST',
    		    headers: this.token,
    		    body: body
    		});

    		try {
    			response = await response.json();
    		} catch(e) {
    			response = { response:response };
    		}
    		
    		if( this.debug ) {
    			console.info('Fetched! : '+((now()-t0)/1000).toFixed(3)+' seconds');
    	    	console.info('='.repeat(60));
    		}

    		return response;
    		
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchData( criteria, details, lang ) {
    	try {
    		criteria += details ? "/"+details : "";
    		return await this.fetchAPI( this.data, criteria, lang );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchPlayer( allycode, details, lang ) {
    	try {
    		allycode += details ? "/"+details : "";
    		return await this.fetchAPI( this.player, allycode, lang );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchGuild( allycode, details, lang ) {
    	try {
    		allycode += details ? "/"+details : "";
    		return await this.fetchAPI( this.guild, allycode, lang );
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
