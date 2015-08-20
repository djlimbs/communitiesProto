// This function takes a number and adds commas for every hundredth value.
function ReplaceNumberWithCommas(yourNumber) {
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}

function parseResult(result) {
    return JSON.parse($('<div>').html(result).text());
}

/*
    getDepndentOptions will make a describe call to SF and return an object with the fields the dependent picklist
    is dependent on. The function needs the VF page to have the following scripts to work

    <apex:includeScript value="/soap/ajax/30.0/connection.js"/>
    <apex:includeScript value="/soap/ajax/30.0/apex.js"/>
*/
function getDependentOptions (apiKey, objName, ctrlFieldName, depFieldName, namespace) {
	sforce.connection.sessionId = apiKey
    if(namespace){
        objName = namespace + objName;
        ctrlFieldName = namespace + ctrlFieldName;
        depFieldName = namespace + depFieldName;
    }

    // Isolate the Describe info for the relevant fields
    var objDesc = sforce.connection.describeSObject(objName);
    var ctrlFieldDesc, depFieldDesc;
    var found = 0;
    for (var i=0; i<objDesc.fields.length; i++) {
        var f = objDesc.fields[i];
        if (f.name == ctrlFieldName) {
            ctrlFieldDesc = f;
            found++;
        } else if (f.name == depFieldName) {
            depFieldDesc = f;
            found++;
        }
        if (found==2) break; 
    }
 
    // Set up return object
    var dependentOptions = {};

    var ctrlValues = ctrlFieldDesc.picklistValues;
    for (var i=0; i<ctrlValues.length; i++) {
        dependentOptions[ctrlValues[i].label] = [];
    }
 
    var base64 = new sforce.Base64Binary("");
    function testBit (validFor, pos) {
        var byteToCheck = Math.floor(pos/8);
        var bit = 7 - (pos % 8);
        return ((Math.pow(2, bit) & validFor.charCodeAt(byteToCheck)) >> bit) == 1;
    }
    
    // For each dependent value, check whether it is valid for each controlling value
    var depValues = depFieldDesc.picklistValues;
    for (var i=0; i<depValues.length; i++) {
        var thisOption = depValues[i];
        var validForDec = base64.decode(thisOption.validFor);
        for (var ctrlValue=0; ctrlValue<ctrlValues.length; ctrlValue++) {
            if (testBit(validForDec, ctrlValue)) {
                dependentOptions[ctrlValues[ctrlValue].label].push(thisOption.label);
            }
        }
    }
    return dependentOptions;
}