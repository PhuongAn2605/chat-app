import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { fetchSendMessageStart } from '../actions/message';

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const handleShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  }

  const sendChat = (event) => {
    event.preventDefault();
    // dispatch(fetchSendMessageStart({
    //   from:  
    // }))
    if(!isEmpty(msg)){
      handleSendMsg(msg);
      setMsg('');
    }
  }

  return <Container>
    <div className="button-container">
      <div className="emoji">
        <BsEmojiSmileFill onClick={handleShowEmojiPicker} />
        { showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
    </div>
    <form className='input-container' onSubmit={(e)=> sendChat(e)}>
      <input type="text" placeholder='Type your message here' value={msg} onChange={e => setMsg(e.target.value)} />
      <button className="submit">
        <IoMdSend />
      </button>
    </form>
  </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  position: absolute;
  bottom: 5rem;
  width: 50%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .emoji-group:before {
          background-color: #080420;
        } 
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #fff;
      border: none;
      padding-left: 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 1.2rem;
      &::selection {
        background-color:#9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9186f3;
      border: none;
      svg {
        font-size: 2rem;
        color: #fff;
      }
    }
  }

`
export default ChatInput;