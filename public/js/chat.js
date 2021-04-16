
const myform=document.querySelector('#message-form')
const messageInputFeild=myform.querySelector('input')
const sendButton=myform.querySelector('button')
const message1= document.getElementById("messages")

//Template for msg and location to dispaly on webpage
const messageTemplate= document.querySelector("#message-template").innerHTML
const locationTemplate=document.querySelector("#location-template").innerHTML
const sidebarTemplate =document.querySelector("#sidebar-template").innerHTML
 
//Parsing parameters from url(join form)
const {username,room}= Qs.parse(location.search, {ignoreQueryPrefix:true})
 
const socket =io();


myform.addEventListener('submit',(e)=>{
    e.preventDefault()

    //disable button so that same msg is not sent multiple times by mistake
    sendButton.setAttribute('disabled','disabled')

    const msg=document.querySelector('#msg').value
    socket.emit('sendMessage', msg,()=>{
        console.log("message has been delivered")
    })

    //enable button
    sendButton.getAttribute('disabled')
    sendButton.removeAttribute('disabled')
    messageInputFeild.value=" "
    
})

document.querySelector('#location').addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition((position)=>{

        socket.emit('sendlocation', { 
                 lat:position.coords.latitude, 
                 long: position.coords.longitude}  , 
                 ()=>{
                       console.log("coordinates sent successfully") 
                     }
                )
})
})

socket.emit("join",{username ,room },(error)=>{
    if(error)
    {
        alert(error)
        location.href="/"
    } 
 })

socket.on("message",({msg,username})=>{
   console.log(1)
    const html=Mustache.render(messageTemplate,{msg,username})

    message1.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',({username,url})=>{
    
    const ht=Mustache.render(locationTemplate,{username,url})
    message1.insertAdjacentHTML('beforeend',ht)

})


socket.on('roomData',({room,users})=>{
    const html=Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector("#sidebar").innerHTML=html
})


