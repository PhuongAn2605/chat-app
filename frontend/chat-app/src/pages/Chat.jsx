import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { allUsersRoute, registerRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";

const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    // useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentUser(
            JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }

    // useEffect(async () => {
    // if (currentUser) {
    //     const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    //     setContacts(data.data);
    // }
    //   }, [currentUser]);

    return <Container>
        <div className="container">
            {console.log('3')}
            <Contact contacts={contacts} currentUser={currentUser} />
        </div>
    </Container>

}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;
        }
    }

`;

export default Chat;