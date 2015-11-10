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

   $('#plonkEdit').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxUpdatePlonk(event,$('#vineyard').val(),$('#variety').val(),
      $('#year').val(),$('#numBottles').val(),$('#price').val(),
      $('#willTade').val(),$('#plonkID').val());
    });

  $('#messageDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateMessage(event,$('#sender').val(),$('#receiver').val(),
      $('#messageContent').val());

    $('#sender').reset();
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

  $('#plonkShowMine').on('click', function(event) {

    plonkExtras.ajaxShowPlonk(event, "?user_id=" + plonkExtras.userID);

    });


  $('#plonkDelete').on('click', function(event) {

    if ($('#plonkID').val())
      plonkExtras.ajaxDeletePlonk(event, $('#plonkID').val());
    });


  $('#displayMessages').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxDisplayUsersMessages(event);
    });


  $('#showMessages').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxShowAllMessages(event);
    });


 $('#clearMessages').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxDestoryUsersMessages(event);
    });

};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
