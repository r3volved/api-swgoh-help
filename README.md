# api-swgoh-help
PHP client wrapper for the API at https://api.swgoh.help


## Usage

Require and initialize connection:

	require_once 'api-swgoh-help.php';
    
    $swgoh = new ApiSwgohHelp(
        array("YOUR_USERNAME","YOUR_PASSWORD")
    );	

Request player profile by allycode:

	$allycode = 123456789;
	$player = $swgoh->fetchPlayer( $allycode );
	echo '<pre>'.json_encode($player).'</pre>';
	
Request guild roster by allycode:

	$allycode = 123456789;
	$guild = $swgoh->fetchGuild( $allycode );
	echo '<pre>'.json_encode($guild).'</pre>';

Request available support data:

	$criteria = 'stats';
	$stats = $swgoh->fetchData( $criteria );
	echo '<pre>'.json_encode($stats).'</pre>';
	
	$criteria = 'events';
	$events = $swgoh->fetchData( $criteria );
	echo '<pre>'.json_encode($events).'</pre>';
	
## Data criteria

* events
* units
* arena
* gear
* mod-sets
* mod-stats
* skills
* skill-types
* tb
* zetas
* zeta-abilities
* zeta-recommendations
* battles


# Available Language Clients

* JavaScript: https://github.com/r3volved/api-swgoh-help
* PHP: https://github.com/r3volved/api-swgoh-help
* Java: https://github.com/j0rdanit0/api-swgoh-help
