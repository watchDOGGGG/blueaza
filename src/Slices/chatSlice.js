import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    Chats:{
        userid: null,
        chats:[],
        imagegallery: []
    },
    createChat:{
        FileUpload:'',
        text:'',
        fileList:[],
        previewImages:[],
        previewDoc:[],
        audioReco:null,
    },
    ReplyChat:{
        chatid:null,
        username:'',
        msg:'',
        type:''
    },
    
}

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        setChats : (state,action) =>{
            state.Chats.chats = action.payload
        },
        setCreateChatText: (state,action) =>{
            state.createChat.text = action.payload
        },
        setCreateChatFileUpload: (state,action) =>{
            state.createChat.FileUpload = action.payload
        },
        setCreateChatFileList: (state,action) =>{
            state.createChat.fileList = action.payload
        },
        setCreateChatPreviewFiles: (state,action) =>{
            state.createChat.previewImages = action.payload
        },
        setCreateAudioReco: (state,action) =>{
            state.createChat.audioReco = action.payload
        },
        setCreateChatpreviewDoc: (state,action) =>{
            state.createChat.previewDoc = action.payload
        },
        setCreateChatgallery: (state,action) =>{
            state.Chats.imagegallery = action.payload
        },

        //replying to chat
        setCreateReplyChatUsername: (state,action) =>{
            state.ReplyChat.username = action.payload
        },
        setCreateReplyChatmsg: (state,action) =>{
            state.ReplyChat.msg = action.payload
        },
        
        setCreateReplyChattype: (state,action) =>{
            state.ReplyChat.type = action.payload
        },
        setCreateReplyChatId: (state,action) =>{
            state.ReplyChat.chatid = action.payload
        },
    }
})

export const {setCreateAudioReco,setChats,setCreateChatText,setCreateChatFileUpload,
    setCreateChatFileList,setCreateChatPreviewFiles,setCreateReplyChatUsername,setCreateReplyChatmsg,
    setCreateReplyChattype,setCreateReplyChatId,
    setCreateChatpreviewDoc,setCreateChatgallery} = ChatSlice.actions

export default ChatSlice.reducer