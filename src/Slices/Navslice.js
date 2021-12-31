import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ChatView: {
        userid:null,
        username:null,
        profileimg:null,
        about: null,
    },
    navigation: {
        page:null
    },
    typing:{
        istyping:false
    },
    allusers:[],
    loggedInUser:null
    
}

export const NavSlice = createSlice({
    name:'nav',
    initialState,
    reducers: {
        Navigation: (state,action) =>{state.navigation = action.payload},
        NavgateChatBox: (state,action) =>{state.ChatView = action.payload},
        SetTyping : (state,action) =>{state.typing = action.payload},
        setAllUser : (state,action) =>{state.allusers = action.payload},
        setLoggedInUser : (state,action) =>{state.loggedInUser = action.payload}
    }

})

export const {Navigation,NavgateChatBox,SetTyping,setAllUser,setLoggedInUser} = NavSlice.actions

export default NavSlice.reducer