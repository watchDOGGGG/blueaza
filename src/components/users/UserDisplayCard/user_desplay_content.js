import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {endpoint, socket} from '../../../passer/key/endpoint/endpoint'
import { SetAllConnection } from '../../../Slices/SearchSlice'
import UserDisplayCrdTemp from './userDisplayCrdTemp'

export default function UserDisplayContent() {
    const [Connections, setConnections] = useState([])

    const searchInput = useSelector(state => state.search.searchInput)
    const dispatch = useDispatch()

    useEffect(() => {
        getUserConnections()
        socket.on('refresh_user_state',()=>{
            return getUserConnections()
        })
        socket.on('incomming_message',()=>{
            // return getUserConnections()
        })
    },[])
    //getUserConnections 
    const getUserConnections = async()=>{
       try {
        const initiate = await fetch(`${endpoint}/connection/checkConnection`,{
            headers: {passkey:localStorage.passkey}
        })

        const response = await initiate.json()
        if(response.success){
            dispatch(SetAllConnection(response.success))
            return setConnections(response.success)
        }
       } catch (error) {
           console.log(error.message)
       }
    }
    // search for Users
    const filterSearch = Connections.filter(users => {
        if(users.receiver?._id === localStorage.getItem('userid')){
            return users?.sender?.username.toLowerCase().includes(searchInput.toLowerCase())
        }
        return users?.receiver?.username.toLowerCase().includes(searchInput.toLowerCase())
        
    })

    return (
        Connections.length > 0 &&
        filterSearch.map((item)=>{
            return(
                <UserDisplayCrdTemp key={item._id} item={item}/>
            )
        })
        
    )
}
