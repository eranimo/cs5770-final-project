// send a request
function send() {
	function reqListener () {
    // console.log('data received: ', this.responseText);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("POST", "/echo/json/", true);
  oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  oReq.send('json={"foo": "bar"}');
}

// override and listen
var activeRequest = {};
var oldOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url, isAsync) {
  activeRequest.method = method;
  activeRequest.url = url;
	oldOpen.apply(this, [method, url, isAsync]);
}

XMLHttpRequest.prototype.oldSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (data) {
  activeRequest.parameters = [];
  var args = data.split("&").map(function (argString) {
  	var argSplit = argString.split('=');
    var argName = argSplit[0];
    var argValue = JSON.parse(argSplit[1]);
    activeRequest.parameters.push({
    	key: argName,
      value: argValue
    });
  });
  this.oldSend(data);
}

var oldEventListener = XMLHttpRequest.prototype.addEventListener;
XMLHttpRequest.prototype.addEventListener = function (eventName, callback) {
	if (eventName === "load") {
    var newCallback = function () {
    	activeRequest.response = this;
      console.log(activeRequest);
      // Do something with the request

      // Send the original callback so we don't break anything
      callback();
    }
  	oldEventListener.apply(this, [eventName, newCallback])
  }
}

//
send()
