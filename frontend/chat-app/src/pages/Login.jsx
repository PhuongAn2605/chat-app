import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import { loginRoute } from "../utils/APIRoutes";
import { useDispatch } from "react-redux";
import { fetchLoginStart, naviagteToChat } from "../actions/user";
import { useSelector } from "react-redux";
import { toastOptions } from "../utils/toast";
import isEmpty from "is-empty";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, user } = useSelector(state => state.user);

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if(!isEmpty(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))){
          console.log('test 1');
            navigate('/');
        }
    }, []);

    const handleSubmit = async (event) => {
      handleValidation();

        event.preventDefault();

        if (handleValidation()) {
            const { password, username } = values;
            dispatch(fetchLoginStart(username, password));
            navigate('/');

        }
        // dispatch(naviagteToChat(navigate));
  
    }
    useEffect(() => {
      if(!isEmpty(user)){
        navigate('/');
      }
    }, [user, navigate])

    const handleValidation = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error("Password is required!", toastOptions);
            return false;
        } else if (username === "") {
            toast.error("Email is required!", toastOptions);
            return false;

        }
        return true;
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    return <>
        <FormContainerLogin>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h1>chatee</h1>
                </div>
                <input type="text" placeholder="Username" name="username" min={3} onChange={(e) => handleChange(e)} />
                <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                <button type="submit">Log In</button>
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </FormContainerLogin>
        <ToastContainer />
    </>
}

const FormContainerLogin = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;