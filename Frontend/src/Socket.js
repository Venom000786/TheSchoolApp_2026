import {io} from "socket.io-client"

const Socket = io("http://localhost:5000", {
    auth:{
        token:localStorage.getItem('token')
    }
})

export default Socket