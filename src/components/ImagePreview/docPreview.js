import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 

export function DocPreview({doxs}) {
   
    return (
        doxs.map((item) =>{
            return(
                <div>
                    <a href={`${item?.file}`} download>
                        <FontAwesomeIcon icon={solid("file-pdf")} className="icon doc_preview"/>
                    </a>

                </div>
            )
        })
    )
}


export function ThreadDocPreview({doxs}) {
   
    return (
        doxs.map((item) =>{
            return(
                <div>
                    <a href={`${item[0].file}`} download>
                        <FontAwesomeIcon icon={solid("file-pdf")} className="icon doc_preview"/>
                    </a>

                </div>
            )
        })
    )
}
