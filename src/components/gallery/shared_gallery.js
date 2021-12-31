import { Image } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 

export default function Sharedgallery() {
    const [route, setroute] = useState(1)
    const chatsFiles = useSelector(state => state.chat.Chats.imagegallery)
   
    return (
        <div className="flex justify-center w-100 gallery">
            <div className="w-100">
                <div className="flex justify-around pa2">
                    <div className="ga_mu pointer" onClick={e=>setroute(1)}>images</div>
                    <div className="ga_mu2 pointer" onClick={e=>setroute(2)}>files</div>
                </div>

                <div className="g_c">
                {
                   route === 1 && 
                    chatsFiles?.imagegallery?.length > 0 &&
                    <Image.PreviewGroup>
                         <div className="justify-center example example-cover flex">
                        {chatsFiles?.imagegallery.map((item) => {
                            
                            return (
                                item.fileType === 'image/png' &&
                                <div className="container pa1">
                                <Image src={item.file} />
                                </div>
                            )
                        })}
                        </div>
                    </Image.PreviewGroup>

                }
               
               {
                   route === 2 && 
                    chatsFiles?.imagegallery?.length > 0 &&
                    <Image.PreviewGroup>
                         <div className="justify-center example example-cover flex">
                        {chatsFiles?.imagegallery.map((item) => {
                            
                            return (
                                item.fileType === 'application/pdf' &&
                                <div className="container pa1">

                                    <a href={`${item.file}`} download>
                                        <FontAwesomeIcon icon={solid("file-pdf")} className="icon doc_preview" />
                                    </a>

                                </div>

                            )
                        })}
                        </div>
                    </Image.PreviewGroup>

                }
                </div>
            </div>
        </div>
    )
}
