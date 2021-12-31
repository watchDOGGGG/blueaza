import React, { useEffect } from 'react'
import Avatar from '../avatar/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import { useDispatch, useSelector } from 'react-redux'
import { socket, PeerCon} from '../../passer/key/endpoint/endpoint'
import { Navigation } from '../../Slices/Navslice'
import {setChannelID} from '../../Slices/ChannelSlice'

export default function StreamList({channel,creator}) {
   
    const userId = useSelector(state => state.nav.loggedInUser)
    const dispatch = useDispatch()    
   
    const joinStream = async() =>{
        if(PeerCon.open === true){
            var id = PeerCon.id 
            socket.emit('join-room',channel,id) 
        }

       socket.on('connected-to-room',(data)=>{
        dispatch(Navigation({page:'liveStream'}))
        dispatch(setChannelID(data))
       })
    }
    return (
        <div>
            {/* stream list */}
            <div className="flex w-100 mt3">
                {/* image */}
                <div> 
                    <Avatar name={creator.username} src={creator.profileimg} size={30} />
                </div>
                {/* name */}
                <div className="grow-1 pa1">{creator.username}</div>
                {/* live */}
                <div className="pa1 pointer">
                    <span className="bg-near-white pa2" onClick={joinStream}><FontAwesomeIcon icon={solid("circle")} className="red font-sm" /> Live</span>
                </div>
            </div>
           
        </div>
    )
}
