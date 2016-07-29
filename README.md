# ScreepsDiplomacy

## `Draft, open for discussion`


Main diplomacy module shared by all screepers.

Allows you to implement and act according to the diplomacy rules set by the worlds inhabitants.
 - Global functions to see diplomacy requests
 - Publish said data onto enemy/friendly creeps ( becomes available under creep.diplomacy )
 - Keep track of CPU used on Diplomacy-actions based per user
 - Give players a Maximum bucket to work with (default is 1 CPU per player, see [Functions](#Functions)), every action can be configured to consume X CPU. Or use real-life CPU limits.
 - Track hostility of users (ranging from -10 to 10) based on their actions.

### Version
1.0.0


### Modifies following screeps data

This module will create, and manage, the following memory entry:
 - `Memory.__diplomacy__`  
 - The [Creep](http://support.screeps.com/hc/en-us/articles/203013212-Creep).diplomacy will be added when a creep performed a diplomatic action


### Functions


| Action | Function | Description|
|---------------------|:----------------------------------------------|:---------------------------------------------------------------|
| User CPU management | `diplomacy.setMaxCpuUsage('theUsername', 1);` | Sets the maximum amount of CPU a user can useMy Account| Change diplomacy state | `diplomacy.setDiplomacyScore('theUsername', CONST_DIPLOMACY_USER_RATING_*);` | Sets the diplomacy score of a player to friendly, based on one of the CONST_DIPLOMACY_USER_RATING_* constants |

All setters have an equivalent getter.


### Installation
If you're using grunt-screeps:
Checkout in your DIST folder. 
Edit the `src` property the following to your gruntfile.js:
```sh
src: ['dist/*.js','dist/ScreepsDiplomacy/src/*.js']
``` 
**Optional** If you want to support "custom" user-based actions you can also choose to include
```sh
src: ['dist/*.js','dist/ScreepsDiplomacy/src/*.js', 'dist/ScreepsDiplomacy/src/users/diplomacy_*.js']
```

Adding it to your main script:
```javascript
var diplomacy = require('diplomacy');
module.exports.loop = function() {
    diplomacy.init(); // Must be called on every iteration you want to use the diplomacy module

    var randomHostileCreep = getHostileCreepFromSomeLocation();
    diplomacy.process(randomHostileCreep);
    if(randomHostileCreep.diplomacy) {
       console.log(JSON.stringify(randomHostileCreep.diplomacy));
    }
}

```

### Specifications

##### Protocol

The saying [Creep.saying](http://support.screeps.com/hc/en-us/articles/203013212-Creep#saying) value is used for communcations.  
The first 4 characters are used to identify a message between creeps.  
The first 4 characters are encoded in base36 to allow for 1679616 messages to be created.  
If the decoded ID of the message is 0 a custom-user-script is requested.  

##### Code conventions

The diplomacy scripts requires you to free up the global ***CONST_DIPLOMACY_\**** namesapce. Constants will be published to this list.  
 - Globals are to be defined in the diplomacy.globals.js file
 - User scripts are placed inside the users/ folder and be named ***diplomacy.[usernamehere].js***
 - Naming of parameters must start with ***the\**** (***the***Creep, ***the***Action) This makes for easier to distinguish between variables and parameters
