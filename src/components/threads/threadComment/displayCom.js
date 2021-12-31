import React, { useEffect, useState } from 'react'

import { endpoint, socket } from '../../../passer/key/endpoint/endpoint'
import CommentTemp from './commentTemp'


export default function DisplayCom({t_id}) {
    const [Comments, setComments] = useState([])

  
    useEffect(() => {
        socket.on('fetchAllThreadComm',()=>{
            fetchThreadComm()
        })
        fetchThreadComm()
    },[])

    const fetchThreadComm = async () =>{
       try{
        const initiate = await fetch(`${endpoint}/thread/fetchThreadComm/${t_id}`,{
            headers: {passkey:localStorage.passkey}
        })
        const response = await initiate.json()
        setComments(response.success)
        
       }catch(error){
           console.log(error.message)
       }
    }
    return (
        <div  className="pa2">
            {
                Comments.length > 0 && 
                Comments.map((item) =>{
                   return (
                    
                    item?.threadCom.length > 0 &&
                    item?.threadCom.map((comments) =>{
                        
                        return(
                            <>
                            <CommentTemp comment={comments}/>
                            </>
                        )
                    })
                   )
                })
            }
        </div>
    )
}
