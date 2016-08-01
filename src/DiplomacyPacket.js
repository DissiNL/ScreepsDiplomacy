var DiplomacyPacket = class DiplomacyPacket {
    /**
     * Creates a new Diplomacy packet based on the specs of https://github.com/ButAds/ScreepsDiplomacy
     */
    constructor () {
        this.dataWritten = 0;
        this.data = [];
    }
    /**
     * Writes 1 short (2 bytes) to the packet
     * @param {theShort} The number to write
     */
    writeShort(theShort) {
        this.writeNumber(theShort, 16);
    }
    /**
     * Writes a1 byte to the packet
     * @param {theByte} The number to write
     */
    writeByte(theByte) {
        this.writeNumber(theByte, 8);
    }
    /**
     * Writes a nibble (1/2 byte) to the packet
     * @param {theNibble} The number to write
     */
    writeNibble(theNibble) {
        this.writeNumber(theNibble, 4);
    }
    /**
     * Writes a number with a certain amount of bits
     * To write the location of a creep efficiently you could use writeNumber(theCreep.pos.x, 6) for example. 6 Bits are enough to cover all of the 0-49 range.
     * @param {theNumber} The number to write
     * @param {theBitCount} The amount of bits it may take up 
     * 
     */
    writeNumber(theNumber, theBitCount) {
        for(let bytes = 0; bytes < theBitCount; bytes++) {
            let toWrite = theNumber >> bytes & 0x1;
            this.writeBit(toWrite);
        }
    }
    /**
     * Writes a single bit to the data packet
     */
    writeBit(theBit) {
        if(this.dataWritten >= 150){
            throw new Exception("Diplomacy packet full");
        }
        if(theBit & 0x1 == 0x01) { // JS bits yay
            let bitNumber = this.dataWritten % 15
            let byteNumber = Math.floor(this.dataWritten / 15);
            this.data[byteNumber] |= ((theBit & 0x1) << bitNumber);
        }
        this.dataWritten++;
    }
    /**
     * Gets the message that can be passed directly to Creep.say
     */
    getSayMessage(){
        let packet = '';
        for(let data = 0; data < this.data.length; data++)
        {
            packet += String.fromCodePoint(this.data[data]);
        }
        return packet;
    }
};

module.exports.DiplomacyPacket = DiplomacyPacket;