require('diplomacy.globals');
var diplomacy = {}

/**
 * Main diplomacy module shared by all screepers.
 * Allows you to implement and act according to the diplomacy rules set by the worlds inhabitants.
 * This module will create, and manage, the following memory entry: Memory.diplomacy, this can be changed by calling diplomacy.setMemoryLocation('New name').
 * 
 */
modules.exports = diplomacy;

diplomacy.init = function() {
    // TODO init
}

diplomacy.setMemoryLocation = function(theLocation) {
    if (!Memory[theLocation]) {
        Memory[theLocation] = {};
    }
    global.CONST_DIPLOMACY_MEMORY_ROOT = theLocation;
}

diplomacy.process = function(theCreep) {

}

diplomacy.setMaxCpuUsage = function(theUsername, theNewMaximumCpu) {

}

diplomacy.setDiplomacyScore = function(theUsername, theNewStatus) {

}

diplomacy.getMaxCpuUsage = function(theUsername, theNewMaximumCpu) {
    return 0;
}

diplomacy.setDiplomacyScore = function(theUsername, theNewStatus) {
    return 0;
}

diplomacy.hookFunction = function(theMethod, theFunction, theUsername) {

}

// TODO Add global actions register
// Posibility to hook functions up
// Processing of saying
// Track CPU-sage per "tenant"