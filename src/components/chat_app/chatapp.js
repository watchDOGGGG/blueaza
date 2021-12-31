import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import ChatappView from './chatapp_view'
import { useDispatch, useSelector } from 'react-redux'
import {endpoint, socket} from '../../passer/key/endpoint/endpoint'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { SetTyping } from '../../Slices/Navslice'
import { setCreateChatFileUpload,setChats,setCreateChatText,setCreateChatgallery, setCreateAudioReco, setCreateReplyChatUsername, setCreateReplyChatId, setCreateReplyChatmsg, setCreateReplyChattype,} from '../../Slices/chatSlice'
import { setCreateChatFileList,setCreateChatPreviewFiles,setCreateChatpreviewDoc } from '../../Slices/chatSlice';
import {Recorder} from './audio/recorder'


export default function Chatapp() {


    const dispatch = useDispatch()
    // eslint-disable-next-line
    const userid = useSelector(state => state.nav.ChatView.userid)
    const chatdata = useSelector(state => state.chat.createChat)
    const fileList = useSelector(state => state.chat.createChat.fileList)
    const Replying = useSelector(state => state.chat.ReplyChat)

    useEffect(() => {
        dispatch(SetTyping({istyping:false}))
    
        // eslint-disable-next-line
        socket.on('istyping',data => {
            dispatch(SetTyping({istyping:true}))
        })


          // if receiver is offline then
          socket.on('user_offline',(data) =>{
            //Process message to database
            return console.log(data)
        })


        //incomming chats
        socket.on('incomming_message',(data) =>{
            dispatch(SetTyping({istyping:false}))

            //fetch message from database
            return fetchChat(data.sender,data.receiver)
           
        })

        socket.on('fetch_chat',data =>{
            fetchChat(data.userid)
        })
        fetchChatFiles(userid)
    }, [dispatch,socket])
   
    const OnchangeTxt = (e) =>{
        dispatch(setCreateChatText(e.target.value))
        socket.emit('typing',userid,localStorage.getItem("userid"))
    }

    const SendChat = async() =>{
        return sendMessage(localStorage.getItem("userid"),chatdata.text,userid,)
    }

     // PrepareChat content and insert to database
     const sendMessage = async (sender, text, receiver) => {
        
        try {
            if(chatdata.text === '' && fileList.length < 1 &&  chatdata.audioReco === null){return null}
            
            const formData = new FormData();
            formData.set("text",chatdata.text)
            formData.set("sender",sender)
            formData.set("receiver",receiver)
            if(Replying.type !== ""){
                formData.set("reply_chatid",Replying.chatid)
                formData.set("reply_type",Replying.type)
                formData.set("reply_msg",Replying.msg)
            }
            if(chatdata.audioReco !== null){
                formData.append('files', chatdata.audioReco.blob)
            }else{
                fileList.forEach(element => {
                    formData.append('files', element)
                });
            }
            const initiate = await fetch(`${endpoint}/chat/sendChat`, {
                method: 'POST',
                headers: { passkey: localStorage.passkey },
                body: formData
            })

            const response = await initiate.json()
            
            if(response.success){
                dispatch(setCreateChatText(''))
                socket.emit('fetch_chat', userid)
                dispatch(setCreateChatPreviewFiles([]))
                dispatch(setCreateChatFileList([]))
                dispatch(setCreateChatpreviewDoc([]))
                dispatch(setCreateAudioReco(null))

                dispatch(setCreateChatFileUpload(''))
                dispatch(setCreateReplyChatUsername(''))
                dispatch(setCreateReplyChatId(''))
                dispatch(setCreateReplyChatmsg(''))
                dispatch(setCreateReplyChattype(''))

                return socket.emit('sendChat',userid,localStorage.getItem("userid"))
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    //fetch chats

    const fetchChat = async (sender, receiver) => {
        try {

            const fetchchat = await fetch(`${endpoint}/chat/fetchChat/${receiver}/${sender}`, {
                headers: { passkey: localStorage.passkey }
            })

            const response = await fetchchat.json()
           
            return dispatch(setChats(response.success ))
        } catch (error) {
            console.log(error.message)
        }
    }

    //fetch files
    const fetchChatFiles = async (sender, receiver) => {
        try {

            const fetchchat = await fetch(`${endpoint}/chat/fetchChatFiles/${receiver}/${sender}`, {
                headers: { passkey: localStorage.passkey }
            })

            const response = await fetchchat.json()

            return dispatch(setCreateChatgallery({ imagegallery: response.success }))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="chat_section flex">
            <div className="w-100">
                {/* chat view */}
                <ChatappView/>
                {/* chat input box */}
                <div className="chat_box_section">
                    <div className="chat_box_content pt1 pb2">
                        <div className="chat_input_area flex ba b--black-10">
                            {/* input  */}
                            <div className="chat_box w-80">
                                {/* <div className="bg-green w-30 pa1">
                                    <span>reply message</span>
                                </div> */}
                                {
                                    chatdata.FileUpload !== 'recorder' &&
                                    <textarea className="chat_input f5" placeholder="Write a message..."
                                        onChange={OnchangeTxt}
                                        value={chatdata.text}
                                    />
                                }
                                {
                                    chatdata.FileUpload === 'recorder' &&
                                    <div className="pointer">
                                        <audio src={chatdata.audioReco?.url} ></audio>
                                        <Recorder />
                                    </div>
                                }

                            </div>
                            {/* icons */}
                            <div className="flex justify-around">
                            <div className="w-25 mr3 pointer" onClick={e=>dispatch(setCreateChatFileUpload('file'))}>
                                    <AttachFileIcon className="icons" />
                                </div>
                                <div className="w-25 mr3 pointer grow-1" >
                                    <FontAwesomeIcon icon={solid('microphone')} className="icons"  onClick={e=>dispatch(setCreateChatFileUpload('recorder'))} />
                                </div>
                                <div className="w-25 mr3 pointer grow-1" onClick={SendChat}>
                                    <FontAwesomeIcon icon={solid('paper-plane')} className="icons" />
                                </div>
                                <div className="w-25 pointer grow-1">
                                {
                                    chatdata.FileUpload === 'file' &&
                                    <FontAwesomeIcon icon={solid('circle-xmark')} onClick={e => dispatch(setCreateChatFileUpload(''))} className="icons navy" />
                                }
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
