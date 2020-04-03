import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
const axios = require('axios');

const Login = (props) => {
    const history = useHistory()
    const [user, setUser] = useState({username:'', password:''})

    const routeChange = (path) => {
        history.push(path);
    }

    const handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        const updatedUser = {...user}
        updatedUser[id] = val
        setUser(updatedUser)
    }

    const login = async () => {
        try{
          const response = await axios.post('http://localhost:4000/api/user', user)
          if(response.data.userId){
            //set store admin id to response.data.userId and initialize all from diff place
            routeChange('/order-manager')
          }else {
            alert(response.data.message)
          }
        }catch(err){
          console.log(err)
        }
      }
      
    const signUp = async (user) => {
        try{
            const response = await axios.post(`http://localhost:4000/api/newuser`,user)
            //set store admin id to response.data  which is the new id
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <form autoComplete="off" noValidate className="login form" >
            <List>
                <ListItem>
                    <TextField className="inputfield" id="username" label="Username" type="text" value={user.username} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="password" label="Password" type="password" value={user.password} onChange={handleInput}/>
                </ListItem>
                <Divider id="divider" />
                <ListItem id="btns-list-item">
                    <Button color="primary" variant="contained" onClick={login}>LOGIN</Button>
                    <Button color="primary" variant="contained" onClick={signUp}>SIGN UP</Button>
                </ListItem>
            </List>
        </form>
    )
    
}

export default Login