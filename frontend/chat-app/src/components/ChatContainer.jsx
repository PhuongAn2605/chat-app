import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { fetchAllMessagesStart, fetchSendMessageStart, toggleVideoDialog } from "../actions/message";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Messages";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VideoCallDialog from "./VideoCallDialog";
import Peer from "simple-peer";
import PhoneIcon from "@material-ui/icons/Phone";
import { IconButton, TextField } from '@mui/material';




const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [openVideo, setOpenVideo] = useState(false);

  const scrollRef = useRef();
  const { messages, openVideoDialog } = useSelector(state => state.message);

  const dispatch = useDispatch();

  useEffect(async () => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    dispatch(fetchAllMessagesStart({
      from: data._id,
      to: currentChat._id
    }));
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if(currentChat) {
        await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
      }
    };
    getCurrentChat();
    setCurrentMessages(messages);
  }, [currentChat, messages]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    dispatch(fetchSendMessageStart({
      from: data._id,
      to: currentChat._id,
      message: msg
    }));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    const msgs = [...currentMessages];
    msgs.push({
      fromSelf: true,
      message: msg
    });
    setCurrentMessages(msgs);
  }

  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-recieve", msg => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  },[]);

  useEffect(() => {
    arrivalMessage && setCurrentMessages(prev => [...prev, arrivalMessage]);
  },[arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[currentMessages]);

  const handleClose = () => {
    dispatch(toggleVideoDialog(false));
  }


  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
            alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat._id === currentUser._id ? 'You' : currentChat.username}</h3>
          </div>
        </div>
        <div className="call-functions">
          <VideoCameraBackIcon color='info' fontSize="large" onClick={() => dispatch(toggleVideoDialog(true))} />
        </div>
      </div>
      <div className="chat-messages">
        {
          currentMessages && currentMessages.map(message => {
            return (
              <div ref={scrollRef} key={uuidv4()} >
                <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      <VideoCallDialog 
        openVideo={openVideoDialog}
        handleClose={handleClose}
        currentUser={currentUser}
        currentChat={currentChat}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 2rem;
    /* margin-top: 2rem;
    background-color: #aaa; */
    /* margin-top: 14rem; */
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 3rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #fff;
        }
      }
      .call-functions {
        /* display: flex; */
        /* justify-content: flex-end !important;
        align-items: flex-end; */
        /* margin-left: auto; */
        display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 3rem;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
        justify-content: flex-end;
        .content {
          background-color: #4f04ff21;
        }
      }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`

export default ChatContainer;