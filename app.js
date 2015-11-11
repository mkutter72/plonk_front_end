'use strict';

var externAppsFunctions = externAppsFunctions || {};

var initializeApp = function () {

  // Setup the callbacks for button clicks on the UI
  // Create User Profile
  $('#profileDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateProfile(event,$('#firstName').val(),$('#lastName').val(),
      $('#userName').val(),$('#address').val(),$('#city').val(),
      $('#state').val(),$('#zipCode').val());
    });


  // Create a new plonk ad
  $('#plonkDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreatePlonk(event,$('#vineyard').val(),$('#variety').val(),
      $('#year').val(),$('#numBottles').val(),$('#price').val(),
      $('#willTade').val());
    });

  // Update and existing plonk ad
   $('#plonkEdit').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxUpdatePlonk(event,$('#vineyard').val(),$('#variety').val(),
      $('#year').val(),$('#numBottles').val(),$('#price').val(),
      $('#willTade').val(),$('#plonkID').val());
    });


   // Create a message
  $('#messageDone').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateMessage(event,$('#receiver').val(),$('#messageContent').val());

    $('#receiver').val("");
    $('#messageContent').val("");
    });

  // Show all plonk
  $('#plonkShow').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxShowPlonk(event, "");
    });

  // Search for plonk based on city or variety
  $('#plonkSearch').on('click', function(event) {
    //$('#profile').blur();
    if ($('#plonkCity').val()) {
      plonkExtras.ajaxShowPlonk(event, "?city=" + $('#plonkCity').val());
      };
    if ($('#plonkVariety').val()) {
      plonkExtras.ajaxShowPlonk(event, "?variety=" + $('#plonkVariety').val());
      };
    });

  // Show all plonk that belongs to the current user
  $('#plonkShowMine').on('click', function(event) {

    plonkExtras.ajaxShowPlonk(event, "?user_id=" + plonkExtras.userID);

    });


  // Delete a plonk ad
  $('#plonkDelete').on('click', function(event) {

    if ($('#plonkID').val())
      plonkExtras.ajaxDeletePlonk(event, $('#plonkID').val());
    });

  // Display mesages that belong to the user
  $('#displayMessages').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxDisplayUsersMessages(event);
    });

  // Show all messages
  $('#showMessages').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxShowAllMessages(event);
    });

  // Delete the messages for the current user
 $('#clearMessages').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxDestoryUsersMessages(event);
    });


 $('#plonk-table').on('click', function(event) {
    var clicked_tr = $(this);
    $('#plonk-table tr').removeClass("highlight");
    clicked_tr.addClass('highlight');
  });

  function allTabsNonActive (){
    $('#login-li').removeClass('active');
    $('#profile-li').removeClass('active');
    $('#browse-li').removeClass('active');
    $('#plonk-li').removeClass('active');
    $('#message-li').removeClass('active');
    $('#register-li').removeClass('active');

    $(".form-signin").hide();
    $(".form-register").hide();
    $(".form-profile").hide();
  }

  $('#profile-tab').on('click', function(event) {
      allTabsNonActive();
      $('#profile-li').addClass('active');
      $(".form-profile").show();
  });

  $('#login-tab').on('click', function(event) {
      allTabsNonActive();
      $('#login-li').addClass('active');
      $(".form-signin").show();
  });

  $('#register-tab').on('click', function(event) {
      allTabsNonActive();
      $('#register-li').addClass('active');
      $(".form-register").show();
  });

};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
