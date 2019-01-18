const {Users} = require('../server/utils/users')

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

        var rooms = users.users.map(i=>i.room);

        uniqueArray = rooms.filter(function(item, pos) {
            return rooms.indexOf(item) == pos;
        })
        console.log(rooms.indexOf('Node Course'))

        
