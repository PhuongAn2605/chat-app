import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png"

const Contact = ({ contacts, currentUser }) => {
        
    console.log('currentUser: ', currentUser);
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);


    useEffect(() => {
        if(currentUser) {
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.image);
        }
    }, [currentUser]);

    const changeCurrentTask = (index, contact) => {

    }

    return <>
    {
        currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>chatee</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div key={index} className={`contact ${index === currentSelected ? "selected" : ""}`}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                        )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h1>{currentUserName}</h1>
                            </div>
                        </div>
                    </Container>
                )
    }
    </>
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        dispaly: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
    }

`

export default Contact;