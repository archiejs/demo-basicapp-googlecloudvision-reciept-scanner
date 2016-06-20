var c = require( './../env' );

var isAPIEndpoint = (!process.argv[2]) || (process.argv[2] === 'default');
var o = console.log; // more readable

o( '--' );
o( c.app.title + ' -> ' + (process.argv[2] || 'web application') );
o( 'Environment:\t\t\t' + (process.env.NODE_ENV || 'default'));
if ( isAPIEndpoint ){
    o( 'Port:\t\t\t\t' + c.port );
    o( 'Database:\t\t\t' + c.db.uri );
    if ( process.env.NODE_ENV === 'secure' )
        o( 'HTTPs:\t\t\t\ton' );
}
o( '--' );
o( 'Application started');
