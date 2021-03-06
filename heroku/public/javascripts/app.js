
function forceInit() {
	force.init(config);
};

function forceLogin(key) {
	forceInit();
	force.login(function(success) {
		var oauth = force.getOauth();
		setupLightning();
	});	
}

var _lightningReady = false;
var resetEvent;

function setupLightning(callback) {
	var appName = config.loApp;
	var oauth = force.getOauth();
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // Transform the URL for Lightning
	    var url = oauth.instanceUrl.replace("my.salesforce", "lightning.force");

	    $Lightning.use(appName, 
	        function() {
				_lightningReady = true;
				document.getElementById("caseWidget").style.display = "";
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);
	}
}

function createCaseWidget() {
    setupLightning(function() {
		$Lightning.createComponent("c:CaseCreateComponent", {}, "caseWidget");
	});
}


function resetCaseWidget() {
	var resetEvent = $A.get("e.c:resetForm");
	resetEvent.fire();
}

var displayCaseNumber = function(event){
	var caseNumber = event.getParam("caseNumber");
	document.getElementById("caseResult").innerHTML = "<br>Case created with case number " + caseNumber;
};
