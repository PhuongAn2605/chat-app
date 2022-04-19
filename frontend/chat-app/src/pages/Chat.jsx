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
    const [currentUser, setCurrentUser] = useState(undefined);

    const navigate = useNavigate();
    useEffect(() => {
        async function setUser() {
            if(!localStorage.getItem("chat-app-user")){
                navigate('/login');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            }
        }
        setUser();
    },[]);
    useEffect(() => {
        async function setAvatar() {

            if(currentUser) {
                if(currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    console.log('data: ', data);
                    setContacts(data.data);
                }else {
                    navigate("/setAvatar");
                }
            }
        }
        setAvatar();
    }, [currentUser]);
    return <Container>
        <div className="container">
            <Contact contacts={contacts} currentUser={currentUser} />
        </div>
    </Container>

}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85wh;
        background-color: #000075;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;
        }
    }

`;

export default Chat;