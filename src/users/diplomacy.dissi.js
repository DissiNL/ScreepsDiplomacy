var diplomacy = {}

/**
 * Example of export of custom diplomacy module
 */
modules.exports = diplomacy;

var diplomacyModule = undefined;
diplomacy.init = function(theDiplomacyModule ){
    diplomacyModule = theDiplomacyModule;
    // TODO register custom functions here
}

diplomacy.handleMessage = function(theCreep){
    // TODO handle action
}