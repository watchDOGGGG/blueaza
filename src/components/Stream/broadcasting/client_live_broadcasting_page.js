import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PeerCon, socket } from '../../../passer/key/endpoint/endpoint'


export default function Clientlivebroadcastingpage() {
    const userId = useSelector(state => state.nav.loggedInUser)
    const channel_creator = useSelector(state => state.channel.creatorId)
    const channel_Id= useSelector(state => state.channel.holdMyChannleId)

useEffect(async () => {
    if(channel_creator === userId._id){
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
           // sendAudioToConnectedUser(data.user,stream)            
           
   
           const sendAudioToConnectedUser = (user, stream) => {
               PeerCon.call(userId, stream);
           } 
           socket.on('user-connected',data=>{
          console.log(data)
           // const audioPlayer = document.createElement('audio')
           // audioPlayer.setAttribute('controls','true')
           // audioPlayer.setAttribute('id','streamradio')
           // audioPlayer.srcObject = source
   
           //get the audio stream from audio src 
           
           // console.log()
           // container.append(audioPlayer)
               return 
       })

       // getting the stream file from the broadcasting server
       // PeerCon.on('call', function(call) {
       //       call.answer(); // Answer the call with an A/V stream.
       //       call.on('stream', function(remoteStream) {
       //         // Show stream in some video/canvas element.
       //         console.log(remoteStream)
       //       });
          
       //   });
   }
}, [])

    // useEffect(() => {
    //     //When a new user just join
    //     socket.on('user-connected',data=>{
    //        if(userId._id === data.creator){
    //         const constraints ={
    //             video:false,                         
    //             audio:{
    //                 echoCancellation: false,
    //                 noiseSuppression:false,
    //                 autoGainControl:false,
                
    //             }
    //         }
    //         var context = new AudioContext({
    //             latencyHint: 'interactive',
    //             // sampleRate: 44100
    //         })
            
    //         const container = document.getElementById('live_section')
    //         const stream = await navigator.mediaDevices.getUserMedia(constraints) 
           
    //         var source = context.createMediaStreamSource(stream)
    //         source.connect(context.destination)
    
    //         // when a user connects send the user our audio stream
    //         sendAudioToConnectedUser(data.user,stream)            
            
    
    //         const sendAudioToConnectedUser = (user, stream) => {
    //             PeerCon.call(userId, stream);
    //         } 
    //         // const audioPlayer = document.createElement('audio')
    //         // audioPlayer.setAttribute('controls','true')
    //         // audioPlayer.setAttribute('id','streamradio')
    //         // audioPlayer.srcObject = source
    
    //         //get the audio stream from audio src 
            
    //         // console.log()
    //         // container.append(audioPlayer)
    //             return 
    //        }
    //     })

    //     // getting the stream file from the broadcasting server
    //     PeerCon.on('call', function(call) {
    //           call.answer(); // Answer the call with an A/V stream.
    //           call.on('stream', function(remoteStream) {
    //             // Show stream in some video/canvas element.
    //             console.log(remoteStream)
    //           });
           
    //       });
    // },[])

    return (
        <div>
            THis is a live section
        </div>
    )
}
