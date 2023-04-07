import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './signup.scss'

const SignUp = () =>{

    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [mobileNumber,setMobileNumber]=useState('');
    const [newPassword,setNewpassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const [userNameFlag,setUserNameFlag]=useState(false);
    const [emailFlag,setEmailFlag]=useState(false); 
    const [mobileNumberFlag,setMobileNumberFlag]=useState(false); 
    const [newPasswordFlag,setNewPasswordFlag]=useState(false); 
    const [confirmPasswordFlag,setConfirmPasswordFlag]=useState(false); 

    const [emailErrorFlag,setEmailErrorFlag]=useState(false);
    const [mobileErrorFlag,setMobileErrorFlag]=useState(false);
    const [passwordErrorFlag,setPasswordErrorFlag]=useState(false);

    const navigate=useNavigate()

    const handleInputValue = (event) =>{
        if(event.target.name==='user-name'){
            setUserName(event.target.value)
            setUserNameFlag(true)
        }
        else if(event.target.name==='email'){
            setEmail(event.target.value)
            setEmailFlag(true)
            setEmailErrorFlag(false)
        }
        else if(event.target.name==='mobile'){
            setMobileNumber(event.target.value)
            setMobileNumberFlag(true)
            setMobileErrorFlag(false)
        }
        else if(event.target.name==='new-password'){
            setNewpassword(event.target.value)
            setNewPasswordFlag(true)
        }
        else{
            setConfirmPassword(event.target.value)
            setConfirmPasswordFlag(true)
            setPasswordErrorFlag(false)
        }
    }

    if(localStorage.getItem("bigbasket")==null){
        localStorage.setItem("bigbasket","[]");
    }

    const signUp = (event) =>{

        event.preventDefault();

        if(userName!==''){
            if(email!==''){
                if(mobileNumber!=='' && mobileNumber.toString().length===10){
                    if(newPassword!==''){
                        if(newPassword===confirmPassword){

                            var allDetails=JSON.parse(localStorage.getItem('bigbasket'));
                            var emailAuthendication=allDetails.some(value=>value.email===email)                            
                            if(!emailAuthendication){
                                allDetails.push({userName,email,mobileNumber,newPassword})
                                localStorage.setItem('bigbasket',JSON.stringify(allDetails))

                                setUserName('')
                                setEmail('')
                                setMobileNumber('')
                                setNewpassword('')
                                setConfirmPassword('')

                                setUserNameFlag(false)
                                setEmailFlag(false)
                                setMobileNumberFlag(false)
                                setNewPasswordFlag(false)
                                setConfirmPasswordFlag(false)

                                setEmailErrorFlag(false)

                                navigate('/')
                            }
                        }
                    }
                }
            }
        }

        if(mobileNumber!==''){
            if(mobileNumber.toString().length!==10){
                setMobileErrorFlag(true)
            }
        }
        
        if(newPassword!==''){
            if(newPassword!==confirmPassword){
                setPasswordErrorFlag(true)
            }
        }

        var allDetail=JSON.parse(localStorage.getItem('bigbasket'));
        var emailAuthendications=allDetail.some(value=>value.email===email)

        if(emailAuthendications){
            setEmailErrorFlag(true)
        }
        
        setUserNameFlag(true)
        setEmailFlag(true)
        setMobileNumberFlag(true)
        setNewPasswordFlag(true)
        setConfirmPasswordFlag(true)
    }

    return(
        <div className="signup-container">
            <div className="signup-content">
                <div className="signup-image">
                    <img src={require('../Asserts/images/bb_logo.png')} alt="no image"/>
                </div>
                <form>
                    <div>
                        <input type="text" name="user-name" placeholder="User Name" value={userName} onChange={(event)=>handleInputValue(event)}/>
                        {userNameFlag ? (userName==='' ? <p><i className="bi bi-star-fill"></i> User Name cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                    </div>
                    <div>
                        <input type="email" required name="email" placeholder="Email" value={email} onChange={(event)=>handleInputValue(event)}/>
                        {emailFlag ? (email==='' ? <p><i className="bi bi-star-fill"></i> Email cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                        {emailErrorFlag ? <p><i className="bi bi-star-fill"></i> Email already exist <i className="bi bi-star-fill"></i></p>:null}
                    </div>
                    <div>
                        <input type="number" name="mobile" placeholder="Mobile" value={mobileNumber} onChange={(event)=>handleInputValue(event)}/>
                        {mobileNumberFlag ? (mobileNumber==='' ? <p><i className="bi bi-star-fill"></i> Mobile number cannot be empty <i className="bi bi-star-fill"></i></p>:(mobileNumber.toString().length===10 ? null:<p>Enter a valid mobile number</p>)):null}
                        {mobileErrorFlag ? <p><i className="bi bi-star-fill"></i> Enter a valid mobile number <i className="bi bi-star-fill"></i></p>:null}
                    </div>
                    <div>
                        <input type="password" name="new-password" placeholder="New Password" value={newPassword} onChange={(event)=>handleInputValue(event)}/>
                        {newPasswordFlag ? (newPassword==='' ? <p><i className="bi bi-star-fill"></i> New password cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                    </div>
                    <div>
                        <input type="password" name="confirm-password" placeholder="Confirm password" value={confirmPassword} onChange={(event)=>handleInputValue(event)}/>
                        {confirmPasswordFlag ? (confirmPassword==='' ? <p><i className="bi bi-star-fill"></i> Confirm password cannot be empty <i className="bi bi-star-fill"></i></p>:null):null}
                        {passwordErrorFlag ? <p>Password does not match</p>:null}
                    </div>
                    <div>
                        <button onClick={(event)=>signUp(event)}>Signup</button>
                        <Link to={'/'}>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;