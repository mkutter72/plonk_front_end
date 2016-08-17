'use strict';

var externAppsFunctions = externAppsFunctions || {};

var plonkIndexTemplate, messageIndexTemplate;

var plonkCallbacks = {

  callback: function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    // keeping this around just incase I need to turn back on displaying all returns from DB
    var dataStr = JSON.stringify(data, null, 4);

  },

  profileCompleteCallback: function profileCompleteCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    externAppsFunctions.loginComplete();
  },

  profileDisplayCallback: function profileDisplayCallback(error, data) {
    var dataStr = JSON.stringify(data, null, 4);

    if (error || data.profiles.length === 0) {
      $("#profileForm")[0].reset();
      if (error)
        $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    plonkExtras.hasProfile = true;
    externAppsFunctions.displayUserProfile(data.profiles[0]);
  },

  plonkListCallback: function plonkListCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    var plonks = data["plonks"];

    var newHTML  = plonkIndexTemplate({plonks: plonks});
    $("#plonk-list").html(newHTML);


    $('.plonkRow').click(function(event) {
        // row was clicked
        $('table').find('tr.success').removeClass('success');
        $(this).addClass('success');

        externAppsFunctions.plonkRowSelected(event.currentTarget.attributes);

      });
  },

  messageListCallback: function messageListCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    var messages = data["messages"];

    var newHTML  = messageIndexTemplate({messages: messages});
    $("#message-list").html(newHTML);
  },


  callbackGetOnePlonk: function callbackGetOnePlonk(error, data) {
    if (error) {
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    externAppsFunctions.onePlonkReturned(data);
  },

 callbackMyPlonkUpdate: function callbackMyPlonkUpdate(error, data) {
    if (error) {
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    externAppsFunctions.updateMyPlonkList();
  },
};
