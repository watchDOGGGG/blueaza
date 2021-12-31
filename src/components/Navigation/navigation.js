import React from 'react'
import Avatar from '../avatar/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import { useDispatch, useSelector } from 'react-redux'
import { NavgateChatBox, Navigation } from '../../Slices/Navslice'
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { Badge } from 'antd'
export default function Navigations() {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.nav.loggedInUser)

    const Navigate = (page) =>{
        dispatch(Navigation({page:page}))
        dispatch(NavgateChatBox({userid:null,username:null}))

    }
    
    return (
        <div className="w-100">
            <div className="w-100 flex justify-center">
                <div className="h_i_m">
                    {/* icons */}
                    <div className="home_profile_img1 flex">
                        
                        {/* <div className="pv4">
                        <FontAwesomeIcon icon={solid("cart-shopping")} className="icons f3 navy pointer" title="store"/>
                        </div> */}
                        <div className="pv4"
                         onClick={e=>Navigate("threads")}
                        >
                        <FontAwesomeIcon icon={solid("bars-staggered")} className="icons f3 navy pointer" title="threads"/>
                        </div>
                        <div className="pv4"
                        onClick={e=>Navigate("connect")}
                        >
                        <FontAwesomeIcon icon={solid("user-plus")} className="icons f3 navy pointer" title="connect"/>
                        </div>
                        <div className="pv4"
                        onClick={e=>Navigate("stream")}
                        >
                            <PodcastsIcon className="pointer navy"  title="stream"/>
                        </div>
                    </div>
                     {/* profile image */}
                    <div className="home_profile_img">
                        <Badge dot>
                        <Avatar src={userData?.profileimg} size={40} name={userData?.username} />
                        </Badge>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
