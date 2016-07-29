/**
 * Example of export of custom diplomacy module
 */

let diplomacyModule = undefined;

const diplomacy = {

    init: function (theDiplomacyModule) {
        diplomacyModule = theDiplomacyModule;
        // TODO register custom functions here
    },

    handleMessage: function (theCreep) {
        // TODO handle action
    }
};

module.exports = diplomacy;