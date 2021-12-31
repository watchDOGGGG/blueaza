import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { endpoint } from '../passer/key/endpoint/endpoint';
import { setAuthRoute } from '../Slices/LoginSlice';
import Notfound from './404/404';
import Landing from './authentication/landing';
import Home from './home';
   

export default function Layout() {

    const Authroute = useSelector(state => state.auth.authroute)


    const dispatch = useDispatch()
    useEffect(() => {
        checkPasskey()
      }, [])
  
       // verify user passkey and keep login and register off grid
      const checkPasskey = async()=>{
        try {
            const checkKey = await fetch(`${endpoint}/authentication/verifyKey`,{
                headers:{passkey:localStorage.passkey}
              })
              const res = await checkKey.json()
             
              if(res.message === true){
                return dispatch(setAuthRoute(1))
              }
              return dispatch(setAuthRoute(2))
        } catch (error) {
            console.log(error.message)
        }
      }


    return (
        <Router>
            {
                Authroute === 2 &&
                <Switch>
                    <Route path={"/register"} exact component={Landing} />
                    <Route path={"/login"} exact component={Landing} />
                    <Route path={"*"}>
                        <Redirect to={'/login'} />
                    </Route>
                </Switch>
            }

            {
            Authroute === 1 &&
                <Switch>
                    <Route path={"/login"} exact>
                        <Redirect to={'/home'} />
                    </Route>
                    <Route path={"/home"} exact component={Home} />
                    <Route path={"/"} exact component={Home} />
                    <Route path={"*"} component={Notfound} />
                </Switch>

            }
            {
                Authroute === 0 && 
                <>
                <p>Loading</p>
                </>
            }

        </Router>
    )
}





