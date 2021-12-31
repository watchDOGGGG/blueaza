import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import { endpoint, socket } from '../../../passer/key/endpoint/endpoint'
import DisplayCom from './displayCom'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


export default function ThreadCom({t_id,t_by}) {
    
const [CommentTxt, setCommentTxt] = useState('')
const [loading, setLoading] = useState(false)
const [Showcomment, setshowComment] = useState(false)
//insert comment
const inserComment = async () =>{
    
    setLoading(true)
    try {
        if(CommentTxt === ''){
            setLoading(false)
            return null
        }
        const initiate = await fetch(`${endpoint}/thread/insertcom`,{
            method: 'POST',
            headers: {"Content-Type": "application/json",passkey:localStorage.passkey},
            body: JSON.stringify({
                text:CommentTxt,
                thread_id:t_id,
                threadby:t_by
            })
        })
        const response = await initiate.json()
        if(response.success){
            setCommentTxt('')
            setLoading(false)
            setshowComment(true)
            socket.emit('createComment',t_id)
        }
    } catch (error) {
        console.log(error.message)
    }
}

    return (
        <div>
            <div className="flex justify-center">
                        <input type="text" placeholder="write to thread" className="w-90 br-pill thread_input ba b--black-10 pa2 font-sm"
                        onChange = {e=>setCommentTxt(e.target.value)}
                        value={CommentTxt}
                        />
                         {
                            loading === false &&
                            <FontAwesomeIcon icon={solid("paper-plane")} className="icons navy ml2 pointer" onClick={inserComment}/>
                        }
                        {
                            loading === true &&
                            <Spin indicator={antIcon} className="navy"/>
                        }
                         <FontAwesomeIcon icon={solid("message")} className="icons navy ml2 pointer" onClick={e=>setshowComment(Showcomment === true?false:true)}/>
                        
                    </div>
                    <div>
                        {
                            Showcomment === true &&
                            <DisplayCom t_id={t_id}/>
                        }
                        
                    </div>
                    
        </div>
    )
}
