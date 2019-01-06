const expect = require('expect');

const {Users} = require('./users');



describe('Users', ()=>{
    var users;

    beforeEach(()=>{
        users = new Users;
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

    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id:'12344',
            name:'Vadim',
            room:'123'
        }

        var resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    });

    it('should remove user',()=>{
        var user = users.removeUser(2)
        expect(user).toBe('Alena')
    });

    it('should not remove user',()=>{
        var user = users.removeUser(4)
        expect(user).toNotExist()
    });

    it('should find user',()=>{
        var user = users.getUser(1);
        expect(user).toEqual(['Vadick'])
    });

    it('should not find user',()=>{
        var user = users.getUser(5);
        expect(user).toNotExist()
    });

    it('should return names for node course',()=>{
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Vadick', 'Kristina'])
    })
})