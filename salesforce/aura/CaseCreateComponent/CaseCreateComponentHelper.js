({
	getCurrentUser: function(component) {
        // Retrives the currently logged in user
        var action = component.get("c.getCurrentUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.currentUser", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
  	},

  	createCase: function(component) {
		// Create the case and retrieve the case number
		       
        var action = component.get("c.saveNewCase");
		var newCase = component.get("v.newCase");
		var caseSaveEvt = $A.get("e.c:caseSave");

		// set the sObject type
        newCase.sobjectType='Case';
    	// set the new case parameter
      	action.setParams({"newCase" : newCase})
      
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var caseNumber = response.getReturnValue();
				// set the case number attribute
                component.set("v.newCaseNumber", caseNumber);
                // show the message
        		var panel = component.find("msgPanel");
        		$A.util.removeClass(panel, 'hide');
                // hide the panel
        		var panel = component.find("createPanel");
        		$A.util.addClass(panel, 'hide');

				// fire event indicating case is saved with case number
                console.log(caseSaveEvt);
	    		caseSaveEvt.setParams({"caseNumber":caseNumber});
	    		caseSaveEvt.fire();
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action); 
  	},    

    reset: function (component) {
		// reset attributes
        component.set("v.newCaseNumber", null);
        component.set("v.newCase.Subject", null);
        component.set("v.newCase.Description", null);
        // show the message
        var panel = component.find("msgPanel");
        $A.util.addClass(panel, 'hide');
        // hide the panel
        var panel = component.find("createPanel");
        $A.util.removeClass(panel, 'hide');        
    }

})