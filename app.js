'use strict';

var externAppsFunctions = externAppsFunctions || {};


var  allTabsNonActive =function (){
    $('#login-li').removeClass('active');
    $('#profile-li').removeClass('active');
    $('#browse-li').removeClass('active');
    $('#plonk-li').removeClass('active');
    $('#message-li').removeClass('active');
    $('#register-li').removeClass('active');

    $(".form-signin").hide();
    $(".form-register").hide();
    $(".form-profile").hide();
    $(".form-message").hide();
    $(".form-plonk").hide();
    $(".form-browse").hide();
    $(".form-browse-table").hide();
  };

var goToBrowseTab = function() {
  allTabsNonActive();
  $('#browse-li').addClass('active');
  $(".form-browse").show();
  $(".form-browse-table").show();
};

var goToLoginTab = function() {
  allTabsNonActive();
  $('#login-li').addClass('active');
  $(".form-signin").show();
};

var initializeApp = function () {

  // Setup the callbacks for button clicks on the UI
  // Create User Profile
  $('#profileButton').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateProfile(event,$('#inputFname').val(),$('#inputLname').val(),
      $('#inputUname').val(),$('#inputAddress').val(),$('#inputCity').val(),
      $('#inputState').val(),$('#inputZip').val());
    });


  // Create a new plonk ad
  $('#plonkButton').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreatePlonk(event,$('#inputVyard').val(),$('#inputVariety').val(),
      $('#inputYear').val(),$('#inputNumBottles').val(),$('#inputPrice').val(),
      $('#inputTrade').val());
    });

  // Update and existing plonk ad
   $('#plonkEdit').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxUpdatePlonk(event,$('#vineyard').val(),$('#variety').val(),
      $('#year').val(),$('#numBottles').val(),$('#price').val(),
      $('#willTade').val(),$('#plonkID').val());
    });


   // Create a message
  $('#messageButton').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxCreateMessage(event,$('#inputReceiver').val(),$('#inputMessage').val());
    $('#inputReceiver').val("");
    $('#inputMessage').val("")
    });

  // Show all plonk
  $('#showPlonkButton').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxShowPlonk(event, "");
    });

  // Search for plonk based on city or variety
  $('#searchPlonkButton').on('click', function(event) {
    //$('#profile').blur();
    if ($('#inputPlonkCity').val()) {
      plonkExtras.ajaxShowPlonk(event, "?city=" + $('#inputPlonkCity').val());
      };
    if ($('#inputPlonkType').val()) {
      plonkExtras.ajaxShowPlonk(event, "?variety=" + $('#inputPlonkType').val());
      };

    $('#inputPlonkType').val("");
    $('#inputPlonkCity').val("");
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


 // this doesn't work
 $('#plonk-table').on('click', function(event) {
    var clicked_tr = $(this);
    $('#plonk-table tr').removeClass("highlight");
    clicked_tr.addClass('highlight');
  });



  $('#profile-tab').on('click', function(event) {
    allTabsNonActive();
    $('#profile-li').addClass('active');
    $(".form-profile").show();
  });

  $('#login-tab').on('click', function(event) {
    goToLoginTab();
  });

  $('#register-tab').on('click', function(event) {
    allTabsNonActive();
    $('#register-li').addClass('active');
    $(".form-register").show();
  });

  $('#browse-tab').on('click', function(event) {
      goToBrowseTab();
    });

  $('#plonk-tab').on('click', function(event) {
    allTabsNonActive();
    $('#plonk-li').addClass('active');
    $(".form-plonk").show();
  });

 $('#message-tab').on('click', function(event) {
    allTabsNonActive();
    $('#message-li').addClass('active');
    $(".form-message").show();
  });

};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
externAppsFunctions['loginComplete'] = goToBrowseTab;
externAppsFunctions['registerComplete'] = goToLoginTab;
