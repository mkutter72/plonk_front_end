'use strict';

var externAppsFunctions = externAppsFunctions || {};

var editPlonkID = -1;

var clearPlonkAd = function (){
  $('#inputVyard').val("");
  $('#inputVariety').val("");
  $('#inputYear').val("");
  $('#inputNumBottles').val("");
  $('#inputPrice').val("");
  $('#inputTrade').val("");
};

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
    $(".form-message-table").hide();
    $(".form-plonkShowMine").hide();
    $("#messageButtonGroup").hide();
    $(".introText").hide();
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

var getUserPlonkList = function(){
  plonkExtras.ajaxShowPlonk(event, "?user_id=" + plonkExtras.userID);
};

var gotoMyPlonkTab = function () {
    allTabsNonActive();
    $('#plonk-li').addClass('active');
    $(".form-plonk").show();
    plonkExtras.clearPlonks();
    $(".form-browse-table").show();
    $(".form-plonkShowMine").show();
    $("#plonkListTable").css("top",-447);
    clearPlonkAd();
    getUserPlonkList();
};


var updatePlonkAdInfo = function(data) {
  $('#inputVyard').val(data["vineyard"]);
  $('#inputVariety').val(data["variety"]);
  $('#inputYear').val(data["year"]);
  $('#inputNumBottles').val(data["number_of_bottles"]);
  $('#inputPrice').val(data["price"]);
  $('#inputTrade').val(data["will_trade"]);
};


var updatePlonkAdInfoFromRow = function(data) {
  $('#inputVyard').val(data[1].value);
  $('#inputVariety').val(data[2].value);
  $('#inputYear').val(data[3].value);
  $('#inputNumBottles').val(data[4].value);
  $('#inputPrice').val(data[5].value);
  $('#inputTrade').val(data[6].value);
  editPlonkID = data[8].value
};


var initializeApp = function () {


  // Setup the callbacks for button clicks on the UI
  // Create User Profile
  $('#profileButton').on('click', function(event) {
    plonkExtras.ajaxCreateProfile(event,$('#inputFname').val(),$('#inputLname').val(),
      $('#inputUname').val(),$('#inputAddress').val(),$('#inputCity').val(),
      $('#inputState').val(),$('#inputZip').val());
    });


  // Create a new plonk ad
  $('#plonkButton').on('click', function(event) {
    plonkExtras.ajaxCreatePlonk(event,$('#inputVyard').val(),$('#inputVariety').val(),
      $('#inputYear').val(),$('#inputNumBottles').val(),$('#inputPrice').val(),
      $('#inputTrade').val());

      clearPlonkAd();
    });


  // Update an existing plonk ad
   $('#plonkSaveButton').on('click', function(event) {
    if (editPlonkID > 0) {
        plonkExtras.ajaxUpdatePlonk(event,$('#inputVyard').val(),$('#inputVariety').val(),
          $('#inputYear').val(),$('#inputNumBottles').val(),$('#inputPrice').val(),
          $('#inputTrade').val(),editPlonkID);

        clearPlonkAd();
        editPlonkID = -1;
      };
    });


   // Create a message
  $('#messageButton').on('click', function(event) {
    plonkExtras.ajaxCreateMessage(event,"",$('#inputReceiver').val(),$('#inputMessage').val());
    plonkExtras.ajaxCreateMessage(event,"copy",$('#inputReceiver').val(),$('#inputMessage').val());
    $('#inputReceiver').val("");
    $('#inputMessage').val("")
    });

  // Show all plonk
  $('#showPlonkButton').on('click', function(event) {
    plonkExtras.ajaxShowPlonk(event, "");
    });

  // Search for plonk based on city or variety
  $('#searchPlonkButton').on('click', function(event) {
    if ($('#inputPlonkCity').val()) {
      plonkExtras.ajaxShowPlonk(event, "?city=" + $('#inputPlonkCity').val());
      };
    if ($('#inputPlonkType').val()) {
      plonkExtras.ajaxShowPlonk(event, "?variety=" + $('#inputPlonkType').val());
      };

    $('#inputPlonkType').val("");
    $('#inputPlonkCity').val("");
    });

  // Delete a plonk ad
  $('#plonkDeleteButton').on('click', function(event) {
    if (editPlonkID > 0)
      plonkExtras.ajaxDeletePlonk(event, editPlonkID);

    clearPlonkAd();
    });

  // Display mesages that belong to the user
  $('#showMessagesButton').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxDisplayUsersMessages(event);
    });

  // Show all messages - not used
  /*
  $('#showMessagesButton').on('click', function(event) {
    //$('#profile').blur();

    plonkExtras.ajaxShowAllMessages(event);
    });
  */

  // Delete the messages for the current user
 $('#clearMessagesButton').on('click', function(event) {
    plonkExtras.ajaxDestoryUsersMessages(event);
    plonkExtras.clearMessages();
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
    if (plonkExtras.loggedIn) {
      plonkExtras.clearPlonks();
      goToBrowseTab();
      $("#plonkListTable").css("top",-210);
      };
    });

  $('#plonk-tab').on('click', function(event) {
      if (plonkExtras.loggedIn) {
        gotoMyPlonkTab()
      };
  });

 $('#message-tab').on('click', function(event) {
    if (plonkExtras.loggedIn) {
      allTabsNonActive();
      $('#message-li').addClass('active');
      $(".form-message").show();
      plonkExtras.clearMessages();
      $(".form-message-table").show();
      $("#messageButtonGroup").show();
    };
  });

};

// Setup so index.js file can call this
externAppsFunctions['initApps'] = initializeApp;
externAppsFunctions['loginComplete'] = gotoMyPlonkTab;
externAppsFunctions['registerComplete'] = goToLoginTab;
externAppsFunctions['onePlonkReturned'] = updatePlonkAdInfo;
externAppsFunctions['plonkRowSelected'] = updatePlonkAdInfoFromRow;
externAppsFunctions['updateMyPlonkList'] = getUserPlonkList;
