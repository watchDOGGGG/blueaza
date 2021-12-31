import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { endpoint, socket } from '../../passer/key/endpoint/endpoint'
import { setAuthRoute } from '../../Slices/LoginSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import { message} from 'antd';


export default function Login() {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [showpass, setShowpass] = useState(false)


    const dispatch = useDispatch()
    //login
    const Login = async()=>{
        try {
            const initiate = await fetch(`${endpoint}/authentication/login`,{
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    password:password,
                    email:email
                })
            })
        
            const response = await initiate.json()
            
            if(response.error) {
                return message.error(response.error)
            }
            message.success("welcome back")
            localStorage.setItem("passkey",response.success.passkey)
            localStorage.setItem("userid",response.success.userid)
            dispatch(setAuthRoute(1))
            return socket.emit("active",response.success.userid)


        } catch (error) {
            console.log(error.message)
        }
    }
    

    return (
        <div className="w-100 register_form">
            {/* email */}
            <div className="pa2">
               <div className="auth_inputs shadow-1 br2">
               <input type="email" placeholder="username" className="w-90 b"
               value={email} autocomplete="off"
               onChange={e=>setEmail(e.target.value)}
               />
               </div>
            </div>
           {/* password */}
           <div className="pa2 pv4 flex">               
               <div className="auth_inputs shadow-1 br2">
               <input type={`${showpass === false?'password': 'text'}`} placeholder="choose a password" className="auth_pass w-90 b"
                value={password} autocomplete="off"
               onChange={e=>setPassword(e.target.value)}
               />
               <FontAwesomeIcon icon={solid("eye")} className="icons navy pointer" onClick={e=>setShowpass(showpass === true?false:true)} />
               </div>
            </div>

            <div className="flex">
                <div className="flex w-50" style={{ flexGrow: 1 }}>
                    <div className=" w-50 br2 shadow-1 bg-blue login_btn tc pointer flex" onClick={Login}>
                        <span style={{ flexGrow: 1 }} >Login</span>
                        <FontAwesomeIcon icon={solid("arrow-right")} className="icons navy" />
                    </div>
                </div>
                <span className="login-font pa2 w-50 pointer">forgot password</span>
            </div>
        </div>
    )
}
