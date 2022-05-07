import isEmpty from "is-empty";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchAllUsersStart } from "../actions/user";
import Logo from "../assets/logo.png"

const Contact = ({ currentChat, handleChangeChat }) => {
  const { user, userList, loggedOut } = useSelector(state => state.user);
  const userData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const [currentUserName, setCurrentUserName] = useState(userData && userData.username);
    const [currentUserImage, setCurrentUserImage] = useState(userData && userData.avatarImage);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    let userListClone = null;

    console.log('userList: ', userList);
    console.log('user: ', user);
    const dispatch = useDispatch();

    useEffect(() => {
      if(!isEmpty(user) && !loggedOut){
        dispatch(fetchAllUsersStart(user._id));
      }else if(!isEmpty(userData) && !loggedOut){
        dispatch(fetchAllUsersStart(userData._id));
      }
    }, []);

    let filteredUserList;
    let targetIndex;

    useEffect(() => {
      if(!isEmpty(userList)){
        userListClone = [...userList];
        const targetedUser = userListClone.find(u => u.id === user.id);
        targetIndex = userListClone.indexOf(targetedUser);

        filteredUserList = userList.filter(u => u._id !== user._id);
        
      }

    }, [userList && userList]);

    console.log('userListClone: ', userListClone)
    
    useEffect(() => {
      setCurrentUserName(user && user.username);
      setCurrentUserImage(user && user.avatarImage);
    }, [user && user]);

    const handleChangeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      handleChangeChat(contact);
    }


    return <>
    {
        currentUserImage && currentUserName && userList && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>chatee</h3>
                        </div>
                        <div className="contacts">
                            {
                                userList.map((contact, index) => {
                                    return (
                                        <div key={contact._id}>
                                          { contact._id !== user._id && <div key={contact._id} className={`contact ${index === currentSelected ? "selected" : ""}`}  onClick={() => handleChangeCurrentChat(index, contact)}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                          </div>}
                                        </div>
                                        )
                                })
                            }
                        </div>
                        <div className="current-user" onClick={() => handleChangeCurrentChat(targetIndex, user)}>
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>You ({currentUserName})</h2>
                            </div>
                        </div>
                    </Container>
                )
    }
    </>
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem 2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;


export default Contact;