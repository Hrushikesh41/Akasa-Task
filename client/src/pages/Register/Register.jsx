import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import bg1 from "../../assets/bg1.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        cpass: ""
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (details.name == "" || details.email == "" || details.password == "" || details.cpass == "") {
            toast.error('Please Enter all Fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (details.password.length < 8 || details.cpass.length < 8) {
            toast.error('Password Should Have atleast 6 Characters !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (details.password != details.cpass) {
            toast.error('Both Password Did not Match !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {

            const { name, email, password } = details;

            const res = await fetch("https://foodsys.onrender.com/customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            });

            const result = await res.json();

            if (result) {
                toast('✌️ Registration Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                navigate("/verify", {replace: true});
            } else {
                toast.error('Error Occurred !!!', {
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
            <ToastContainer />

            <div className="container">

                <div className="left_inner_container">

                    <div className="user_inputs">
                        <h1>Create an Account</h1>

                        <form method="post" className="form_inputs" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                autoComplete="off"
                            />

                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                                autoComplete="off"
                            />

                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter Your Password"
                                autoComplete="off"
                            />

                            <input
                                type="password"
                                name="cpass"
                                onChange={handleChange}
                                placeholder="Enter Your Password Again"
                                autoComplete="off"
                            />

                            <div className="redirect">
                                <a href="https://foodsys.netlify.app/login">Already a Customer</a>
                            </div>

                            <div className="submit_data">
                                <button type="submit">Register</button>

                            </div>
                        </form>

                    </div>


                </div>

                <div className="right_inner_container">
                    <img src={bg1} alt="Loading...." />
                </div>
            </div>
        </>
    )
}

export default Register;