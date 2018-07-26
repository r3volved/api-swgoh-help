<?php
class ApiSwgohHelp {
        
    private $user;
    private $token;
    private $signin = "https://api.swgoh.help/auth/signin";
    private $data   = "https://api.swgoh.help/swgoh/data/";
    private $player = "https://api.swgoh.help/swgoh/player/";
    private $guild  = "https://api.swgoh.help/swgoh/guild/";

    public function __construct( $settings ) {
        $this->user = "username=".$settings[0];
        $this->user .= "&password=".$settings[1];
        $this->user .= "&grant_type=password&client_id=abc&client_secret=123";
    }

    public function login() {
        
        try {
            $opts = array(
                'http'=>array(
                    'method'=>"POST",
                    'header'=>"Content-Type: application/x-www-form-urlencoded",
                    'content'=>$this->user
                )
            );
            $context = stream_context_create($opts);
            $auth = file_get_contents($this->signin, false, $context);            
            $obj = json_decode($auth);
            
            if( !isset($obj->access_token) ) { 
                throw new Exception('! Cannot login with these credentials'); 
            }
            
            $this->token = "Authorization:Bearer ".$obj->access_token;
            
        } catch(Exception $e) {
            throw $e;
        }

    }
    
    public function fetchAPI( $url, $criteria = null, $lang = null ) {
        
        try {
            
            if( !isset($this->token) ) { $this->login(); }
            
            $fetchUrl = isset($criteria) ? $url.$criteria : $url;
            
            $opts = array(
                'http'=>array(
                    'method'=>"POST",
                    'header'=>$this->token
                )
            );
            
            $context = stream_context_create($opts);
            $file = file_get_contents($fetchUrl, false, $context);
            return json_decode($file);
                                
        } catch(Exception $e) {
            throw $e;
        }
        
    }
    
    public function fetchData( $criteria ) {
        try {
            return $this->fetchAPI( $this->data, $criteria );
        } catch(Exception $e) {
            throw $e;
        }
    }
    
    public function fetchPlayer( $allycode ) {
        try {
            return $this->fetchAPI( $this->player, $allycode );
        } catch(Exception $e) {
            throw $e;
        }
    }
    
    public function fetchGuild( $allycode ) {
        try {
            return $this->fetchAPI( $this->guild, $allycode );
        } catch(Exception $e) {
            throw $e;
        }
    }
          
}
?>