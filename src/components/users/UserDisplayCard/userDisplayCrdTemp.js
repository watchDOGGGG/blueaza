import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../avatar/avatar'
import {Navigation,NavgateChatBox} from '../../../Slices/Navslice'
import { endpoint, socket } from '../../../passer/key/endpoint/endpoint'
import { setChats } from '../../../Slices/chatSlice'
import { Badge } from 'antd';


export default function UserDisplayCrdTemp({item}) {

    const [unread, setunread] = useState(null)

    const dispatch = useDispatch()
    const chatuser = useSelector(state => state.nav.ChatView)
 
    useEffect(() => {
        //as soon as user enters site
        unreadCount_chat(item?.sender?._id !== localStorage.getItem("userid")?
        item?.sender?._id:item?.receiver?._id !== localStorage.getItem("userid")?
        item?.receiver?._id:null)  
        socket.on('read_count', data => {
            setunread(null)
        })
    }, [])
     //navigate chat app
    const navigateChateApp = (page, userid, username, profileimg, about) => {
        socket.emit('fetch_chat', userid)

        socket.on('fetch_chat',data =>{
            unreadCount_chat(item?.sender?._id !== localStorage.getItem("userid") ?
                item?.sender?._id : item?.receiver?._id !== localStorage.getItem("userid") ?
                    item?.receiver?._id : null)
        })
        dispatch(NavgateChatBox({ userid: userid, username: username, profileimg: profileimg, about: about }))
        dispatch(Navigation({ page: page }))
    }


    //fetch unread count
    const unreadCount_chat = async (userid) => {
       
        try {
          const initiate = await fetch(`${endpoint}/chat/countUnread/${userid}`,{
              headers: { passkey: localStorage.passkey }
          })
          const response = await initiate.json()
          
          if(response.success){
            setunread(response.success)
          }
        } catch (error) {
            console.log(error.message)
        }
      }

     
    return (
        item?.sender?._id !== localStorage.getItem("userid") ?
            <div className={`flex pa2 pointer ${item?.sender?._id === chatuser.userid?'bg-lightest-blue':'bg-near-white'}`}
                onClick={e => navigateChateApp('chat', item?.sender?._id, item.sender?.username,item.sender?.profileimg)}
                style={{height:'50px',overflow:'hidden'}}
            >

                {/* image  */}
                <div>
                    <Avatar src={item.sender?.profileimg} size={30} name={item.sender?.username} />
                </div>

                {/* name  */}
                <div className="ml1 user_d">
                    <div className="f6 b">
                        <span>{item.sender?.username}</span>
                    </div>

                    {/* latest chat */}
                    <div className="font-sm">
                        <span>{item.chat[item.chat.length -1]?.msg}</span>
                    </div>
                </div>

                {/* time */}
                <div className="font-sm">
                    <span>2mins</span>
                    {/* unread */}
                    <Badge count={unread}/>
                </div>
            </div>
            :
            item?.receiver?._id !== localStorage.getItem("userid") &&
            <div className={`flex pa2 pointer ${item?.receiver?._id === chatuser.userid?'bg-lightest-blue':'bg-near-white'}`}
                onClick={e => navigateChateApp('chat', item?.receiver?._id, item.receiver?.username, item.receiver?.profileimg, item.receiver?.about)}
                style={{height:'50px',overflow:'hidden'}}
            >

                {/* image  */}
                <div>
                    <Avatar src={item.receiver?.profileimg} size={30} name={item.receiver?.username} />
                </div>

                {/* name  */}
                <div className="ml1 user_d">
                    <div className="f6 b">
                        <span>{item.receiver?.username}</span>
                    </div>

                    {/* latest chat */}
                    <div className="font-sm">
                    <span>{item.chat[item.chat.length -1]?.msg}</span>
                    </div>
                </div>
               
                {/* time */}
                <div className="font-sm">
                    <span>2mins</span>
                     {/* unread */}
                    <Badge count={unread}/>
                </div>
            </div>
    )
}
