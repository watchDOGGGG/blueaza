import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import Avatar from '../avatar/avatar'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthRoute } from '../../Slices/LoginSlice';
import { socket } from '../../passer/key/endpoint/endpoint';
import { NavgateChatBox, Navigation } from '../../Slices/Navslice';

const syle = {
  height:'70%',
}
export default function HeaderContent({backButton}) {

  const user = useSelector(state => state.nav.ChatView)
  const istyping = useSelector(state => state.nav.typing.istyping)
  const pageTitle = useSelector(state => state.nav.navigation.page)
  const channelID = useSelector(state => state.channel.ChannelID)
 

    return (
        <div className="header">
          
            <div className="flex header_content">
           
          <div className="chat_wit flex" style={syle}>
            {
              user.username !== null &&
                   <>
                <div>
                  <div>
                    <span className="b_b" onClick={backButton}>back</span>
                    <Avatar src={user.profileimg} name={user.username} size={30} />
                  </div>
                </div>
                    <div className="chat_wit_name w-100 pa2 b ttc ">
                          <div className="flex w-80" style={{flexWrap: 'wrap'}}>{user.username}
                            <span className="font-sm gray fw4 ttl">{istyping !== false? 'incomming chat...' : null}</span>
                          </div>
                    </div>
                   </>
            }
            {
              user.username === null &&
              <div className="chat_wit_name pa2 b ttc ">
                <div className="flex w-80" style={{ flexWrap: 'wrap' }}>
                  {pageTitle} 
                  {
                    pageTitle === 'liveStream' && channelID !== null &&
                    <> with channel {channelID}</>
                  }
                </div>
              </div>
            }

          </div>

                <div className="flex" style={{lineHeight:2.5}}>
                    {/* chat search */}
                    <div className="ml3 mr3 pointer">
                        <FontAwesomeIcon icon={solid("magnifying-glass")} className="icons"/>
                    </div>
                    {/* settings  */}
                    <div className="ml3 mr3 pointer">
                        <PopoverPopupState/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const PopoverPopupState = ()=> {
  const dispatch = useDispatch()
  const route = useSelector(state => state.nav.navigation.page)
  
  const setNavigation = (page) => {
    dispatch(Navigation({page:page}))
    dispatch(NavgateChatBox({userid:null,username:null})) 
  }
  


    const logout = () =>{
        socket.emit("disconnet",localStorage.removeItem("userid"))
        localStorage.removeItem("passkey")
        localStorage.removeItem("userid")
        window.location = "/login"
        dispatch(setAuthRoute(2))
        
    }
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <FontAwesomeIcon icon={solid("sliders")} className="icons" {...bindTrigger(popupState)}/>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>
                <div>
                    {/* logout */}
                    <div className="flex pointer font-sm" onClick={logout}>
                    <FontAwesomeIcon icon={solid("right-from-bracket")} className="icons"/>
                        <span className="ml2">Logout</span>
                </div>
                {/* chat settings */}
                {
                  route === 'chat' &&
                  <div className="flex pointer mt2 font-sm">
                    <FontAwesomeIcon icon={solid("comment-dots")} className="icons" />
                    <span className="ml2">Chat settings</span>
                  </div>
                }
                {/* settings */}
                <div className="flex pointer mt2 font-sm" onClick={e=>setNavigation('settings')}>
                  <FontAwesomeIcon icon={solid("gears")} className="icons" />
                  <span className="ml2">Settings</span>
                </div>  
                </div>
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

