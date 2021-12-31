import React, { useEffect, useState } from 'react'
import Leftthread from './leftthread'
import Rightthread from './rightthread'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import { endpoint,socket } from '../../passer/key/endpoint/endpoint'
import NoThread from '../../assets/dropthread.svg'
import { Modal} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {setThreadLoading, setThreadsRequest, setThreadText} from '../../Slices/ThreadSlice'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FileUpload from './fileUploads/imgupload'
import {setThreadfileList,setThreadpreviewImages,setThreadpreviewDoc} from '../../Slices/ThreadSlice';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



export default function Thread() {

    const allthread = useSelector(state => state.thread.AllThread)
    const allcon = useSelector(state => state.search.allConnections)
    
    const dispatch = useDispatch()

    useEffect(() =>{
        socket.on('fetch_all_thread',()=>{
           return fetchAllUsersThread()
        })

        return fetchAllUsersThread()
    },[])


    
    const fetchAllUsersThread = async() =>{
      try {
        const initiate = await fetch(`${endpoint}/thread/fetchallthread`,{
           method:'POST',
            headers: {"Content-Type": "application/json",passkey:localStorage.passkey},
            body: JSON.stringify({
                Allconnections:allcon
            })
        })
        const response = await initiate.json()
       
        if(response.success){
            dispatch(setThreadsRequest(response.success))
        }
      } catch (error) {
          console.log(error.message)
      }
    }
   
    
    
    return (
        <div className="thread">
            <CreateThread />
            {
                allthread.length > 0?
                allthread.map((item) =>{
                    return (
                        <div>
                            {/* right user */}
                            { 
                                item?.by?._id !== localStorage.getItem('userid') &&
                                <div className={`thread_box justify-start flex mt1 w-100`} >
                                    <Rightthread items={item} files={item.filesTosave} docs={item.docTosave}/>
                                </div>
                            }
                            {/* left user */}
                            {
                                item?.by?._id === localStorage.getItem('userid') &&
                                <div className={`thread_box justify-center flex mt2 w-100`}>
                                    <Leftthread items={item} files={item.filesTosave} docs={item.docTosave} />
                                </div>
                            }
                        </div>
                    )
                })
                :
                <div className="bg-white w-100">
                   <div className="w-100 welcome-image-area flex pa3">
                <div className="welcome-image-area-inner">
                    <img src={NoThread} alt="Welcome" className="w-50"/>
                </div>
                
            </div>
            <div className="tc center w-80 f4 gray fw5 pa4">
                <p>Let you friends and family know whatsup by droping threads here</p>
                
            </div>
                </div>
            }
            
        </div>
    )
    

}

  const CreateThread = () =>{
    const [visible, setVisible] = useState(false);
   
  
      const dispatch = useDispatch()    
      const threadtext = useSelector(state => state.thread.createThread.text)
      const fileList = useSelector(state => state.thread.createThread.fileList)
      const threadLoading = useSelector(state => state.thread.loading)
    
  
    //   const setFor = (value) =>{
    //       setthreadFor(value)
    //   }
      const createThread = async() => {
          dispatch(setThreadLoading(true))
          try {
              if(threadtext === '' && fileList.length < 1) { 
                setVisible(false)
                dispatch(setThreadLoading(false))
                  return null
              }
            const formData = new FormData();
            formData.set("text",threadtext)
            fileList.forEach(element => {
                formData.append('files', element)
            });
          
          
            const initiate = await fetch(`${endpoint}/thread/create`, {
                method: 'POST',
                headers: { passkey: localStorage.passkey },
                body: formData
            })
            
              const response = await initiate.json()
              if(response.success) {
                  socket.emit('fetch_threads',localStorage.getItem("userid"))
                  setVisible(false)
                  dispatch(setThreadText('')) 
                  dispatch(setThreadfileList([]))
                  dispatch(setThreadpreviewImages([]))
                  dispatch(setThreadpreviewDoc([]))

              }
              if(response){
                dispatch(setThreadLoading(false))
              }
              
          } catch (error) {
              console.log(error.message)
          }
      }
  
      //set thread text and update characters
      const setTxt = (e) =>{
          dispatch(setThreadText(e.target.value)) 
      }
    
    return (
      <>
        <div className="bg-white flex center justify-center navy mw5 create_thread_pos pa2 pointer" onClick={() => setVisible(true)}>
            <div className="tc">create thread</div>
            {
                            threadLoading === false &&
                            <FontAwesomeIcon icon={solid("bars-staggered")} className="icons navy ml2" />
                        }
                        {
                            threadLoading === true &&
                            <Spin indicator={antIcon} className="navy"/>
                        }
           
        </div>
        <Modal
          centered
          style={{ top: -120, backgroundColor:'none' }}
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={500}
          footer={[
            
          ]}
        >
          <div className="center mw9 pv2" style={{ overflowX: 'hidden' }}>
                <textarea placeholder="create thread..." className="w-100 threa_textarea ba b--black-10 f6 pa1" maxLength={500}
                    value={threadtext}
                    onChange={setTxt}
                    onKeyDown ={setTxt}
                />
               
                <div className="flex">
                    <div className="thread_box_icons flex justify-start mt1">
                        <div className="thread_box_send mr4">
                            <FontAwesomeIcon icon={solid("circle-notch")} className="icons navy" /> <span className="font-sm">{threadtext.length}</span>
                        </div>
                        
                    </div>
                    <div className="thread_box_send mr4 pointer mt1">
                        {
                            threadLoading === false &&
                            <FontAwesomeIcon icon={solid("paper-plane")} className="icons navy"  onClick={createThread}/>
                        }
                        {
                            threadLoading === true &&
                            <Spin indicator={antIcon} className="navy"/>
                        }
                        </div>
                    </div>
                    <div className="pt4">
                        <FileUpload />
                    </div>
                </div>
            </Modal>
      </>
    );  
  }
