// src/Navbar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../userSlice'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <a className="new" href="#">FRESH <span>EXPRESS</span></a>
        </div>
        <div className="nav_menu_btn">
          <span><i className="ri-menu-line"></i></span>
        </div>
      </div>
      <ul className="nav__links">
        <li><a href="/">Home</a></li>
        <li><Link to="/product">Products</Link></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="nav__btns">
        {isAuthenticated ? (
          <>
            {/* <span className="user-email">{email}</span> */}
            <button className="btn sign__out" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn sign__up">Sign Up</Link>
            <Link to="/login" className="btn sign__in">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
