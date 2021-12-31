import React, { useState } from 'react'
import { endpoint } from '../../passer/key/endpoint/endpoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import { message} from 'antd';
import { useDispatch,} from 'react-redux'
import { setLoginRoute } from '../../Slices/LoginSlice'

export default function Registration() {
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [password, setPassword] = useState("")
const [username, setUsername] = useState("")
const [showpass, setShowpass] = useState(false)


const dispatch = useDispatch()

const registerUsers = async()=>{
    try {
        const initiate = await fetch(`${endpoint}/authentication/register`,{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                email:email,
                phone:phone,
                password:password,
                username:username
            })
        })
    
        const response = await initiate.json()
        if(response.error) {
            return message.error(response.error)
        }
        dispatch(setLoginRoute(1))
        return message.success(response.success)
    } catch (error) {
        console.log(error.message)
    }
}

    return (
        <div className="w-100 register_form">
            {/* username */}
            <div className="pa2">
                <div className="auth_inputs shadow-1 br2">
                    <input
                        value={username}
                        type="text" name="username" placeholder="pick a username" className="w-90 b"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
            </div>

            {/* phone */}


            <div className="pa2 pv4">
            <div className="auth_inputs shadow-1 br2">
                <input
                    value={phone}
                    type="text" name="phone" placeholder="Enter your phone number" className="w-90 b"
                    onChange={e => setPhone(e.target.value)}
                />
            </div>
            </div>

            {/* email */}
            <div className="pa2 pv4">
            <div className="auth_inputs shadow-1 br2">
                <input
                    value={email}
                    type="email" name="email" placeholder="example@gmail.com" className="w-90 b"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            </div>
            {/* password */}
            <div className="pa2 pv4 flex">
                <div className="auth_inputs shadow-1 br2">
                    <input type={`${showpass === false ? 'password' : 'text'}`} name="password" placeholder="choose a password" className="auth_pass w-90 b"
                        value={password} autocomplete="off"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon icon={solid("eye")} className="icons navy pointer" onClick={e => setShowpass(showpass === true ? false : true)} />
                </div>
            </div>

            <div className="flex pa2">
                <div className="flex w-50" style={{ flexGrow: 1 }}>
                    <div className=" w-50 br2 shadow-1 bg-blue login_btn tc pointer flex" onClick={registerUsers}>
                        <span style={{ flexGrow: 1 }} >Register</span>
                        <FontAwesomeIcon icon={solid("arrow-right")} className="icons navy" />
                    </div>
                </div>
            </div>
        </div>
    )
}
