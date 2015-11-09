'use strict';

var externAppsFunctions = externAppsFunctions || {};

var initializeApp = function () {

  $('#profileDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateProfile(event,$('#firstName').val(),$('#lastName').val(),
      $('#userName').val(),$('#address').val(),$('#city').val(),
      $('#state').val(),$('#zipCode').val());
    });
};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
