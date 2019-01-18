var isRealString = (str)=>{
    return typeof str === 'string' && str.trim().length > 0;
};

var UniqueUser = (name, room, users)=>{

    var sameUserAmount = users.filter(user=>user.room===room & user.name===name).length
    return sameUserAmount !== 0

}
module.exports={isRealString, UniqueUser};