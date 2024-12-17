import React from 'react';
import { useLocation } from 'react-router-dom';
// import Navbar from './Components/Navbar'; // Adjust the path as necessary
import Footer from './Footer/Footer'; // Adjust the path as necessary

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Paths where the Navbar should be visible
  // const pathsWithNavbar = ['/','/product']; // Add paths where you want the navbar to appear
  // Paths where the Footer should be visible
  const pathsWithFooter = ['/']; // Add paths where you want the footer to appear

  return (
    <div className="layout">
      {/* {pathsWithNavbar.includes(location.pathname) && <Navbar />} */}
      <main>{children}</main>
      {pathsWithFooter.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
