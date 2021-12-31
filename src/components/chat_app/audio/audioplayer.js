import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 
import './player.css'

export  function MpPlayer({audio,id}) {
  const [t_b, setT_b] = useState('play')

  useEffect(() => {
    var music = document.getElementById(`music${id}`); // id for audio element
    var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton = document.getElementById(`pButton${id}`); // play button
    var playhead = document.getElementById(`playhead${id}`); // playhead
    var timeline = document.getElementById(`timeline${id}`); // timeline
    
    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    
    // play button event listenter
    pButton.addEventListener("click", play);
    
    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);
    
    // makes timeline clickable
    timeline.addEventListener("click", function(event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
    }, false);
    
    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }
    
    // makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
    
    // Boolean value so that audio position is updated only when the playhead is released
    var onplayhead = false;
    
    // mouseDown EventListener
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        music.removeEventListener('timeupdate', timeUpdate, false);
    }
    
    // mouseUp EventListener
    // getting input from all mouse clicks
    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            // change current time
            music.currentTime = duration * clickPercent(event);
            music.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }
    // mousemove EventListener
    // Moves playhead as user drags
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);
    
        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
    }
    
    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
        var playPercent = timelineWidth * (music.currentTime / duration);
        playhead.style.marginLeft = playPercent + "px";
        if (music.currentTime == duration) {
            pButton.className = "";
            pButton.className = "play";
        }
    }
    
    //Play and Pause
    function play() {
        // start music
        if (music.paused) {
            music.play();
            // remove play, add pause
            pButton.className = "";
            pButton.className = "pause";
        } else { // pause music
            music.pause();
            // remove pause, add play
            pButton.className = "";
            pButton.className = "play";
        }
    }
    
    // Gets audio file duration
    music.addEventListener("canplaythrough", function() {
        duration = music.duration;
    }, false);
    
    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
    
  },[])
 
  const toggleButton = () =>{
    t_b === 'play'?setT_b('pause'):setT_b('play')
  }
  return (
    <div>
      <audio id={`music${id}`} preload="true" className="mw6">
        <source src={audio.file} />
        <source src={audio.file} />
      </audio>
      <div id="audioplayer">
        <span  className="play pButton"  id={`pButton${id}`}>
          {
            t_b === 'play' &&
            <FontAwesomeIcon icon={solid("circle-play")} className="icons navy f2" onClick={toggleButton}/>
          }
        {
            t_b === 'pause' &&
            <FontAwesomeIcon icon={solid("circle-pause")} className="icons navy f2" onClick={toggleButton}/>
          }
        
        </span>
        
        <div id={`timeline${id}`} className="timeline ml2">
          <div id={`playhead${id}`} className="playhead"></div>
        </div>
      </div>

    </div>
  )
}
