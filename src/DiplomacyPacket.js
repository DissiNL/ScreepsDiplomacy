/**
 * Main communication file used for layer 0 communications. 
 */

const BITS_PER_CHARACTER = 15;

let LOOKUP_BYTEPOS = [];
for(let i = 0; i < BITS_PER_CHARACTER * 20; i++)
{
    LOOKUP_BYTEPOS[i] = Math.floor(i / BITS_PER_CHARACTER);
}

var OutgoingDiplomacyPacket = class OutgoingDiplomacyPacket {
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
            let bitNumber = this.dataWritten % BITS_PER_CHARACTER;
            let byteNumber = Math.floor(this.dataWritten / BITS_PER_CHARACTER);
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
        console.log('Wrote ' + this.dataWritten + " bits") ;
        return packet;
    }
};

var IncomingDiplomacyPacket = class IncomingDiplomacyPacket {
    /**
     * Creates a new IncomingDiplomacy packet based on the specs of https://github.com/ButAds/ScreepsDiplomacy
     */
    constructor (theData) {
        this.setData(theData);
    }
    setData(theData) {
        this.readBytes = 0;
        this.data = [];
        if(theData.length) {
            for(let i = 0 ; i < theData.length; i++)
            {
                this.data.push(theData.charCodeAt(i));
            }
        }
    }
    
    /**
     * Reads a number with a certain amount of bits
     * This will read a certain number of a certain length.
     * @param {theBitCount} The amount of bits that make up the number
     * 
     */
    readNumber(theBitCount) {
        let result = 0;
        for(let bits = 0; bits < theBitCount; bits++) {
            
            let bit = this.readBit();
            if(bit == 0x1) {
                result |= bit << bits;
            }
        }
        return result;
    }
    /**
     * Reads a single bit from the data packet
     */
    readBit() {
        if(this.readBytes >= (this.data.length * BITS_PER_CHARACTER) ){
            return 0;
        }
        
        let bitNumber = this.readBytes % BITS_PER_CHARACTER;
        let byteNumber;
        if(LOOKUP_BYTEPOS.length > this.readBytes)
        {
            byteNumber = LOOKUP_BYTEPOS[this.readBytes];
        }
        else
        {
            byteNumber = Math.floor(this.readBytes / BITS_PER_CHARACTER);    
        }
        
        let data = (this.data[byteNumber] >> bitNumber) & 0x1;
        this.readBytes++;
        return data;
    }
};

module.exports.OutgoingDiplomacyPacket = OutgoingDiplomacyPacket;
module.exports.IncomingDiplomacyPacket = IncomingDiplomacyPacket;