({
    doInit : function(component, event, helper) {
       //Update expense counters
       helper.getCurrentUser(component);
    }, //Delimiter for future code
    
    createCase : function (component, event, helper) {
		helper.createCase(component);
    },
    
    reset : function (component, event, helper) {
        helper.reset(component);
    }
    
})