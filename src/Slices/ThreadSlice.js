import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    loading: false,
    AllThread:[],
    threadCommCount: null,
    createThread:{
        text:'',
        fileList:[],
        previewImages:[],
        previewDoc:[]

    }
    
}

export const ThreadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers:{
        setThreadText : (state,action) =>{
            state.createThread.text = action.payload
        },
        setThreadLoading : (state,action) =>{
            state.loading = action.payload
        },
        setThreadsRequest: (state,action) =>{state.AllThread = action.payload},
        setThreadsCommentCount: (state,action) =>{state.threadCommCount = action.payload},

        setThreadfileList : (state,action) =>{
            state.createThread.fileList = action.payload
        },
        setThreadpreviewImages : (state,action) =>{
            state.createThread.previewImages = action.payload
        },
        setThreadpreviewDoc : (state,action) =>{
            state.createThread.previewDoc = action.payload
        },
    }
})

export const {setThreadText,setThreadLoading,setThreadsRequest,setThreadsCommentCount,setThreadfileList,setThreadpreviewImages,setThreadpreviewDoc} = ThreadSlice.actions

export default ThreadSlice.reducer