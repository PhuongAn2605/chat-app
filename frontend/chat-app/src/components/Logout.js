import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { fetchLogoutStart } from '../actions/user';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);

  const handleLogout = async () => {
    setIsLoggedOut(true);
    const userId = userData && await JSON.parse(userData)._id;
    dispatch(fetchLogoutStart(userId));
  }

  useEffect(() => {
    if(isLoggedOut){
      console.log('test 2')
      navigate('/login');
    }
  }, [isLoggedOut]);

  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>

  )

}

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  margin-left: auto;
  svg {
    font-size: 1.5rem;
    color: #ebe7ff;
  }
`

export default Logout;