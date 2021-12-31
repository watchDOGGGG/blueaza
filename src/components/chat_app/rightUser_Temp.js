import React from 'react'
import Avatar from '../avatar/avatar'
// import StandardImageList from '../imageList/imagelist'
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import {FilePreview} from '../ImagePreview/preview';
import {DocPreview} from '../ImagePreview/docPreview';
import {endpoint,socket} from '../../passer/key/endpoint/endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd';
import { MpPlayer } from './audio/audioplayer';
import { setCreateChatFileUpload, setCreateReplyChatId, setCreateReplyChatmsg, setCreateReplyChattype, setCreateReplyChatUsername } from '../../Slices/chatSlice';

export default function RightUserTemp({items}) {
    const userData = useSelector(state => state.nav.loggedInUser)

    return (
        <>
            {/* image */}
            <div className="chat_img_div flex">
                <Avatar src={items.sender.profileimg} name={userData.username === items.sender.username?'you': items.sender.username} size={20} />
            </div>
            {/* message content */}
            <div className="mw6 ml1">
                <div className="w-auto right_msg">
                    <div className="flex">
                        
                        <div className="bg-near-white pa1 right_msg font-sm">
                             {/* reply */}

                             {
                                items?.reply &&
                                <div className="bg-washed-blue pa2 gray pointer">
                                    <div className="gray bb b--black-10">{items.sender.username} replied to this</div>
                                    {
                                        items?.reply?.type === 'audio' &&
                                        <div className="bg-near-white pa2 br3">
                                            <FontAwesomeIcon icon={solid("circle-play")} className="icons" />
                                            <div>Audio</div>
                                        </div>
                                    }
                                    {items?.reply?.msg}
                                </div>
                           }
                            {items.msg}
                           
                            <>
                                {
                                    items.filesTosave.length > 0 &&
                                    <div className="chat_img bg-light-gray pa1 flex justify-center">
                                        <FilePreview files={items.filesTosave} />
                                        {
                                            items.filesTosave.length > 1 &&
                                            <span className="f4 b">+{items.filesTosave.length - 1}</span>
                                        }
                                    </div>

                                }
                                 {
                                    items.docTosave.length > 0 &&
                                    <div className="chat_img bg-light-gray pa1 flex justify-center">
                                        <DocPreview doxs={items.docTosave} />
                                    </div>

                                }
                                  {
                                    items.audioTosave.length > 0 &&

                                    items.audioTosave.map((file)=>{
                                        
                                        return (
                                            <div className="chat_img bg-light-gray pa1 flex justify-center">
                                            <MpPlayer audio={file} id={items?._id} />
                                        </div>
                                        )
                                    })
                                }
                            </>
                            
                        </div>
                        <span>
                        <PopOverState chatid={items._id} txt={items.msg} name={items.sender.username} audio={items.audioTosave}/>
                        </span>
                    </div>
                    <div className="flex justify-end font-sm near-white">
                        {/* time */}
                        <span>12:30</span>

                    </div>
                </div>
            </div>
        </>
    )
}


const PopOverState = ({chatid,txt,name,audio}) =>{

    const userid = useSelector(state => state.nav.ChatView.userid)
    const dispatch = useDispatch()

    //set Reply
    const SetReply = () =>{
        dispatch(setCreateChatFileUpload('reply'))
        dispatch(setCreateReplyChatUsername(name))
        dispatch(setCreateReplyChatId(chatid))
        if(audio.length > 0){
            dispatch(setCreateReplyChatmsg(''))
            return dispatch(setCreateReplyChattype('audio'))
        }
        dispatch(setCreateReplyChattype('text'))
        dispatch(setCreateReplyChatmsg(txt))
    }
    //delete message
    // const DeleteMessage = async() =>{
 
    //     try {
    //         const initiate = await fetch(`${endpoint}/chat/deleteMessage/${userid}/${chatid}`,{
    //             headers:{passkey: localStorage.passkey}
    //         });
    //         const response = await initiate.json()
    //         if(response.error){
    //            return message.error('server error')
    //         }
    //         return socket.emit('fetch_chat',userid)
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <FontAwesomeIcon icon={solid("ellipsis")} className="icons white ml2" {...bindTrigger(popupState)}/>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>
                <div>
                    <div className="flex pointer mt2 font-sm" onClick={SetReply}>
                    {/* <FontAwesomeIcon icon={solid("reply")} className="icons"/> */}
                        <span className="ml2 b">reply</span>
                    </div>
                    <div className="flex pointer mt2 font-sm" >
                    {/* <FontAwesomeIcon icon={solid("trash")} className="icons"/> */}
                        <span className="ml2 b">unsee this chat</span>
                    </div>
                </div>
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
    )
}