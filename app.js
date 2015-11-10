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

  $('#messageDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateMessage(event,$('#sender').val(),$('#receiver').val(),
      $('#messageContent').val());
    });

  $('#plonkShow').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxShowPlonk(event, "");
    });

 $('#plonkSearch').on('click', function(event) {
    //$('#profile').blur();
    if ($('#plonkCity').val()) {
      plonkExtras.ajaxShowPlonk(event, "?city=" + $('#plonkCity').val());
      };
    if ($('#plonkVariety').val()) {
      plonkExtras.ajaxShowPlonk(event, "?variety=" + $('#plonkVariety').val());
      };
    });

};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
