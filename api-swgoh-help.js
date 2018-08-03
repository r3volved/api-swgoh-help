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
        
        this.fetch = require('node-fetch');		
        
        this.verbose = settings.verbose || false;
        this.debug   = settings.debug || false;
        
    }
    
    async login( url, body ) {
 
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
    		
    		let token = await this.fetch(this.urlBase+this.signin, { 
    		    method: 'POST',
    		    headers: { 
    		    	'Content-Type': 'application/x-www-form-urlencoded',
    		    	'Content-Length': new Buffer(JSON.stringify(body)).length
    		    },
    		    body:body    		    
    		});
			
    		if( token.status !== 200 ) { throw new Error('! Cannot login with these credentials'); }

    		token = await token.json();
    		
    		this.token = { 
		    	'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization':"Bearer "+token.access_token 
			};
			
    		if( this.debug ) {
    			console.info('Acquired! : '+((now()-t0)/1000).toFixed(3)+' seconds');
        		console.log('Token: '+JSON.stringify(this.token,'',' '));
    	    	console.info('='.repeat(60));
    		}
    		
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchAPI( url, criteria, lang, body ) {
    	
		const t0 = now();
		let response = null;
		
    	try {
    		
    		if( !this.token ) { await this.login(); }
    		
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
    
}