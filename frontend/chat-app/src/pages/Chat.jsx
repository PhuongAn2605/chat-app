import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allUsersRoute, registerRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersStart } from "../actions/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(fetchAllUsersStart());
    }, []);

    const { userList } = useSelector(state => state.user );

    useEffect(() => {
      setContacts(userList);
    },[userList]);

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
        }
      }, []);

      useEffect(async () => {
        if(currentUser) {
          if(currentUser.isAvatarImageSet) {
            dispatch(fetchAllUsersStart());
          } else {
            navigate('/setAvatar');
          }
        }
      });

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