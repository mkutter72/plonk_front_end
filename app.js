'use strict';

var externAppsFunctions = externAppsFunctions || {};

var initializeApp = function () {

  $('#profileDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateProfile(event,$('#firstName').val(),$('#lastName').val(),
      $('#userName').val(),$('#address').val(),$('#city').val(),
      $('#state').val(),$('#zipCode').val());
    });


  $('#plonkDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreatePlonk(event,$('#vineyard').val(),$('#variety').val(),
      $('#year').val(),$('#numBottles').val(),$('#price').val(),
      $('#willTade').val());
    });

};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
