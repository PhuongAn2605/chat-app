import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allUsersRoute, host, registerRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersStart } from "../actions/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import isEmpty from "is-empty";
import Logout from "../components/Logout";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from 'socket.io-client';
import VideoCallDialog from "../components/VideoCallDialog";

const Chat = () => {
    const socket = useRef();
    const [contacts, setContacts] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // useEffect(() => {
    //   dispatch(fetchAllUsersStart());
    // }, []);

    const { userList } = useSelector(state => state.user );
    const { user } = useSelector(state => state.user);
    const { loggedOut } = useSelector(state => state.user);
    const [currentChat, setCurrentChat] = useState(null);

    const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY) && JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

    // useEffect(() => {
    //   setCurrentUser(user);
    // },[user])


    // useEffect(() => {
    //   setContacts(userList);
    // },[userList]);
    useEffect(() => {
      if(loggedOut){
        navigate('/');
      }
    }, [loggedOut]);

    useEffect(() => {
        if (isEmpty(userData)) {
          navigate("/login");
        } else {
          setCurrentUser(userData);
          if(userData.isAvatarImageSet && !loggedOut) {
            dispatch(fetchAllUsersStart(userData._id));
          } else {
            navigate('/setAvatar');
          }
      }
    }, []);

    useEffect(() => {
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    },[currentUser]);

    const handleChangeChat = (chat) => {
      setCurrentChat(chat);
    }

      // useEffect(() => {
      //   if(currentUser) {
      //     if(currentUser.isAvatarImageSet || user.isAvatarImageSet) {
      //       dispatch(fetchAllUsersStart());
      //     } else {
      //       navigate('/setAvatar');
      //     }
      //   }
      // }, [currentUser, user]);

    return <Container>
        <div className="container">
            <Contact currentChat={currentChat} handleChangeChat={handleChangeChat} />
            <div className="left-items">
              <Logout />
              { isEmpty(currentChat) ? <Welcome currentUser={!isEmpty(user) ? user : userData} />
              : <ChatContainer currentChat={currentChat} currentUser={!isEmpty(user) ? user : userData} socket={socket} /> }
            </div>
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
    .left-items {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

`;

export default Chat;