import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import cart from "../../assets/cart.jpg"
import "./Navbar.css"

const Navbar = () => {
    const [auth, setAuth] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log(token);
        token ? setAuth(false) : setAuth(true)
    });

    const handleChange = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("ID");
        window.location.reload();
    }

    const handleClick = ()=>{
        navigate('/cart', {replace : true})
    }

    
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-end">
                <div class="container-fluid d-flex justify-content-end">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent" >
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='category'/>
                            <button class="btn btn-success" type="submit">Search</button>
                        
                        {auth ? <>
                            <div class="mx-2">
                            <button class="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#loginModal" onClick={navigate("/login", { replace: true })}>Login</button>
                            <button class="btn btn-info mx-2" data-bs-toggle="modal" data-bs-target="#signupModal" onClick={navigate("/register", { replace: true })}>Sign Up</button>
                        </div> </>
                        :
                        <>
                        <button class="btn btn-danger mx-2" onClick={handleChange}>Logout</button>
                        <img src={cart} className="image" onClick={handleClick}/>
                        </>
                        }
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar