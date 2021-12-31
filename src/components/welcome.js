import React from 'react'
import IMG from '../assets/chat.svg'

export default function Welcome() {
    return (
        <div>
            <div className="w-100 welcome-image-area flex">
                <div className="welcome-image-area-inner">
                    <img src={IMG} alt="Welcome" className="w-50"/>
                </div>
                
            </div>
            <div className="tc center w-80 f4 gray fw5">
                <p>Welcome to the best campus secure messaging system</p>
                <p>Everything Privacy</p>
            </div>
        </div>
    )
}
