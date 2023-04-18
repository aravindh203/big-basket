import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { uid } from "uid";
import { useDispatch,useSelector } from "react-redux";
import { set,ref,onValue } from "firebase/database";
import { users,login } from "../slice";
import './signup.scss'


const SignUp = () =>{

    const dispatch=useDispatch()
    const state=useSelector(({products})=>products);

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
        userName:'',
        email:'',
        mobileNumber:'',
        newPassword:'',
        confirmPassword:''
    })

    const [emptyError,setEmptyError]=useState({
        userName:false,
        email:false,
        mobileNumber:false,
        newPassword:false,
        confirmPassword:false
    })

    const [dataValidation,setDataValidation]=useState({
        emailExist:false,
        emailValue:false,
        mobileNumber:false,
        confirmPassword:false
    })

    const handleInputValue = (event) => {
        if(event.target.name==='user-name'){
            setData({...data,userName:event.target.value})
            setEmptyError({...emptyError,userName:true})
        }
        else if(event.target.name==='email'){
            setData({...data,email:event.target.value})
            setEmptyError({...emptyError,email:true})
        }
        else if(event.target.name==='mobile'){
            setData({...data,mobileNumber:event.target.value})
            setEmptyError({...emptyError,mobileNumber:true})
            setDataValidation({...dataValidation,mobileNumber:false})
        }
        else if(event.target.name==='new-password'){
            setData({...data,newPassword:event.target.value})
            setEmptyError({...emptyError,newPassword:true})
        }
        else{
            setData({...data,confirmPassword:event.target.value})
            setEmptyError({...emptyError,confirmPassword:true})
            setDataValidation({...dataValidation,confirmPassword:false})
        }
    }

    const signUp = (event) =>{

        event.preventDefault();

        setEmptyError({
            userName:true,
            email:true,
            mobileNumber:true,
            newPassword:true,
            confirmPassword:true
        })

        var emailExistValidation;
        var find=state.users.some(value=>value.email===data.email);
        if(find){
            emailExistValidation={...dataValidation,emailExist:true}
        }   
        else{
            emailExistValidation={...dataValidation,emailExist:false}
        }

        var emailFormat=/^([A-Za-z0-9_.])+\@([g][m][a][i][l])+\.([c][o][m])+$/;
        var emailValueValidation;
        if(emailFormat.test(data.email)){
            emailValueValidation={...emailExistValidation,emailValue:false}
        }
        else{
            emailValueValidation={...emailExistValidation,emailValue:true}
        }

        var passwordValidation;
        if(data.newPassword!==data.confirmPassword){
            passwordValidation={...emailValueValidation,confirmPassword:true}
        }
        else{
            passwordValidation={...emailValueValidation,confirmPassword:false}        
        }

        var mobileValidation;
        if(data.mobileNumber.length!==10){
            mobileValidation={...passwordValidation,mobileNumber:true}
        }
        else{
            mobileValidation={...passwordValidation,mobileNumber:false}
        }

        const validation={...mobileValidation}

        setDataValidation(validation)

        if(data.userName!=='' &&  data.email!=='' && data.mobileNumber!=='' &&  data.newPassword!=='' && data.confirmPassword!==''){
            if(data.mobileNumber.length==10 && data.newPassword===data.confirmPassword){
                const id=uid()
                const newData={
                    id:id,
                    userName:data.userName,
                    email:data.email,
                    mobileNumber:data.mobileNumber,
                    password:data.confirmPassword
                }
                const setId=uid()
                set(ref(db,'users/'+setId),{...newData})

                setData({
                    userName:'',
                    email:'',
                    mobileNumber:'',
                    newPassword:'',
                    confirmPassword:''
                })

                setEmptyError({
                    userName:false,
                    email:false,
                    mobileNumber:false,
                    newPassword:false,
                    confirmPassword:false
                })
                    
                dispatch(login(true))
            }
        }
    }

    


    return(
        <div className="signup-container">
            <div className="signup-content">
                <div className="signup-image">
                    <img src={require('../Asserts/images/bb_logo.png')} alt="no image"/>
                </div>
                <form>
                    <div>
                        <input type="text" name="user-name" placeholder="User Name" value={data.name} onChange={(event)=>handleInputValue(event)}/>
                        {emptyError.userName ? (data.userName==='' ? <p><i className="bi bi-star-fill"></i> User Name cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Email" value={data.email} onChange={(event)=>handleInputValue(event)}/>
                        {emptyError.email ? (data.email==='' ? <p><i className="bi bi-star-fill"></i> Email cannot be empty <i className="bi bi-star-fill"></i></p>:(dataValidation.emailValue ? <p><i className="bi bi-star-fill"></i> Enter a valid email <i className="bi bi-star-fill"></i></p>:(dataValidation.emailExist && <p><i className="bi bi-star-fill"></i> Email already exsist <i className="bi bi-star-fill"></i></p>)  )):null}
                    </div>
                    <div>
                        <input type="number" name="mobile" placeholder="Mobile" value={data.mobileNumber} onChange={(event)=>handleInputValue(event)}/>
                        {emptyError.mobileNumber ? (data.mobileNumber==='' ? <p><i className="bi bi-star-fill"></i> Mobile cannot be empty <i className="bi bi-star-fill"></i></p>:(dataValidation.mobileNumber ? <p><i className="bi bi-star-fill"></i> Enter a valid mobile number <i className="bi bi-star-fill"></i></p>:null)):null}
                    </div>
                    <div>
                        <input type="password" name="new-password" placeholder="New Password" value={data.newPassword} onChange={(event)=>handleInputValue(event)}/>
                        {emptyError.newPassword ? (data.newPassword==='' ? <p><i className="bi bi-star-fill"></i> New password cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                    </div>
                    <div>
                        <input type="password" name="confirm-password" placeholder="Confirm password" value={data.confirmPassword} onChange={(event)=>handleInputValue(event)}/>
                        {emptyError.confirmPassword ? (data.confirmPassword==='' ? <p><i className="bi bi-star-fill"></i> Confirm password  cannot be empty <i className="bi bi-star-fill"></i></p>:(dataValidation.confirmPassword ? <p><i className="bi bi-star-fill"></i> password does not match <i className="bi bi-star-fill"></i></p>:null)):null}
                    </div>
                    <div>
                        <button onClick={(event)=>{signUp(event)}}>Signup</button>
                        <Link to={'/'}>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;