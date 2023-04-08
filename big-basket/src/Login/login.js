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

    const [emailErrorFlag,setEmailErrorFlag]=useState(false);
    const [passwordErrorFlag,setPasswordErrorFlag]=useState(false);
    console.log('emailErrorFlag',emailErrorFlag,'passwordErrorFlag',passwordErrorFlag);

    
    const dispatch=useDispatch()

    const handleInputValue = (event) =>{
        
        if(event.target.name==='username'){
            setEmail(event.target.value)
            setEmailFlag(true)
            setEmailErrorFlag(false)
        }
        else{
            setPassword(event.target.value)
            setPasswordFlag(true)
            setPasswordErrorFlag(false)
        }
    }

    const submit = (event) =>{

        event.preventDefault();
        var allDetails=JSON.parse(localStorage.getItem('bigbasket'));
        var result=[...allDetails].some(value=>value.email===email && value.newPassword===password);

        if(result){
            dispatch(login(true))
        }

        
        if(email!==''){
            var detail=allDetails.filter(value=>value.email===email);
            
            if(detail.length){
                if(detail[0].email===email){
                    setEmailErrorFlag(false)
                    if(password!==''){
                        if(detail[0].newPassword===password){
                            setPasswordErrorFlag(false)
                        }
                        else{
                            setPasswordErrorFlag(true)
                        }
                    }
                }
                else{
                    setEmailErrorFlag(true)
                }
            }
            else{
                setEmailErrorFlag(true)
            }
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
                        {emailErrorFlag ? <p><i className="bi bi-star-fill"></i> This email is not have an acoount <i className="bi bi-star-fill"></i></p>:null}
                    </div>
                    <div>
                        <input type={'password'} name='password' placeholder={'password'} onChange={(event)=>handleInputValue(event)}></input>
                        {passwordFlag ? (password==='' ? <p><i className="bi bi-star-fill"></i> Password cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                        {passwordErrorFlag ? <p><i className="bi bi-star-fill"></i> Password was incorrect <i className="bi bi-star-fill"></i></p>:null}
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