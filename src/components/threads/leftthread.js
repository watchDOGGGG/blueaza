import React from 'react'
import { ThreadDocPreview } from '../ImagePreview/docPreview'
import { ThreadFilePreview } from '../ImagePreview/preview'
import ThreadCom from './threadComment/threadCom'

export default function Leftthread({items,files,docs}) {
 
    return (
        <>
              {/* message content */}
              <div className="mw6 mr1 w-100">
              <div className="w-100 left_msg bg-near-white pa1">
                <div className="flex font-sm gray">
            {/* name */}
            {/* time */}
            <div><span>12:30</span></div>
                </div>
                    <p className="left_msg f6 pa1">{items.text}
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
