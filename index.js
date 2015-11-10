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

    $('#result').val(JSON.stringify(data, null, 4));
  },

  ajaxCreateProfile: function (e,fName,lName,uName,address,city,state,zip){
    var myData = {
      "profile": {
        "first_name": fName,
        "last_name": fName,
        "user_name": uName,
        "street_address": address,
        "city": city,
        "state": state,
        "zip_code": zip
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
        "will_trade": willTrade
        }
      }

    e.preventDefault();
    tttapi.createPlonk(this.tokenID, this.userID, myData, this.callback);
  },

 ajaxCreateMessage: function (e,sender,receiver,mContent){
    var myData = {
      "message": {
        "sender_user_name": sender,
        "receiver_user_name": receiver,
        "plonk_message": mContent
        }
      }

    e.preventDefault();
    tttapi.createMessage(this.tokenID, this.userID, myData, this.callback);
  },

  ajaxShowPlonk: function(e,query){
    e.preventDefault();
    tttapi.showPlonk(this.tokenID, this.userID, query, this.callback);
  },
};



var gameExtras = {
  myToken: 0,
  myGameID: 0,
  singleMode: true,
  player: 'X',


  callback: function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
  },

  callbackNewGame: function callbackNewGame(error, data) {
    if (error) {
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    gameExtras.myGameID = data.game.id;
    gameExtras.displayGameID(gameExtras.myGameID);
    $('#result').val(JSON.stringify(data, null, 4));
  },

 callbackWatchGame: function callbackWatchGame(error, data) {
    if (error) {
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }


    $('#result').val(JSON.stringify(data, null, 4));
  },


  ajaxMarkCell: function(e,index,value){
   var myData = {
      "game" : {
        "cell" : {
          "index": index,
          "value": value,}}}

    e.preventDefault();
    tttapi.markCell(this.myGameID, myData, this.myToken, this.callback);
  },

  ajaxEndCurentGame: function (e){
    e.preventDefault();
    tttapi.endGame(this.myGameID, this.myToken, this.callback);
  },

  ajaxCreateNewGame: function(e) {
    e.preventDefault();
    tttapi.createGame(this.myToken, this.callbackNewGame);
  },


  ajaxJoinGame: function(e)
  {
    gameExtras.myGameID = $('.mgIDClass').val();
    e.preventDefault();
    tttapi.joinGame(
    gameExtras.myGameID, this.myToken, this.callback);
  },

  ajaxWatchGame:  function(e){
    var gID = $('.mgIDClass').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(gID, this.myToken);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      gameExtras.otherPlayerMove(cell.index,cell.value);

      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
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

  //Authenticated api actions
  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json',
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },


  endGame: function (id, token, callback) {
     var myData = {
      "game" : {
        "over" : true,
      }
    }
    this.ajax({
     method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(myData),
      dataType: 'json',
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
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

  createPlonk: function (token, id, data, callback) {
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

 createMessage: function (token, id, data, callback) {
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
      plonkExtras.tokenID = data.user.token
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('#create-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, callback);
  });

  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);
  });

 $('#end-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#end-id').val();
    e.preventDefault();
    tttapi.endGame(id, token, callback);
  });

  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  });

  $('#xxx').on('click', function(e){
     $('#xxx').blur();
    gameExtras.singleMode = false;
    var id = $('.mgIDClass').val();
    var token = gameExtras.myToken;
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      gameExtras.otherPlayerMove(cell.index,cell.value);

    gameExtras.otherPlayerMove(cell.index,cell.value);

    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

  externAppsFunctions.initApps();
});





