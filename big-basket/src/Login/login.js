import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login,users } from "../slice";
import { Link } from "react-router-dom";
import { ref,onValue } from "firebase/database";
import { db } from "../firebase";
import './login.scss'

const Login = () =>{

    const dispatch=useDispatch()
    const state=useSelector(({products})=>products);
    console.log('state',state.users);

    useEffect(()=>{

        const getValues = async () =>{
            await onValue(ref(db,'users'),(snapShot)=>{
                const data=snapShot.val();
                if(data){
                    dispatch(users([...Object.values(data)]))
                }
                else{
                    dispatch(users([]))
                }
            })
        }

        getValues()
    },[])

    const [data,setData]=useState({
        email:'',
        password:''
    })

    const [emptyError,setEmptyError]=useState({
        email:false,
        password:false
    })

    const [dataValidation,setDataValidation]=useState({
        email:false,
        password:false
    })

    const handleInputValue = (event) =>{

        if(event.target.name==='user-name'){
            setData({...data,email:event.target.value})
            setEmptyError({...emptyError,email:true})
        }
        else{
            setData({...data,password:event.target.value})
            setEmptyError({...emptyError,password:true})
        }

        setDataValidation({email:false,password:false})

    }

    const submit = (event) =>{

        event.preventDefault();

        setEmptyError({
            email:true,
            password:true
        })

        const find=state.users.some(value=>value.email===data.email && value.password===data.password)

        if(find){
            dispatch(login(true))
        }

        state.users.forEach(value=>{
            if(data.email!=='' && value.email===data.email){
                if(data.password!=='' && value.password===data.password){
                    setDataValidation({email:false,password:false})
                }
                else{
                    setDataValidation({email:false,password:true})
                }
            }
            else{
                setDataValidation({email:true,password:false})
            }
        })
    }
    

    return(
        <div className="container">
            <div className="content">
                <div className="login-image">
                    <img src={require('../Asserts/images/bb_logo_1.jpg')} alt="no image"/>
                </div>
                <form>
                    <div>
                        <input type={'text'} name="user-name" placeholder={'Email'} value={data.email} onChange={(event)=>handleInputValue(event)}></input>
                        {emptyError.email ? (data.email==='' ? <p><i className="bi bi-star-fill"></i> Email cannot be empty <i className="bi bi-star-fill"></i></p>:(dataValidation.email ? <p><i className="bi bi-star-fill"></i> This email not have an account <i className="bi bi-star-fill"></i></p>:null)):null}
                    </div>
                    <div>
                        <input type={'password'} name='password' placeholder={'password'} value={data.password} onChange={(event)=>handleInputValue(event)}></input>
                        {emptyError.password ? (data.password==='' ? <p><i className="bi bi-star-fill"></i> Password cannot be empty <i className="bi bi-star-fill"></i></p>:(dataValidation.password ? <p><i className="bi bi-star-fill"></i> Password does not match <i className="bi bi-star-fill"></i></p>:null)):null}
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