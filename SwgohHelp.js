module.exports = class SwgohHelp {
	
    constructor(settings) {
        
    	this.user = "username="+settings.username;        
    	this.user += "&password="+settings.password;
    	this.user += "&grant_type=password";
    	this.user += "&client_id="+settings.client_id;
    	this.user += "&client_secret="+settings.client_secret;
    	    	    	
    	this.token = null;
    	
    	this.url = (settings.protocol || 'https')+"://"+(settings.host || "api.swgoh.help")+(settings.port || '');
    	this.signin = this.url+'/auth/signin';
        this.data   = this.url+'/swgoh/data/';
        this.player = this.url+'/swgoh/player/';
        this.guild  = this.url+'/swgoh/guild/';
        
        this.fetch = require('node-fetch');		
        
    }
    
    async login() {
    	
    	try {
			
    		let token = await this.fetch(this.signin, { 
    		    method: 'POST',
    		    body:this.user,
    		    headers: { 
    		    	'Content-Type': 'application/x-www-form-urlencoded',
    		    	'Content-Length': new Buffer(JSON.stringify(this.user)).length
    		    }
    		});
			
    		if( token.status !== 200 ) { throw new Error('! Cannot login with these credentials'); }

    		token = await token.json();
    		this.token = { 'Authorization':"Bearer "+token.access_token };
			
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchAPI( url, criteria, lang ) {
    	
    	try {
    		
    		if( !this.token ) { await this.login(); }
    		
    		let fetchUrl = lang ? url+(criteria || '')+"/"+lang : url+(criteria || '');
    			
    		const response = await this.fetch(fetchUrl, { 
    		    method: 'POST',
    		    headers: this.token
    		});
    		
    		return await response.json();
    		
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchData( criteria ) {
    	try {
    		return await this.fetchAPI( this.data, criteria );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchPlayer( allycode ) {
    	try {
    		return await this.fetchAPI( this.player, allycode );
    	} catch(e) {
    		throw e;
    	}
    }
    
    async fetchGuild( allycode ) {
    	try {
    		return await this.fetchAPI( this.guild, allycode );
    	} catch(e) {
    		throw e;
    	}
    }
    
}
