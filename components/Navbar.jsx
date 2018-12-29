import React from 'react';
import NavBrand from '../components/NavBrand';

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavBrand />
      </div>
    </nav>
  );
};

export default Navbar;
