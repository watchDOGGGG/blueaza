import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../components/avatar/avatar'
import Sharedgallery from '../../components/gallery/shared_gallery'

export default function Profile() {
    
    const userdata = useSelector(state => state.nav.ChatView)

    return (
        <div className="center profile">
            {/* Profile image */}
            <div className="flex justify-center">
                <div className="bg-light-blue pa2 br-100">
                    <Avatar src={userdata.profileimg} name={userdata.username} size={100}/>
                </div>
            </div>
            {/* profile name */}
            <div className="flex justify-center mt2 ttc b">
                {userdata.username}
            </div>
            {/* mini info */}
            <div className="flex justify-center mt2 ttc b">
            {userdata.about}
            </div>
            {/* shared data */}
            <div className="bg-near-white">
                <Sharedgallery/>
            </div>
        </div>
    )
}
