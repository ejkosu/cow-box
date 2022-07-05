import { useState } from 'react';
import { NavLink } from 'react-router-dom'

function Navbar() {
    const [showBurger, setShowBurger] = useState(false);

    return (
      <div id="navbar" className="navbar is-white-bis">
        <div className="container">
          <div className="navbar-brand">
            {/* LOGO */}
            <div className="navbar-item">
              <img id="nav-logo" src="/src/images/logo.png" />
            </div>

            {/* TITLE */}
            <div
              id="nav-title"
              className="navbar-item is-size-2 is-size-4-mobile is-unselectable"
            >
              Cow-Box
            </div>

            {/* BURGER MENU */}
            <a
              role="button"
              className={`navbar-burger ${showBurger ? 'is-active' : ''}`}
              onClick={() => setShowBurger(!showBurger)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          {/* LINKS */}
          <div className={`navbar-menu ${showBurger ? 'is-active' : ''}`}>
            <div className="navbar-end is-size-5">
              <div className="navbar-item is-size-5">
                <NavLink to="/">
                  Home
                </NavLink>
              </div>
              <div className="navbar-item is-size-5">
                <NavLink to="/about">
                  About
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Navbar
  