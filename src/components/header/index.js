import React from 'react';

import {
  FaCircle,
  FaHome,
  FaPowerOff,
  FaSignInAlt,
  FaUser,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav } from './styled';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  function handleLogout(e) {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  }
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/user">
        <FaSignInAlt size={24} />
      </Link>

      {isLoggedIn ? (
        // eslint-disable-next-line react/jsx-no-bind
        <Link to="/logout" onClick={handleLogout}>
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaUser size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66FF33" />}
    </Nav>
  );
}
