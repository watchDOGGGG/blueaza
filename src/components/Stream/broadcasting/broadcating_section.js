import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../../../passer/key/endpoint/endpoint'
import { PeerCon } from '../../../passer/key/endpoint/endpoint'

export default function BroadcatingSection() {

    const userId = useSelector(state => state.nav.loggedInUser)
    const roomid = useSelector(state => state.channel.holdMyChannleId)
    
    useEffect(async () => {
        
   
        const constraints ={
            video:false,
            audio:{
                echoCancellation: false,
                noiseSuppression:false,
                autoGainControl:false,
            
            }
        }
        var context = new AudioContext({
            latencyHint: 'interactive',
            // sampleRate: 44100
        })
        
        const container = document.getElementById('live_section')
        const stream = await navigator.mediaDevices.getUserMedia(constraints) 
       
        var source = context.createMediaStreamSource(stream)
        source.connect(context.destination)

        // when a user connects send the user our audio stream
        socket.on('user-connected',data=>{
            console.log({master:data})
            sendAudioToConnectedUser(data,stream)            
        })


        const sendAudioToConnectedUser = (userId, stream) => {
            PeerCon.call(userId, stream);
        } 
        // const audioPlayer = document.createElement('audio')
        // audioPlayer.setAttribute('controls','true')
        // audioPlayer.setAttribute('id','streamradio')
        // audioPlayer.srcObject = source

        //get the audio stream from audio src 
        
        // console.log()
        // container.append(audioPlayer)
    },[])
    return (
        <div id="live_section">
            Your Live on Blueaza
        </div>
    )
}
