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
        console.log(event.currentTarget.attributes[1]);
        console.log(event.currentTarget.attributes[2]);
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

};
