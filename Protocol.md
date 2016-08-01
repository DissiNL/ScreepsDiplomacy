# `Draft, open for discussion`

# ScreepsDiplomacy - Protocol

The saying [Creep.saying](http://support.screeps.com/hc/en-us/articles/203013212-Creep#saying) value is used for communcations.  

## Layer 0
After tests we found out the following bit range to be available for [Creep.saying](http://support.screeps.com/hc/en-us/articles/203013212-Creep#saying)  
`0b0111 1111 1111 1111` - 15 bits in total.  


Using this knowledge we can send 15 bits per character of [Creep.saying](http://support.screeps.com/hc/en-us/articles/203013212-Creep#saying)  
Effectively we get a bandwidth of *150* bits/tick, or *18,75* bytes/tick  
The data in this structure is free to use, all supported methods are available in [DiplomacyPacket.js](src/DiplomacyPacket.js)  
Look in there for more information

## Layer 1
