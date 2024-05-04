const {Server} = require("socket.io")

const io = new Server(3000, { /* options */ });

io.on("connection", (socket) => {
    // console.log(socket)
    socket.on('msg',(data)=>{
        console.log("pod cast admin has joined the party")
    })
    socket.on("join-pod",(data)=>{
        console.log("about to join pod")
        io.emit('pod-join-request',data)
    })

    socket.on('sdp-offer',(data)=>{
        io.emit('sdp-offer',data)
    })

    socket.on('ice-candidate',(data)=>{
        console.log(data);
        io.emit("ice-candidate",JSON.stringify(data))
    })
    

    
    socket.on('sdp_answer',(data)=>{
        if(data.ice_candidate?.candidate ==null)return
        io.emit("sdp_answer",JSON.stringify(data))
    })


});