import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Body from './components/UserPage/LandingPage/Body'
import NavHeader from './components/UserPage/LandingPage/Header'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import {fetchUser,dispatchGetUser,dispatchLogin} from './redux/actions/authAction'


function App() {
//const 
const dispatch = useDispatch()
const token = useSelector(state => state.token)
const auth = useSelector(state => state.auth)
const {isLogged} = auth


const getToken = async()=>{
  const res = await axios.post('/user/refresh_token',null)
  dispatch({type:'GET_TOKEN',payload: res.data.access_token})
}

const getUser = async() =>{
  return fetchUser(token).then(res =>{
    dispatch(dispatchGetUser(res))
  })
}


//effect
useEffect(()=>{
  const firstLogin = localStorage.getItem('firstLogin')
  if(firstLogin){
    getToken()
    dispatch(dispatchLogin())
  }
},[isLogged])

useEffect(()=>{
  if(token) getUser()
},[token])



//render
  return (
    <div>
      <Router>
        {
          <div>
            <div className='body'>
              <Body/>
            </div>
            <NavHeader/>
          </div>
        }
      </Router>
    </div>
    
    
  )
}

export default App

