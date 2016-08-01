require('./diplomacy.globals');

const diplomacy = {

    /**
     * Main diplomacy module shared by all screepers.
     * Allows you to implement and act according to the diplomacy rules set by the worlds inhabitants.
     * This module will create, and manage, the following memory entry: Memory.diplomacy, this can be changed by calling diplomacy.setMemoryLocation('New name').
     *
     */
    init: function () {
        if(!Memory[CONST_DIPLOMACY_MEMORY_ROOT]) {
            Memory[CONST_DIPLOMACY_MEMORY_ROOT] = {};
        }
    },

    process: function (theCreep) {

    },

    setMaxCpuUsage: function (theUsername, theNewMaximumCpu) {
        var userData = this.getUserDiplomacyObjectFromMemory(theUsername);
        userData.cpuMax = theNewMaximumCpu;
    },

    getMaxCpuUsage: function (theUsername) {
        var userData = this.getUserDiplomacyObjectFromMemory(theUsername);
        if(!userData.cpuMax) {
            return userData.cpuMax;
        }
        return CONST_DIPLOMACY_USER_DEFAULT_CPU;
    },

    setDiplomacyScore: function (theUsername, theNewStatus) {
        var userData = this.getUserDiplomacyObjectFromMemory(theUsername);
        userData.score = theNewStatus;
    },

    getDiplomacyScore: function (theUsername) {
        var userData = this.getUserDiplomacyObjectFromMemory(theUsername);
        var diplomacyState = CONST_DIPLOMACY_USER_DIPLOMACY_STATUS_DEFAULT;
        if(userData.state) {
            diplomacyState = userData.state;
        }
        for(var state in CONST_DIPLOMACY_USER_DIPLOMACY_STATUS) { // Sorted from hostile to friendly
            if(diplomacyState < CONST_DIPLOMACY_USER_DIPLOMACY_STATUS[state]) {
                return state;
            }   
        }
        return CONST_DIPLOMACY_USER_DIPLOMACY_STATUS_FRIENDLY; 
    },

    hookFunction: function (theMethod, theFunction, theUsername) {

    },

    getUserDiplomacyObjectFromMemory: function(theUsername) {
        if(!Memory[CONST_DIPLOMACY_MEMORY_ROOT].users) {
            Memory[CONST_DIPLOMACY_MEMORY_ROOT].users = {};
        }
        if(!Memory[CONST_DIPLOMACY_MEMORY_ROOT].users[theUsername]) {
            Memory[CONST_DIPLOMACY_MEMORY_ROOT].users[theUsername] = { };
        }
        return Memory[CONST_DIPLOMACY_MEMORY_ROOT].users[theUsername];

    },
};

// TODO Add global actions register
// Posibility to hook functions up
// Processing of saying
// Track CPU-sage per "tenant"

module.exports = diplomacy;