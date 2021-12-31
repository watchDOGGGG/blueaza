import React from 'react'
import SearchUser from './searchUser'
import UserDisplayContent from './UserDisplayCard/user_desplay_content'

export default function Allusers() {
    return (
        <div className="flex">
            <div className="w-100 allUsers_area">
                {/* search */}
                <SearchUser/>
                {/* users */}
                <div className="allUsers">
                    {/* latest message user display content */}
                    <UserDisplayContent/>
                </div>
            </div>
        </div>
    )
}
