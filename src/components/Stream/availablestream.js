import React from 'react'
import StreamList from './StreamList'
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid'

const keyid = uuid()

export default function Availablestream() {
    const streamList = useSelector(state => state.channel.channels) 
    
    return (
        <div>
            <div>
                {/* search */}
                <div className=" w-100 a_s flex items-center">
                    search
                </div>
                {/* list of available stream */}
                <div className="pa2 a_s_l ">
                    {
                        streamList.length > 0 &&
                        streamList.map((item)=>{
                            return(
                                <StreamList key={keyid} creator={item.creator} channel={item.channelId}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
