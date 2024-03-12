import React from 'react'
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux'

// pages for this product
import Register from '../../auth/Register';
import ActiveEmail from '../../auth/ActiveEmail';
import ForgotPw from '../../auth/ForgotPw';
import ResetPassword from '../../auth/ResetPassword'
import Notfound from '../../utils/Notfound'
import Successfully from '../../utils/Successfully'
import Home from '../View/Home'






function Body() {
    //const
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth

    //render
    return (
        <div className='body'>
            <section>
                <Switch>

                    {/* must login first */}
                    <Route exact path="/register" component={isLogged? Notfound: Register}/>
                    <Route exact path="/forgot" component={isLogged? Notfound:ForgotPw}/>
                    <Route exact path="/user/reset/:token" component={isLogged? Notfound:ResetPassword}/>
                    {/* notification */}
                    <Route exact path="/success/:title/:subTitle" component={Successfully}/>

                    {/* no need to login */}
                    <Route exact path="/user/activation/:activation_token" component={ActiveEmail}/>
                    
                    <Route exact path="/" component={Home}/>
                </Switch>
            </section>
      </div>
    )
}

export default Body
