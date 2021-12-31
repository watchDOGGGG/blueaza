import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import GifIcon from '@mui/icons-material/Gif';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateChatFileList,setCreateChatPreviewFiles,setCreateChatpreviewDoc} from '../../../Slices/chatSlice';


export default function FileUpload() {


    // image
    const fileList = useSelector(state => state.chat.createChat.fileList)
    const previewImage = useSelector(state => state.chat.createChat.previewImages)

    // doc
    const previewDoc = useSelector(state => state.chat.createChat.previewDoc)

    const dispatch = useDispatch()

    // handle image selected image files 
    const handleOnchangeImage = (e) => {
        let imageFiles = document.getElementById("imagesfile")
        let images = []

        //append array to file list and image object to imge preview
        for (let i = 0; i < e.target.files.length; i++) {
             images.push(URL.createObjectURL(e.target.files[i])) 
        }
        dispatch(setCreateChatPreviewFiles([...previewImage, ...images]))
        dispatch(setCreateChatFileList([...fileList, ...e.target.files]));
        return imageFiles.value = null
      
    }

    //DeleteImage
    const deleteImage = (e,file) =>{
        let newArray = previewImage.filter(function(f) { return f !== e })
        let newFileArray = fileList.filter(function(f) { return f !== file })
        dispatch(setCreateChatPreviewFiles(newArray))
        dispatch(setCreateChatFileList(newFileArray))
    }


    // handle docs upload

    const handleOnchangeDoc = (e) =>{
        let docs = []

        for(let i = 0; i < e.target.files.length; i++){
            docs.push(URL.createObjectURL(e.target.files[i]))
        }

        dispatch(setCreateChatpreviewDoc([...previewDoc, ...docs]))
        dispatch(setCreateChatFileList([...fileList, ...e.target.files]));
       
    }

   //DeleteDocs
   const deleteDocs = (e,file) =>{
    let newArray = previewDoc.filter(function(f) { return f !== e })
    let newFileArray = fileList.filter(function(f) { return f !== file })
    dispatch(setCreateChatpreviewDoc(newArray))
    dispatch(setCreateChatFileList(newFileArray))
}

    return (
        <div>
            {/* file types */}
            <div className="flex justify-center justify-around pt1 center w-75">
                {/* image */}
                <div>
                    <label className="">
                        <FontAwesomeIcon icon={solid("images")} className="icons navy" />
                        <input type="file" id={"imagesfile"} multiple={true} name="file" maxLength={4} style={{ visibility: "hidden" }} accept="image/png, image/gif, image/jpeg"
                        onChange={e=>handleOnchangeImage(e)}
                        />
                    </label>

                </div>
                {/* documents */}

                <div>
                    <label className="">
                        <FontAwesomeIcon icon={solid("file-lines")} className="icons navy" />
                        <input type="file" multiple={false} name="file" maxLength={4} style={{ visibility: "hidden" }} accept=".pdf, .docx" 
                        onChange={e=>handleOnchangeDoc(e)}
                        />
                    </label>
                </div>
                {/* gif */}
                <div>
                    <label className="">
                        <GifIcon className="icons navy" />
                    </label>
                </div>
            </div>
            {/* preview */}
            
                <div className="center w-90 example example-cover flex">
                    {
                        previewImage.map((item,i) => {
                            const fileListIndex = fileList[i]
                            return (
                                <div className="container pa1">
                                <img
                                   src={`${item}`}
                                   alt={'image'}
                                   className=""
                               />
                               <div class="positioner">
                                   <div class="icon pointer black">
                                       <FontAwesomeIcon icon={solid("trash")} className="icons white" onClick={e=>deleteImage(item,fileListIndex)}/>
                                   </div>
                               </div>
                           </div> 
                            )
                        })
                      
                    }
                    {
                        previewDoc.map((docitem,i) =>{
                            const fileListIndex = fileList[i]
                            return (
                                <div className="container pa1">
                                 <FontAwesomeIcon icon={solid("file-pdf")} className="doc_preview navy w-100" style={{height:"60px"}}/>
                               <div class="positioner">
                                   <div class="icon pointer black">
                                       <FontAwesomeIcon icon={solid("trash")} className="icons white" onClick={e=>deleteDocs(docitem,fileListIndex)}/>
                                   </div>
                               </div>
                           </div> 
                            )
                        })
                    }
                </div>
            
        </div>
    )
}
