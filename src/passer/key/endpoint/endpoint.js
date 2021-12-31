import io from 'socket.io-client'
import Peer from 'peerjs'

export const endpoint = "http://localhost:3100"
export const socket = io("http://localhost:8010")
export const PeerCon = new Peer(localStorage.getItem('userid'), {
    host: '/',
    port: '1000'

})

