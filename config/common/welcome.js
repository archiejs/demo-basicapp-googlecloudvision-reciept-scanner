var c = require( './../env' );

var o = console.log; // more readable

o( '--' );
o( c.app.title + ' -> ' + 'desktop application');
o( 'Environment:\t\t\t' + (process.env.NODE_ENV || 'default'));
o( '--' );
