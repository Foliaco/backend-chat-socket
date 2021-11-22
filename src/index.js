require('dotenv').config()
const http=require('http')
const express=require('express');
const app=express();

//const cors = require('cors');

//app.use(cors(/*{origin: 'http://localhost:3000'}*/));

const httpServer=http.createServer(app);

const io=require('socket.io')(httpServer,{
    cors:{
        origin:'http://192.168.1.3:3000',
        methods:['GET','POST','PUT','DELETE']
    }
});


io.on('connection',socket=>{
    console.log("conection opend", socket.id)
    socket.on('chat_name',(e)=>{
        let name=e.name;
        io.sockets.emit('chat_welcome',{'msj':'se ha connectado '+name})
    })
})

//app.get('/',(req,res)=>res.json({msj:"connect"}))

httpServer.listen(process.env.PORT,()=>{
    console.log('server port in %s',process.env.PORT)
})
