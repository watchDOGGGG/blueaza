import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginRoute } from '../../Slices/LoginSlice'
import Login from './login'
import Register from './registration'

export default function Landing() {
    const dispatch = useDispatch()
    const route = useSelector(state => state.auth.loginroute)

    return (
        <div>
            <div className="landing bg-blue">
                <div className="flex">
                    {/* images */}
                    <div className="landingImg bg-blue"> </div>

                    {/* auth */}
                    <div className="landingAuth bg-white">
                        <div className="center a-f-c-1">
                            {/* auth buttons */}
                        <div className="pv4 flex">
                            <div className="landing_singin w-50 ">
                            <div className="flex justify-start">
                                <span className="bg-white br2 shadow-1 pointer pa2" onClick={e=>dispatch(setLoginRoute(1))}>Sign in</span>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="flex justify-end">
                                <span className="bg-white br2 shadow-1 pointer pa2" onClick={e=>dispatch(setLoginRoute(2))}>Sign up</span>
                                </div>
                            </div>
                        </div>
                        {/* full form */}
                        <div className="a_f pv6">
                            {/* <content */}
                            <div className="auth_content">
                                {
                                    route === 1 && 
                                   <>
                                    <div>
                                    <span>Welcome back</span>
                                </div>
                                <div className="b f2 login-font">
                                    <span>
                                        Login to your account
                                    </span>
                                </div>
                                   </>
                                }
                                 {
                                    route === 2 && 
                                   <>
                                    <div>
                                    <span>you self</span>
                                </div>
                                <div className="b f2 login-font">
                                    <span>
                                        so you finally decided to join ....
                                    </span>
                                </div>
                                   </>
                                }
                            </div>

                                {/* login  */}
                                {/* register */}
                                
                                    <div className="a-f-2 flex justify-center">
                                        {
                                            route === 1 &&
                                            <Login />
                                        }
                                        {
                                            route === 2 &&
                                            <Register />
                                        }
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
