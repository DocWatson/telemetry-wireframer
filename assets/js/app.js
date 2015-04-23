Wireframe = {
  common: {
    init: function() {
      console.log('Telemetry Wireframer Initialized');
    }
  },
};

UTIL = {
  exec: function( controller, action ) {
    var ns = Wireframe,
        action = ( action === undefined ) ? "init" : action;

    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]();
    }
  },

  init: function() {
    var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" );

    UTIL.exec( "common" );
    UTIL.exec( controller );
    UTIL.exec( controller, action );
  }
};

$( document ).ready( UTIL.init );

/**
 * Read more about DOM-ready Execution by Paul Irish and Jason Garber here:
 * http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution
 */
