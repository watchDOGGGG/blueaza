import React, { useEffect } from 'react'
import Chatapp from '../components/chat_app/chatapp'
import Navigations from '../components/Navigation/navigation'
import Allusers from '../components/users/allusers'
import HeaderContent from '../components/header_content/HeaderContent'
import ConnectUsers from '../components/ConnectUsers/connectUsers'
import { useDispatch, useSelector } from 'react-redux'
import Welcome from '../components/welcome'
import { endpoint, socket } from '../passer/key/endpoint/endpoint'
import Thread from '../components/threads/thread'
import { setLoggedInUser } from '../Slices/Navslice'
import Profile from './profile/chat_user_profile'
import Settings from './profile/personal_profile/settings'
import CreateOrganization from '../components/Profile/createOrganization'
import Availablestream from '../components/Stream/availablestream'
import {getUser} from '../queries/fetchdata'
import {useQuery} from 'react-query'
import StartStream from '../components/Stream/startStream'
import BroadcatingSection from '../components/Stream/broadcasting/broadcating_section'
import {setChannel} from '../Slices/ChannelSlice'
import Clientlivebroadcastingpage from '../components/Stream/broadcasting/client_live_broadcasting_page'

export default function Home() {
    const dispatch = useDispatch()

    const {data, status} = useQuery('userdata', getUser)
    if(data !== undefined && data.success){
        dispatch(setLoggedInUser(data.success))
    }

    useEffect(() => {
        socket.emit("active",localStorage.getItem("userid"))
        socket.emit('start_blueaza',localStorage.getItem("userid"))

        fetchAllChannelsAvailable()
    }, [socket])


    const backButton = () =>{
        var se2 = document.getElementById("section2")
        var se3 = document.getElementById("section3")
        se2.style.display = "inline-block"
        se3.style.display = "none"

    }
    const fetchAllChannelsAvailable = async() =>{
        try {
            const initiate = await fetch(`${endpoint}/users/fetchChannel/`,{
                headers: {passkey: localStorage.passkey}
            })
            const response = await initiate.json()
           
            if(response.success){
                dispatch(setChannel(response.success))
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const route = useSelector(state => state.nav.navigation.page)
    return (
        <div>
            <div className="main_cont flex">
                {/* profile */}
            <div className="section1 br b--black-10">
                <Navigations/>
            </div>
            {/* users */}
            <div className="section2 br b--black-10" id="section2">
                <Allusers/>
            </div>
            {/* main_content */}
            <div className="section3 br b--black-10" id="section3">
                    <div className="section_3_content flex">
                        <div className="w-100">
                            {/* header */}
                        <div className="section_3_content1">
                            {/* header_content */}
                            <HeaderContent backButton={backButton}/>
                        </div>
                        {/* content */}
                        <div className="section_3_content2">
                            {/* chat app */}
                            {
                                route === "chat" && 
                                <Chatapp/>
                            }
                            {/* connect users */}
                            {
                                route === "connect" && 
                                <ConnectUsers/>
                            }
                            {
                                 route === "threads" && 
                                 <Thread/>
                            }
                            {
                                route === null && 
                                <Welcome/>
                            }
                            {/* other content */}
                            {/* settings */}
                            {
                                 route === "settings" && 
                                 <Settings/>
                            }
                            {
                                 route === "register organization" && 
                                 <CreateOrganization/>
                            }
                            {
                                route === "stream" && 
                                <StartStream/>
                            }
                            {
                                route === "live" && 
                                <BroadcatingSection/>
                            }
                            {
                                route === 'liveStream' && 
                                <Clientlivebroadcastingpage/>
                            }
                        </div>
                        </div>
                    </div>
            </div>
            {/* shared_data */}
                <div className="section4">
                    {
                        route === "chat" &&
                        <Profile/>
                        // <Chatapp />
                    }
                    {
                       route !== "chat" &&
                       
                       <Availablestream/>
                    //    <Chatapp /> 
                    }
            </div>
            </div>
        </div>
    )
}
