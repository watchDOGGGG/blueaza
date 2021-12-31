import React from 'react'
import Avatar from '../avatar/avatar'
import { ThreadFilePreview } from '../ImagePreview/preview'
import ThreadCom from './threadComment/threadCom'
import {ThreadDocPreview} from '../ImagePreview/docPreview'

export default function Rightthread({items,files,docs}) {
  
    return (
        <>
           
            {/* message content */}
            <div className="mw6 w-100 ml1">
            <div className="w-100 right_msg bg-near-white pa1">
                <div className="flex font-sm gray">
                <div className="chat_img_div ">
                <Avatar src={""} name={items?.by?.username} size={20} />
            </div>
            {/* name */}
            <div className="thread_name pa1"><span> thread by : {items?.by?.username}</span></div>
            {/* time */}
            <div><span>12:30</span></div>
                </div>
                    <p className="right_msg f6 pa1">{items.text}
                    <div className="bg-light-gray pa1 flex justify-center">
                                {
                                    files.length > 0 &&
                                    <>
                                        <ThreadFilePreview files={files} />
                                        {
                                            files.length > 1 &&
                                            <span className="f4 b">+{files.length - 1}</span>
                                        }
                                    </>

                                }
                                {
                                    docs.length > 0 &&
                                    <>
                                        <ThreadDocPreview doxs={docs} />
                                    </>

                                }
                            </div>
                    </p>
                    <ThreadCom t_id={items?._id} t_by={items.by?._id}/>
                </div>
            </div>
        </>
    )
}
