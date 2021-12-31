import React, { useState } from 'react'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { setCreateAudioReco,setCreateChatFileUpload} from '../../../Slices/chatSlice'
 
export const Recorder = () =>{
    const [recordState, setrecordState] = useState(null)
    const [switchbtn, setbtn] = useState('end')

    const dispatch = useDispatch()

    const start = () => {
        setrecordState(RecordState.START)
      }
     
      const stop = () => {
        setrecordState(RecordState.STOP)
      }
     
     
      //audioData contains blob and blobUrl
      const onStop = (audioData) => {
        dispatch(setCreateAudioReco(audioData))
      }

  const toggleButton = () => {
    if (switchbtn === 'end') {
      start()
      setbtn('start')
    } else if (switchbtn === 'start') {
      stop()
      setbtn('end')
    }
  }

 const endRecord = () =>{
  dispatch(setCreateAudioReco(null))
  dispatch(setCreateChatFileUpload(''))
 }
  return (
        <div className="flex w-80 pa2 center">
         
          {
            switchbtn === 'end' &&
            <FontAwesomeIcon onClick={toggleButton} icon={solid('microphone')} className="icons red" title={"start record"} />
          }
           {
            switchbtn === 'start' &&
            <FontAwesomeIcon onClick={toggleButton} icon={solid('circle-check')} className="icons green" title={"end record"} />
          }
           <AudioReactRecorder state={recordState} onStop={onStop} canvasHeight={20} canvasWeight={100}/>
          
            <FontAwesomeIcon onClick={endRecord} icon={solid('circle-xmark')} className="icons red" title={"end record"} />
    
      </div>
      )

}