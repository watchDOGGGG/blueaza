import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../avatar/avatar'


export default function CommentTemp({comment}) {
    const user = useSelector(state => state.nav.loggedInUser)
 

    return (
        <div>
            {/* image */}
            <div className="flex mw5">
                <div><Avatar src={user.profileimg} name={comment?.comby?.username} size={20} /></div>
                <div className="black pa1 threadCom_name font-sm">{comment?.comby?._id === user._id?'you':comment?.comby?.username}</div>
                <div className="font-sm black pa1">
                                {/* time */}
                        <span>12:30</span>
                    </div>
            </div>
            {/* message content */}
            <div className="mw5 ml3">
                <div className="w-auto thread_msg">
                    <p className="bg-white pa1 thread_msg font-sm w-100">{comment.comment}</p>
                   
                </div>
            </div>
        </div>
    )
}
