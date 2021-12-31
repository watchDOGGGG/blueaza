import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { useState } from 'react'
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { Checkbox, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from '../../Slices/Navslice';
import { endpoint, socket } from '../../passer/key/endpoint/endpoint';
import uuid from 'react-uuid'
import { setholdMyCHannleId } from '../../Slices/ChannelSlice';
import {setChannelID,setcreatorId} from '../../Slices/ChannelSlice'


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Work', 'School', 'my connections', 'location'];

export default function StartStream() {
    const [checkedList, setCheckedList] = React.useState(plainOptions);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);
    
    const userId = useSelector(state => state.nav.loggedInUser)

    const dispatch = useDispatch()
    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

        const startUserStream = () => {
        // Create socket connection for stream.
        socket.emit("createRoom", uuid(), userId._id)
        socket.on('room-created',async(roomid) =>{
           try {
                
            //Insert room to database and distribute link to all users
            const initiate = await fetch(`${endpoint}/create/createBroadcastingRoom`,{
                method: 'POST',
                headers: {"Content-Type": "application/json",passkey: localStorage.passkey},
                body: JSON.stringify({roomid:roomid})
            })

            const response = await initiate.json()
            if(response.success){
                socket.emit('join-room',roomid,userId._id) 
                dispatch(setholdMyCHannleId(roomid))
                dispatch(setcreatorId(userId._id))
                dispatch(Navigation({page:'liveStream'}))
                return 
            }
           } catch (error) {
               console.log(error.message)
           }
        })
       

    }
    return (
        <div>
            <div>
               {/* big icon */}
               <div className="flex justify-center items-center" style={{height:'50vh'}}>
                   <div className="tc">
                   <span>
                        <PodcastsIcon className="black"  title="stream" style={{fontSize:'150px'}}/>
                   </span>
                   {/* start stream button */}
                   <div className="b f5 pointer bg-red br2 pa2 white w-auto" onClick={startUserStream}>
                       <span>Start broadcasting live</span>
                   </div>
                   </div>
               </div>
               

               {/* list of all available places to broadcast live */}

               <div>
                   <div className="tc b f3 ">
                   <span>who are your targets!</span>
                   </div>

                    {/* start list */}
                    <div className="w-80 center f5 pv2">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Check all
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />

                        {/* end list */}

                    </div>
                </div>
            </div>
        </div>
    )
}
