import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import {useMutation} from 'react-query'
import { message } from 'antd'
import { Spin, } from 'antd';
import {createOrganization} from '../../queries/send'


export default function CreateOrganization() {
    const [name,setname] = useState('')
    const [desc,setdesc] = useState('')
    const [estb,setestb] = useState('')
    const [loca,setloca] = useState('')
    const [phone,setphone] = useState('')

    const {mutate, isLoading, isError} = useMutation(createOrganization,{
        onSuccess: (success) =>{
            if(success.error){
                return message.error(success.error)
            }
           return  message.success(success.success)
        },     
    })

    const submitData = () =>{
        mutate({name:name,desc:desc,estb:estb,loca:loca,phone:phone})
    }
    
    return (
        <div className="c_o w-100">
           <div className="flex justify-start pa2"> 
               <div className="w-100">
                   {/* title */}
           <div className="f3 b">
               <span>Create New Organization</span>
           </div>
           <div className="flex w-100 c_f">
               {/* comapny name */}
           <div className="w-100 grow grow-1">
               <label className=""><FontAwesomeIcon icon={solid("user")}/> Organization Name</label>
               <div>
                   <input value={name} onChange={e=>setname(e.target.value)} type="text" className="w-80 ba b--black-10 pa2 br2" placeholder="Organization name"/>
               </div>
           </div>
           {/* description */}
           <div className="w-100 grow">
               <label className=""><FontAwesomeIcon icon={solid("pencil")}/> Describe your Organization</label>
               <div>
                   <input value={desc} onChange={e=>setdesc(e.target.value)} type="text" className="w-80 ba b--black-10 pa2 br2" placeholder="Description"/>
               </div>
           </div>
           </div>
           {/* date established */}
           <div className="flex w-100 c_f">
               {/*date */}
           <div className="w-100 grow-1">
               <label className=""><FontAwesomeIcon icon={solid("calendar")}/> Established on</label>
               <div>
                   <input value={estb} onChange={e=>setestb(e.target.value)} type="date" className="w-80 ba b--black-10 pa2 br2" placeholder="date"/>
               </div>
           </div>
           </div>
           {/* location */}
           <div className="flex w-100 c_f">
               {/* comapny name */}
           <div className="w-100 grow grow-1">
               <label className=""><FontAwesomeIcon icon={solid("location-dot")}/> Where's this organization located at</label>
               <div>
                   <input value={loca} onChange={e=>setloca(e.target.value)} type="text" className="w-80 ba b--black-10 pa2 br2" placeholder="location"/>
               </div>
           </div>
          
               </div>
                {/* phone */}
                <div className="flex w-100 c_f">
               {/* comapny name */}
           <div className="w-100 grow grow-1">
               <label className=""><FontAwesomeIcon icon={solid("mobile-screen-button")}/> phone</label>
               <div>
                   <input  value={phone} onChange={e=>setphone(e.target.value)} type="text" className="w-80 ba b--black-10 pa2 br2" placeholder="phone"/>
               </div>
           </div>
               </div>
                    <div className="bg-blue pa2 br1 w-30 pv1 mt2 flex pointer grow" onClick={submitData}>
                        <span className="grow-1" >save</span>
                        {
                            !isLoading &&
                            <span><FontAwesomeIcon icon={solid("arrow-right")} /></span>
                        }

                        {
                            isLoading &&
                            <span className="white bg-white pa1 br-100 w-20 tc"><Spin size="small" /></span>
                        }

                    </div>
                </div>
        </div>
        </div>
    )
}
