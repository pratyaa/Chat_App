users=[]

// addUser,reamoveUser,getUsers,getUsersInRoom

const addUser= ({id,username,room})=>{
    // Clean data
    username=username.trim().toLowerCase()
    room =room.trim().toLowerCase()

    //Validate data
    if(!username || !room)
    {
        return{
            error:"Username and room name are required"
        }
    }
    
   const existingUser=users.find( (user)=>{
       return (username===user.username && room===user.room)
   })

   if(existingUser)
   {
       return{
           error:"User alredy exists in the room"
       }
   }
   const user={id,username,room}
   users.push(user)
   console.log(users)
   return user

}

const removeUser=(id)=>{
  index=users.findIndex((user)=> user.id=== id)

  if(index!== -1)
  {
      return users.splice(index,1)[0]
  }
    
}


const getUser=(id)=>{
    exist=users.find((user)=> id===user.id)
    if(exist)
    return exist
    else
    return ("User does not exist")
}

const getUsersInRoom=(room)=>{
    usersInRoom=[]
    room=room.trim().toLowerCase()
    
    for(let i=0;i<users.length ;i++)
    { 
        if(users[i].room===room)
        {   
            usersInRoom.push(users[i])
        }
    }
    console.log(usersInRoom)
    return usersInRoom
}



module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom

}
