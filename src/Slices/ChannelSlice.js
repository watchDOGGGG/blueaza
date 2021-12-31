import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    channels: [],
    ChannelID:null,
    holdMyChannleId:null,
    creatorId:null
}

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers:{
        setChannel : (state,action) =>{
            state.channels = action.payload
        },
        setChannelID : (state,action) =>{
            state.ChannelID = action.payload
        },
        setholdMyCHannleId : (state,action) =>{
            state.holdMyChannleId = action.payload
        },
        setcreatorId : (state,action) =>{
            state.creatorId = action.payload
        },
       
    }
})

export const {setChannel,setChannelID,setholdMyCHannleId,setcreatorId} = channelSlice.actions

export default channelSlice.reducer