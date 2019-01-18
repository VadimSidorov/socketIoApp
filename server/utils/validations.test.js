const expect = require('expect');

const {isRealString, UniqueUser} = require('./validators');
const {Users} = require('./users')

describe('isRealString',()=>{

    beforeEach(()=>{
        users = new Users();
        
        users.users = [{
            id:1,
            name:"Vadick",
            room:'Node Course'
        },{
            id:2,
            name:"Alena",
            room:'React Course'
        },{
            id:3,
            name:"Kristina",
            room:'Node Course'
        }]
    });

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

    it('should validate unique user',()=>{
        var userList = users.getUserList('Node Course');
        var x = UniqueUser('Vadick', userList).length;
        
        expect(x).toBe(0);

        expect()
    })
})