module.exports = class SwgohHelp {
	
    constructor(settings) {
        
    	this.user = "username="+settings.username;        
    	this.user += "&password="+settings.password;
    	this.user += "&grant_type=password";
    	this.user += "&client_id="+(settings.client_id || '123');
    	this.user += "&client_secret="+(settings.client_secret || 'abc');
    	    	    	
    	this.token = null;
    	
    	this.urlBase = (settings.protocol || 'https')+"://"+(settings.host || "api.swgoh.help")+(settings.port || '');
    	this.signin = '/auth/signin';
        this.data   = '/swgoh/data/';
        this.player = '/swgoh/player/';
        this.guild  = '/swgoh/guild/';
        
        this.fetch = require('node-fetch');		
        
    }
    
    async login( url, body ) {
    	
    	try {
			
    		url = url ? this.urlBase+url : this.urlBase+this.signin;
    		body = body || this.user;
    		
    		let token = await this.fetch(this.urlBase+this.signin, { 
    		    method: 'POST',
    		    headers: { 
    		    	'Content-Type': 'application/x-www-form-urlencoded',
    		    	'Content-Length': new Buffer(JSON.stringify(this.user)).length
    		    },
    		    body:body    		    
    		});
			
    		if( token.status !== 200 ) { throw new Error('! Cannot login with these credentials'); }

    		token = await token.json();
    		this.token = { 'Authorization':"Bearer "+token.access_token };
			
    	} catch(e) {
    		throw e;
    	}
    	
    }
    
    async fetchAPI( url, criteria, lang, body ) {
    	
    	try {
    		
    		if( !this.token ) { await this.login(); }
    		
    		let fetchUrl = lang ? this.urlBase+url+(criteria || '')+"/"+lang : this.urlBase+url+(criteria || '');
    		body = body || '';
    		
    		const response = await this.fetch(fetchUrl, { 
    		    method: 'POST',
    		    headers: this.token,
    		    body: body,
    		    timeout:1000*60*10
    		});
    		
    		let result = null;
    		try {
    			result = await response.json();
    		} catch(e) {
    			result = { response:response };
    		}
    			
    		return result;
    		
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
