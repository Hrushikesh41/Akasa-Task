import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export const NewPassword = () => {
    const[password, setPassword] = useState();
    
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(password == undefined){
            toast.error('Please Enter Password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            const res = await fetch("https://foodsys.onrender.com/newpassword", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    password
                })
            });

            const result = await res.json();
            const status = res.status;
            console.log(result, status)

            if(status == 200){
                navigate("/login", {replace : true})
            }else{
                toast.error('Some Error Occurred', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    return (
        <>
            <div className="update">
                <div className="inner_div">
                    <h1>Enter New Password</h1>
                    <input
                        type='password'
                        placeholder="Enter Your Password"
                        autoComplete='off'
                        onChange={handleChange}
                    />

                    <button onClick={handleSubmit}>Submit</button>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default NewPassword