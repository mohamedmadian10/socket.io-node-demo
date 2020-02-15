const express = require ('express');
const app = express();
const http = require('http').createServer(app);
// initialize a new instance of socket.io
const io = require ('socket.io')(http);

app.get("/",(req,res)=>{
    res.send(`<h1>hey socket.io</h1>`)
});

//adding io and listening on connection
io.on("connection",(socket)=>{
    console.log("a user connected");
    socket.on("disconnect",()=>{
        console.log("a user disconnected")
    });

//register an event called my message 
    socket.on('my message',(msg)=>{
        console.log('message:'+ msg);
        //emit an event from the server side
        io.emit('my broadcast',`server:${msg}`);
    });

})


http.listen(8085,()=>{
    console.log("im listening....")
})