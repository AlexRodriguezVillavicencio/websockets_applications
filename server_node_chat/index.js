'use strict'

var http = require('http').createServer(server),
    fs = require('fs'),
    io = require('socket.io')(http),
    connections = 0

function server(req,res) {
    fs.readFile('index.html', (err,data) => {
        if(err) {
            res.writeHead(500,{'Content-Type':'text/html'});
            return res.end("<h1>Error interno del servidor</h1>")
        } else {
            res.writeHead(200,{'Content-Type':'text/html'});
            return res.end(data,'utf-8')
        }
    })
}

http.listen(3000);
console.log("servidor conectado desde el puerto 3000")

io.on('connection', (socket)=>{
    socket.emit('hello',{message:"hola a todos estoy en sockets"})

    socket.on('eventoServidor', (data)=>{
        console.log(data)
    })

    connections++
    console.log(`conexiones activas: ${connections}`)
})