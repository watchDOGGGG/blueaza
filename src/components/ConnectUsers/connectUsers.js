import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import { endpoint, socket } from '../../passer/key/endpoint/endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { NavgateChatBox, Navigation, setAllUser } from '../../Slices/Navslice'

export default function ConnectUsers() {
    const [ConnectionType, setConnectionType] = useState(null)
   
    const dispatch = useDispatch()
    const Allusers = useSelector(state => state.nav.allusers)
    const allcon = useSelector(state => state.search.allConnections)

    useEffect(() =>{
        fetchAllUsers()
        
    },[])


    //fetch All users
    const fetchAllUsers = async()=>{
        try {
            const initiatefetch = await fetch(`${endpoint}/users/suggestionCon`,{
                method: 'POST',
                headers: {"Content-Type": "application/json",passkey:localStorage.passkey},
                body:JSON.stringify({
                    allConnections:allcon
                })
            })
            const response = await initiatefetch.json()
            if(response.success){
                return dispatch(setAllUser(response.success))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //Add users
    const add_user = async (id, name) => {
        dispatch(NavgateChatBox({ userid: id, username: name }))
        dispatch(Navigation({ page: 'chat' }))
        try {
            const initiate = await fetch(`${endpoint}/connection/addUsers`,{
                headers: {"Content-Type":"application/json",passkey:localStorage.passkey},
                method: "POST",
                body: JSON.stringify({receiver:id})
            })
    
            const response = await initiate.json()
            if(response.success){
                setConnectionType(response.success)
                socket.emit("add_user",)
                return null
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            {
                Allusers.length > 0 &&
                Allusers.map((items) => {
                    return (
                        items._id !== localStorage.getItem("userid") &&
                        // {/* display all users */}
                        <div key={items._id} className="flex pa3">
                            {/* image */}
                            <div className="pointer">
                                <Avatar src={items.profileimg} name={items.username} size={40} />
                            </div>
                            {/* name */}
                            <div className="ttc b ml2 connect_name">
                                <span>{items.username}</span>
                                <div className="font-sm fw2">{items.about}</div>
                            </div>
                            {/* add button */}
                            <div className="connect_add_button mr3 ">
                            {
                                    ConnectionType === null &&
                                    <div
                                        onClick={e => add_user(items._id,items.username)}
                                        className="twitter_gray_dark pa2  br-100 add_button tc center pointer">
                                        <FontAwesomeIcon icon={solid("plus")} className="navy icons" />
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })

            }
            
        </div>
    )
}
