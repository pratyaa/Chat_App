const express = require('express')
const path =require('path')
const http=require('http')
const socketio =require('socket.io')
const { addUser,removeUser,getUser,getUsersInRoom } = require('./utils/users')

const app =express()
const server=http.createServer(app)

const io = socketio(server)

app.use(express.static(path.join(__dirname,"../public/")))
app.get('/',(req,res)=>{
    res.sendFile("index.html")
})


io.on('connection',function(socket) {
    console.log('new websocket connection')
    

    socket.on('sendMessage',(msg,callback)=>
    {   user= getUser(socket.id)
        room=user.room
        io.to(room).emit('message',{msg:msg,username:user.username})
        callback()
    })

    socket.on('sendlocation',(coords,callback)=>{
        const user=getUser(socket.id)
        io.emit('locationMessage',{username:user.username, url:`https://google.com/maps?q=${coords.lat},${coords.long}`})
        callback()
    })
    
    socket.on('join',({username,room},callback)=> {
        
        const user=addUser({id:socket.id,username:username,room:room})
       
        if(user.error)
        {
            return callback(user.error)
        }
        
        console.log(user)
        socket.join(room)
         
        socket.emit("message",{msg:"Welcome",username:"Admin"});
        socket.broadcast.to(user.room).emit("message",{msg:`${user.username} has joined`,username:"Admin"})

        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })

        
    })

    

    socket.on('disconnect',()=>{
        const user= removeUser(socket.id)
        if(user)
        {
            io.to(user.room).emit("message",`${user.username} has left`)
            io.to(user.room).emit('roomData',{
                roomName:user.room,
                users:getUsersInRoom(user.room)
            })
        }
    })
    
}) 

server.listen(process.env.PORT||3000, ()=>{
    console.log('server up and running')
})
 

  