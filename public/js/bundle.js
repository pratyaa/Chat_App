(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const socket =io();

const myform=document.querySelector('#message-form')
const messageInputFeild=myform.querySelector('input')
const sendButton=myform.querySelector('button')
const message1= document.getElementById("messages")

//Template for msg and location to dispaly on webpage
const messageTemplate= document.querySelector("#message-template").innerHTML
const locationTemplate=document.querySelector("#location-template").innerHTML
const sidebarTemplate =document.querySelector("#sidebar-template").innerHTML
 
//Parsing parameters from url(join form)
const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const data = require('../randomUsername.json')
const roomUserNamesSize = data[room].length
console.log(data)
const index = Math.floor(Math.random() * roomUserNamesSize);
const username =data[room][index]

 
const autoscroll=()=>
{
    // new message element
    const newMessage =message1.lastElementChild 

    const newMessageStyles =getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight =newMessage.offsetHeight + newMessageMargin
    console.log(newMessageMargin)

    //visible height
    const visibleHeight =message1.offsetHeight

    //height of message container
    const containerHeight =message1.scrollHeight
    
    //how far I have scrolled
    const scrollOffset =message1.scrollTip + visibleHeight

    if (containerHeight-newMessageHeight <= scrollOffset)
    {
        message1.scrollTop =message1.scrollHeight
    }
}


myform.addEventListener('submit',(e)=>{
    e.preventDefault()

    //disable button so that same msg is not sent multiple times by mistake
    sendButton.setAttribute('disabled','disabled')

    const msg=document.querySelector('#msg').value
    socket.emit('sendMessage', msg, () => {
        
        console.log("message has been delivered")
        console.log(roomUserNamesSize)
        
        
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
   
    const html=Mustache.render(messageTemplate,{msg,username})

    message1.insertAdjacentHTML('beforeend',html)
    //autoscroll()
})

socket.on('locationMessage',({username,url})=>{
    
    const ht=Mustache.render(locationTemplate,{username,url})
    message1.insertAdjacentHTML('beforeend',ht)
    //autoscroll()
})


socket.on('roomData',({room,users})=>{
    const html=Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector("#sidebar").innerHTML=html
})



},{"../randomUsername.json":2}],2:[function(require,module,exports){
module.exports={
  "Mirzapur": [
    "Guddu",
    "Munna",
    "Kaleen Bhaiya",
    "Sweety",
    "Golu",
    "Bauji",
    "Mabool",
    "Beena",
    "Compounder",
    "Shabnam",
    "Bablu Pandit",
    "Madhuri",
    "Dadda Tyagi",
    "Chote Tyagi",
    "Lalit",
    "Bada Tyagi",
    "Sharad Mishra",
    "Satyanand Tripathi"
  ],
  "Sacred Games": [
    "Gaitonde",
    "Kusum",
    "Shubhadra",
    "Anjali",
    "Shahid",
    "Zoya",
    "Bunty",
    "Cuckoo",
    "Jojo",
    "Kanta Bai",
    "Isa",
    "Guruji",
    "Batya",
    "Sartaj",
    "Dilbag Singh",
    "Malcolm morad"
  ],
  "Game of thrones": [
    "Joffrey",
    "Khal Droga",
    "Cercei",
    "John Snow",
    "Sansa",
    "Arya Stark",
    "Jamie Lannister",
    "Theon Greyjoy",
    "Tyron Lannister",
    "Robb",
    "Ghost",
    "Lady",
    "Nymeria",
    "Greywind",
    "Shaggy Dog",
    "Rickon",
    "Tywin Lannister",
    "Robert Baratheon",
    "Melisanndre",
    "Margrey",
    "Stanis Baratheon",
    "Brann Stark"
  ],
  "Vampire Diaries": [
    "Stefan",
    "Damon",
    "Elena",
    "Eliajah",
    "Jenna",
    "Katherine",
    "Klaus",
    "Karoline",
    "Bonnie",
    "Jenna",
    "Jeremy",
    "Tylor"
  ],
  "Harry Potter": [
    "Harry",
    "Ron",
    "Hermoine",
    "Malfoy",
    "Hagrid",
    "Dumbledore",
    "Snape",
    "Bellatrix",
    "Sirius Black",
    "Umbridge",
    "Dobby",
    "Nevile Longbottom",
    "Luna",
    "Remus",
    "Moody",
    "Moaning Myrtle",
    "Lucious Malfoy",
    "Sir Headless Nick",
    "Duddly",
    "Lily Potter",
    "James Potter"
  ]
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0hQL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNoYXQuanMiLCIuLi9yYW5kb21Vc2VybmFtZS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3Qgc29ja2V0ID1pbygpO1xyXG5cclxuY29uc3QgbXlmb3JtPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlLWZvcm0nKVxyXG5jb25zdCBtZXNzYWdlSW5wdXRGZWlsZD1teWZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKVxyXG5jb25zdCBzZW5kQnV0dG9uPW15Zm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKVxyXG5jb25zdCBtZXNzYWdlMT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlc1wiKVxyXG5cclxuLy9UZW1wbGF0ZSBmb3IgbXNnIGFuZCBsb2NhdGlvbiB0byBkaXNwYWx5IG9uIHdlYnBhZ2VcclxuY29uc3QgbWVzc2FnZVRlbXBsYXRlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2UtdGVtcGxhdGVcIikuaW5uZXJIVE1MXHJcbmNvbnN0IGxvY2F0aW9uVGVtcGxhdGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbi10ZW1wbGF0ZVwiKS5pbm5lckhUTUxcclxuY29uc3Qgc2lkZWJhclRlbXBsYXRlID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXItdGVtcGxhdGVcIikuaW5uZXJIVE1MXHJcbiBcclxuLy9QYXJzaW5nIHBhcmFtZXRlcnMgZnJvbSB1cmwoam9pbiBmb3JtKVxyXG5jb25zdCB7IHJvb20gfSA9IFFzLnBhcnNlKGxvY2F0aW9uLnNlYXJjaCwgeyBpZ25vcmVRdWVyeVByZWZpeDogdHJ1ZSB9KVxyXG5cclxuY29uc3QgZGF0YSA9IHJlcXVpcmUoJy4uL3JhbmRvbVVzZXJuYW1lLmpzb24nKVxyXG5jb25zdCByb29tVXNlck5hbWVzU2l6ZSA9IGRhdGFbcm9vbV0ubGVuZ3RoXHJcbmNvbnNvbGUubG9nKGRhdGEpXHJcbmNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcm9vbVVzZXJOYW1lc1NpemUpO1xyXG5jb25zdCB1c2VybmFtZSA9ZGF0YVtyb29tXVtpbmRleF1cclxuXHJcbiBcclxuY29uc3QgYXV0b3Njcm9sbD0oKT0+XHJcbntcclxuICAgIC8vIG5ldyBtZXNzYWdlIGVsZW1lbnRcclxuICAgIGNvbnN0IG5ld01lc3NhZ2UgPW1lc3NhZ2UxLmxhc3RFbGVtZW50Q2hpbGQgXHJcblxyXG4gICAgY29uc3QgbmV3TWVzc2FnZVN0eWxlcyA9Z2V0Q29tcHV0ZWRTdHlsZShuZXdNZXNzYWdlKVxyXG4gICAgY29uc3QgbmV3TWVzc2FnZU1hcmdpbiA9IHBhcnNlSW50KG5ld01lc3NhZ2VTdHlsZXMubWFyZ2luQm90dG9tKVxyXG4gICAgY29uc3QgbmV3TWVzc2FnZUhlaWdodCA9bmV3TWVzc2FnZS5vZmZzZXRIZWlnaHQgKyBuZXdNZXNzYWdlTWFyZ2luXHJcbiAgICBjb25zb2xlLmxvZyhuZXdNZXNzYWdlTWFyZ2luKVxyXG5cclxuICAgIC8vdmlzaWJsZSBoZWlnaHRcclxuICAgIGNvbnN0IHZpc2libGVIZWlnaHQgPW1lc3NhZ2UxLm9mZnNldEhlaWdodFxyXG5cclxuICAgIC8vaGVpZ2h0IG9mIG1lc3NhZ2UgY29udGFpbmVyXHJcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPW1lc3NhZ2UxLnNjcm9sbEhlaWdodFxyXG4gICAgXHJcbiAgICAvL2hvdyBmYXIgSSBoYXZlIHNjcm9sbGVkXHJcbiAgICBjb25zdCBzY3JvbGxPZmZzZXQgPW1lc3NhZ2UxLnNjcm9sbFRpcCArIHZpc2libGVIZWlnaHRcclxuXHJcbiAgICBpZiAoY29udGFpbmVySGVpZ2h0LW5ld01lc3NhZ2VIZWlnaHQgPD0gc2Nyb2xsT2Zmc2V0KVxyXG4gICAge1xyXG4gICAgICAgIG1lc3NhZ2UxLnNjcm9sbFRvcCA9bWVzc2FnZTEuc2Nyb2xsSGVpZ2h0XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5teWZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZSk9PntcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIC8vZGlzYWJsZSBidXR0b24gc28gdGhhdCBzYW1lIG1zZyBpcyBub3Qgc2VudCBtdWx0aXBsZSB0aW1lcyBieSBtaXN0YWtlXHJcbiAgICBzZW5kQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCdkaXNhYmxlZCcpXHJcblxyXG4gICAgY29uc3QgbXNnPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtc2cnKS52YWx1ZVxyXG4gICAgc29ja2V0LmVtaXQoJ3NlbmRNZXNzYWdlJywgbXNnLCAoKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtZXNzYWdlIGhhcyBiZWVuIGRlbGl2ZXJlZFwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJvb21Vc2VyTmFtZXNTaXplKVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSlcclxuXHJcbiAgICAvL2VuYWJsZSBidXR0b25cclxuICAgIHNlbmRCdXR0b24uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcbiAgICBzZW5kQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgbWVzc2FnZUlucHV0RmVpbGQudmFsdWU9XCIgXCJcclxuICAgIFxyXG59KVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbik9PntcclxuXHJcbiAgICAgICAgc29ja2V0LmVtaXQoJ3NlbmRsb2NhdGlvbicsIHsgXHJcbiAgICAgICAgICAgICAgICAgbGF0OnBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgXHJcbiAgICAgICAgICAgICAgICAgbG9uZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX0gICwgXHJcbiAgICAgICAgICAgICAgICAgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvb3JkaW5hdGVzIHNlbnQgc3VjY2Vzc2Z1bGx5XCIpIFxyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbn0pXHJcbn0pXHJcblxyXG5zb2NrZXQuZW1pdChcImpvaW5cIix7dXNlcm5hbWUgLHJvb20gfSwoZXJyb3IpPT57XHJcbiAgICBpZihlcnJvcilcclxuICAgIHtcclxuICAgICAgICBhbGVydChlcnJvcilcclxuICAgICAgICBsb2NhdGlvbi5ocmVmPVwiL1wiXHJcbiAgICB9IFxyXG4gfSlcclxuXHJcbnNvY2tldC5vbihcIm1lc3NhZ2VcIiwoe21zZyx1c2VybmFtZX0pPT57XHJcbiAgIFxyXG4gICAgY29uc3QgaHRtbD1NdXN0YWNoZS5yZW5kZXIobWVzc2FnZVRlbXBsYXRlLHttc2csdXNlcm5hbWV9KVxyXG5cclxuICAgIG1lc3NhZ2UxLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxodG1sKVxyXG4gICAgLy9hdXRvc2Nyb2xsKClcclxufSlcclxuXHJcbnNvY2tldC5vbignbG9jYXRpb25NZXNzYWdlJywoe3VzZXJuYW1lLHVybH0pPT57XHJcbiAgICBcclxuICAgIGNvbnN0IGh0PU11c3RhY2hlLnJlbmRlcihsb2NhdGlvblRlbXBsYXRlLHt1c2VybmFtZSx1cmx9KVxyXG4gICAgbWVzc2FnZTEuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGh0KVxyXG4gICAgLy9hdXRvc2Nyb2xsKClcclxufSlcclxuXHJcblxyXG5zb2NrZXQub24oJ3Jvb21EYXRhJywoe3Jvb20sdXNlcnN9KT0+e1xyXG4gICAgY29uc3QgaHRtbD1NdXN0YWNoZS5yZW5kZXIoc2lkZWJhclRlbXBsYXRlLHtcclxuICAgICAgICByb29tLFxyXG4gICAgICAgIHVzZXJzXHJcbiAgICB9KVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpLmlubmVySFRNTD1odG1sXHJcbn0pXHJcblxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwiTWlyemFwdXJcIjogW1xyXG4gICAgXCJHdWRkdVwiLFxyXG4gICAgXCJNdW5uYVwiLFxyXG4gICAgXCJLYWxlZW4gQmhhaXlhXCIsXHJcbiAgICBcIlN3ZWV0eVwiLFxyXG4gICAgXCJHb2x1XCIsXHJcbiAgICBcIkJhdWppXCIsXHJcbiAgICBcIk1hYm9vbFwiLFxyXG4gICAgXCJCZWVuYVwiLFxyXG4gICAgXCJDb21wb3VuZGVyXCIsXHJcbiAgICBcIlNoYWJuYW1cIixcclxuICAgIFwiQmFibHUgUGFuZGl0XCIsXHJcbiAgICBcIk1hZGh1cmlcIixcclxuICAgIFwiRGFkZGEgVHlhZ2lcIixcclxuICAgIFwiQ2hvdGUgVHlhZ2lcIixcclxuICAgIFwiTGFsaXRcIixcclxuICAgIFwiQmFkYSBUeWFnaVwiLFxyXG4gICAgXCJTaGFyYWQgTWlzaHJhXCIsXHJcbiAgICBcIlNhdHlhbmFuZCBUcmlwYXRoaVwiXHJcbiAgXSxcclxuICBcIlNhY3JlZCBHYW1lc1wiOiBbXHJcbiAgICBcIkdhaXRvbmRlXCIsXHJcbiAgICBcIkt1c3VtXCIsXHJcbiAgICBcIlNodWJoYWRyYVwiLFxyXG4gICAgXCJBbmphbGlcIixcclxuICAgIFwiU2hhaGlkXCIsXHJcbiAgICBcIlpveWFcIixcclxuICAgIFwiQnVudHlcIixcclxuICAgIFwiQ3Vja29vXCIsXHJcbiAgICBcIkpvam9cIixcclxuICAgIFwiS2FudGEgQmFpXCIsXHJcbiAgICBcIklzYVwiLFxyXG4gICAgXCJHdXJ1amlcIixcclxuICAgIFwiQmF0eWFcIixcclxuICAgIFwiU2FydGFqXCIsXHJcbiAgICBcIkRpbGJhZyBTaW5naFwiLFxyXG4gICAgXCJNYWxjb2xtIG1vcmFkXCJcclxuICBdLFxyXG4gIFwiR2FtZSBvZiB0aHJvbmVzXCI6IFtcclxuICAgIFwiSm9mZnJleVwiLFxyXG4gICAgXCJLaGFsIERyb2dhXCIsXHJcbiAgICBcIkNlcmNlaVwiLFxyXG4gICAgXCJKb2huIFNub3dcIixcclxuICAgIFwiU2Fuc2FcIixcclxuICAgIFwiQXJ5YSBTdGFya1wiLFxyXG4gICAgXCJKYW1pZSBMYW5uaXN0ZXJcIixcclxuICAgIFwiVGhlb24gR3JleWpveVwiLFxyXG4gICAgXCJUeXJvbiBMYW5uaXN0ZXJcIixcclxuICAgIFwiUm9iYlwiLFxyXG4gICAgXCJHaG9zdFwiLFxyXG4gICAgXCJMYWR5XCIsXHJcbiAgICBcIk55bWVyaWFcIixcclxuICAgIFwiR3JleXdpbmRcIixcclxuICAgIFwiU2hhZ2d5IERvZ1wiLFxyXG4gICAgXCJSaWNrb25cIixcclxuICAgIFwiVHl3aW4gTGFubmlzdGVyXCIsXHJcbiAgICBcIlJvYmVydCBCYXJhdGhlb25cIixcclxuICAgIFwiTWVsaXNhbm5kcmVcIixcclxuICAgIFwiTWFyZ3JleVwiLFxyXG4gICAgXCJTdGFuaXMgQmFyYXRoZW9uXCIsXHJcbiAgICBcIkJyYW5uIFN0YXJrXCJcclxuICBdLFxyXG4gIFwiVmFtcGlyZSBEaWFyaWVzXCI6IFtcclxuICAgIFwiU3RlZmFuXCIsXHJcbiAgICBcIkRhbW9uXCIsXHJcbiAgICBcIkVsZW5hXCIsXHJcbiAgICBcIkVsaWFqYWhcIixcclxuICAgIFwiSmVubmFcIixcclxuICAgIFwiS2F0aGVyaW5lXCIsXHJcbiAgICBcIktsYXVzXCIsXHJcbiAgICBcIkthcm9saW5lXCIsXHJcbiAgICBcIkJvbm5pZVwiLFxyXG4gICAgXCJKZW5uYVwiLFxyXG4gICAgXCJKZXJlbXlcIixcclxuICAgIFwiVHlsb3JcIlxyXG4gIF0sXHJcbiAgXCJIYXJyeSBQb3R0ZXJcIjogW1xyXG4gICAgXCJIYXJyeVwiLFxyXG4gICAgXCJSb25cIixcclxuICAgIFwiSGVybW9pbmVcIixcclxuICAgIFwiTWFsZm95XCIsXHJcbiAgICBcIkhhZ3JpZFwiLFxyXG4gICAgXCJEdW1ibGVkb3JlXCIsXHJcbiAgICBcIlNuYXBlXCIsXHJcbiAgICBcIkJlbGxhdHJpeFwiLFxyXG4gICAgXCJTaXJpdXMgQmxhY2tcIixcclxuICAgIFwiVW1icmlkZ2VcIixcclxuICAgIFwiRG9iYnlcIixcclxuICAgIFwiTmV2aWxlIExvbmdib3R0b21cIixcclxuICAgIFwiTHVuYVwiLFxyXG4gICAgXCJSZW11c1wiLFxyXG4gICAgXCJNb29keVwiLFxyXG4gICAgXCJNb2FuaW5nIE15cnRsZVwiLFxyXG4gICAgXCJMdWNpb3VzIE1hbGZveVwiLFxyXG4gICAgXCJTaXIgSGVhZGxlc3MgTmlja1wiLFxyXG4gICAgXCJEdWRkbHlcIixcclxuICAgIFwiTGlseSBQb3R0ZXJcIixcclxuICAgIFwiSmFtZXMgUG90dGVyXCJcclxuICBdXHJcbn0iXX0=
