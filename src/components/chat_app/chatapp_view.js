import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endpoint, socket } from '../../passer/key/endpoint/endpoint'
import LeftUserTemp from './leftUser_Temp'
import RightUserTemp from './rightUser_Temp'
import FileUpload from './fileUploads/imgupload'
import Texttrim from '../textTrim'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 

const styles = {
    height:'93%',
    flexDirection:'column',
}
export default function ChatappView() {
    const Mychats = useSelector(state => state.chat.Chats)
    const userid = useSelector(state => state.nav.ChatView.userid)
    const chatdata = useSelector(state => state.chat.createChat)
    const Replying = useSelector(state => state.chat.ReplyChat)

    const TrigerReadMsg = () => {
        if (userid) {
            readChat()
            socket.emit('readCount')
        }
    }

    const readChat = async()=>{
        try {
            const initiate = await fetch(`${endpoint}/chat/readchat/${userid}`,{
                headers:{passkey: localStorage.passkey}
            })
            const response = await initiate.json()
            if(response.success){
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
       <div className="flex chat_chat_content" style={styles} onClick={TrigerReadMsg}>
        <div className="chat_view_section">
            
            {
             Mychats.chats?.chat?.length > 0 &&
             //  {/* chat view */}
                    <div className="chat_view">
                        {
                            Mychats.chats?.chat?.map((items) => {

                                return (
                                    items?.sender?._id !== localStorage.getItem('userid') ?
                                        //  {/* right user */ }
                                        <div key={items._id} className="right_user flex mt1 w-100" >
                                            <RightUserTemp items={items} />
                                        </div>
                                        :

                                        // {/* left user */}
                                        <div className="left_user flex mt2 w-100" key={items._id}>
                                            <LeftUserTemp items={items} />
                                        </div>
                                )
                            })
                        }

                        {/* if message content has image */}
                    </div>
                }

                {
                    Mychats.chats.length < 1 &&
                    <div className="white">no chats</div>
                }

            </div>

            {/* media contents add up */}
            <div className="flex bb b--black-10">
                {/* file preview */}

                {
                    chatdata.FileUpload === 'file' &&
                    <FileUpload />
                } 
                {/* reply */}
                {
                     chatdata.FileUpload === 'reply' &&

                    <div className="pa3">
                        <span className="gray f6">Replying to {Replying.username}</span>
                        
                        {
                            Replying.type === 'text' && 
                            <Texttrim msg={Replying.msg}/>
                        }
                        {
                            Replying.type === 'audio' && 
                            <div className="bg-near-white pa2 br3">
                                <FontAwesomeIcon icon={solid("circle-play")} className="icons"/> 
                                <div>Audio</div>
                            </div>
                        }
                    </div>
                }
                
            </div>
        </div>

    )
}
