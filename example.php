<?php 
try {
    
    require_once 'api-swgoh-help.php';
    
    $swgoh = new ApiSwgohHelp(
        array("YOUR_USERNAME","YOUR_PASSWORD")
    );
    
    $allycode = '123456789';
    $player = $swgoh->fetchPlayer( $allycode );
    echo '<pre>'.json_encode($player).'</pre>';
    
} catch(Exception $e) {
    echo $e;
}
?>