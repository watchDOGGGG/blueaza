import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    authroute: 0,
    loginroute: 1,
}

export const LoginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuthRoute : (state,action) =>{
            state.authroute = action.payload
        },
        setLoginRoute : (state,action) =>{
            state.loginroute = action.payload
        }
    }
})

export const {setAuthRoute,setLoginRoute} = LoginSlice.actions

export default LoginSlice.reducer