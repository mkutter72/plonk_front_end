'use strict';

var externAppsFunctions = externAppsFunctions || {};

var plonkExtras = {
  tokenID: 0,
  userID: 0,

  callback: function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    // var parsedData = JSON.parse(data);

    $('#result').val(JSON.stringify(data, null, 4));
  },

  ajaxCreateProfile: function (e,fName,lName,uName,address,city,state,zip){
    var myData = {
      "profile": {
        "first_name": fName,
        "last_name": lName,
        "user_name": uName,
        "street_address": address,
        "city": city,
        "state": state,
        "zip_code": zip,
        "user_id" : this.userID
        }
      }

    e.preventDefault();
    tttapi.createProfile(this.tokenID, this.userID, myData, this.callback);
  },


  ajaxCreatePlonk: function (e,vYard,variety,year,numBottles,price,willTrade){
    var myData = {
      "plonk": {
        "vineyard": vYard,
        "variety": variety,
        "year": year,
        "number_of_bottles": numBottles,
        "price": price,
        "will_trade": willTrade,
        "user_id" : this.userID
        }
      }

    e.preventDefault();
    tttapi.createPlonk(this.tokenID, myData, this.callback);
  },

  ajaxUpdatePlonk: function (e,vYard,variety,year,numBottles,price,willTrade, plonkID){
    var myData = {
      "plonk": {
        "vineyard": vYard,
        "variety": variety,
        "year": year,
        "number_of_bottles": numBottles,
        "price": price,
        "will_trade": willTrade
        }
      }

    e.preventDefault();
    tttapi.updatePlonk(this.tokenID, plonkID, myData, this.callback);
  },

 ajaxCreateMessage: function (e,receiver,mContent){
    var myData = {
      "message": {
        "sender_user_name": "",
        "receiver_user_name": receiver,
        "plonk_message": mContent,
        "user_id": this.userID
        }
      }

    e.preventDefault();
    tttapi.createMessage(this.tokenID, myData, this.callback);
  },

  ajaxShowPlonk: function(e,query){
    e.preventDefault();
    tttapi.showPlonk(this.tokenID, this.userID, query, this.callback);
  },

  ajaxShowAllMessages: function(e){
    e.preventDefault();
    tttapi.showAllMessages(this.tokenID, this.callback);
  },


  ajaxDisplayUsersMessages: function(e){
    e.preventDefault();
    tttapi.displayUsersMessages(this.tokenID, this.userID, this.callback);
  },

  ajaxDestoryUsersMessages: function(e){
    e.preventDefault();
    tttapi.destoryUsersMessages(this.tokenID, this.userID, this.callback);
  },

  ajaxDeletePlonk: function(e, id) {
    e.preventDefault();
    tttapi.destoryPlonk(this.tokenID, id, this.callback);
  },

};




var tttapi = {
  gameWatcher: null,
  ttt: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },


  createProfile: function (token, id, data, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/profiles',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
    }, callback);
  },

  createPlonk: function (token, data, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/plonks',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
    }, callback);
  },

  updatePlonk: function (token, id, data, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/plonks/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
    }, callback);
  },

 createMessage: function (token, data, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/messages',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
    }, callback);
  },

  showPlonk: function (token, id, query, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/plonks' + query,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }, callback);
  },

  showAllMessages: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/messages',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }, callback);
  },


  displayUsersMessages: function (token, id, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/messages/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }, callback);
  },


  destoryUsersMessages: function (token, id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.ttt + '/messages/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }, callback);
  },


  destoryPlonk: function (token, id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.ttt + '/plonks/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }, callback);
  },
};

////////////////////////

//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
  };

   var registerCallback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('.loginStatus').text("Error in registration");
      return;
    }
    $('.loginStatus').text("Successful registration");
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this))


    tttapi.register(credentials, registerCallback);
    e.preventDefault(); /* should always be called with a submit event,  default is brower packs data up
                          and send to webpage server.  You want to send it to data server
                          IF SOMETHING IS CLICKABLE AND YOU ARE DOING SOMETHING IN J SCRIPT CALL this */
  });

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        $('.loginStatus').text("Error in login");
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);

      // after successful login,  save the token and User ID
      plonkExtras.tokenID = data.user.token;
      plonkExtras.userID = data.user.id;
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });


  externAppsFunctions.initApps();
});





