const {Server} = require("socket.io")

const io = new Server(3000, { });

io.origins('*:*')

io.on("connection", (socket) => {
    socket.on('msg',(data)=>{
        console.log("pod cast admin has joined the party")
    })
    socket.on("join-pod",(data)=>{
        console.log("about to join pod")
        io.emit('pod-join-request',data)
    })
    socket.on('close',(data)=>{
        console.log(`user ${data} want to close connection`)
        io.emit('close',data)
    })

    socket.on('sdp-offer',(data)=>{

        io.emit('sdp-offer',data)
    })

    socket.on('ice-candidate',(data)=>{
        console.log(data);
        io.emit("ice-candidate",JSON.stringify(data))
    })
    

    
    socket.on('sdp_answer',(data)=>{
        io.emit("sdp_answer",JSON.stringify(data))
    })


});
