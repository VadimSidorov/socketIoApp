const expect = require('expect');

const {isRealString} = require('./validators');

describe('isRealString',()=>{
    it('should reject non string values', ()=>{
        var displayName = true;
        var roomName = false;
        var stringDisplay = isRealString(displayName);
        var stringName = isRealString(roomName);  

        expect(stringDisplay).toBe(false);
        expect(stringName).toBe(false)
    });

    it('should reject string with only spaces', ()=>{
        var displayName = '   ';
        var roomName = '  ';
        var stringDisplay = isRealString(displayName);
        var stringName = isRealString(roomName);  

        expect(stringDisplay).toBe(false);
        expect(stringName).toBe(false)
    });

    it('should allow string with non-space characters', ()=>{
        var displayName = '   Vadim';
        var roomName = "Sidorov";
        var stringDisplay = isRealString(displayName);
        var stringName = isRealString(roomName);  

        expect(stringDisplay).toBe(true);
        expect(stringName).toBe(true)
    });
})