import React, { useState } from "react";
import './login.scss'
import { useDispatch } from "react-redux";
import { login } from "../slice";
import { Link } from "react-router-dom";

const Login = () =>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailFlag,setEmailFlag]=useState(false);
    const [passwordFlag,setPasswordFlag]=useState(false);
    const dispatch=useDispatch()

    const handleInputValue = (event) =>{
        
        if(event.target.name==='username'){
            setEmail(event.target.value)
            setEmailFlag(true)
        }
        else{
            setPassword(event.target.value)
            setPasswordFlag(true)
        }

    }

    const submit = (event) =>{

        event.preventDefault();
        var allDetails=JSON.parse(localStorage.getItem('bigbasket'));
        console.log('alldetails',allDetails);
        
        var result=allDetails.some(value=>value.email===email && value.newPassword===password);
        console.log('result',result);

        if(result){
            dispatch(login(true))
            console.log('hello');
        }

        setEmailFlag(true)
        setPasswordFlag(true)
    }

    return(
        <div className="container">
            <div className="content">
                <div className="login-image">
                    <img src={require('../Asserts/images/bb_logo_1.jpg')} alt="no image"/>
                </div>
                <form>
                    <div>
                        <input type={'text'} name="username" placeholder={'Email'} onChange={(event)=>handleInputValue(event)}></input>
                        {emailFlag ? (email==='' ? <p><i className="bi bi-star-fill"></i> Email cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                    </div>
                    <div>
                        <input type={'password'} name='password' placeholder={'password'} onChange={(event)=>handleInputValue(event)}></input>
                        {passwordFlag ? (password==='' ? <p><i className="bi bi-star-fill"></i> Password cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                    </div>
                    <div className="button">
                        <button onClick={(event)=>submit(event)}>Login</button>
                        <div>
                            <Link to={'/signup'} className="signup">Signup for Bigbasket</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login