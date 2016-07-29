require('./diplomacy.globals');

const theMemoryLocation = global.CONST_DIPLOMACY_MEMORY_ROOT;

const diplomacy = {

    /**
     * Main diplomacy module shared by all screepers.
     * Allows you to implement and act according to the diplomacy rules set by the worlds inhabitants.
     * This module will create, and manage, the following memory entry: Memory.diplomacy, this can be changed by calling diplomacy.setMemoryLocation('New name').
     *
     */
    init: function () {
        // TODO init
    },

    process: function (theCreep) {

    },

    setMaxCpuUsage: function (theUsername, theNewMaximumCpu) {

    },

    getMaxCpuUsage: function (theUsername, theNewMaximumCpu) {
        return 0;
    },

    setDiplomacyScore: function (theUsername, theNewStatus) {
        return 0;
    },

    hookFunction: function (theMethod, theFunction, theUsername) {

    }
};

// TODO Add global actions register
// Posibility to hook functions up
// Processing of saying
// Track CPU-sage per "tenant"

module.exports = diplomacy;