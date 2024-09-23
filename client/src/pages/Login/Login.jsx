import React, { useState } from "react";
import login_bg from "../../assets/login_bg.jpg";
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [info, setInfo] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setInfo({...info, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(info.email == "" || info.password == ""){
            toast.error('Please Enter all Fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{

            const {email , password } = info;

            const res = await fetch("https://foodsys.onrender.com/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const result = await res.json();
            console.log(result)
            const status = res.status;
            localStorage.setItem("token", result.token)
            localStorage.setItem("ID", result.id)

            if(status == 200){
                toast('✌️ Login Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate(`/`, {replace : true})
            }else{
                toast.error('Invalid Credentials', {
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
    
    return(
        <>
            <div className="app_container">
                <div className="left_container">
                    <img src={login_bg} alt="Loading..." className="bgImage"/>
                </div>

                <div className="right_container">
                    <div className="inner_container">
                        <p>Login Here</p>

                        <div className="inner_right_container">
                            <form method="post" className="form_container" onSubmit={handleSubmit}>

                                <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                autoComplete="off"
                                onChange={handleChange}
                                />

                                <input 
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                autoComplete="off"
                                onChange={handleChange}
                                />

                                <div className="redirect_blogger">
                                    <a href="/">Create An Account</a>
                                </div>
                                <div className="redirect_blogger">
                                    <a href="/update">Forgot Password</a>
                                </div>

                                <div className="login_btn">
                                    <button className="btn">Login</button>
                                </div>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login