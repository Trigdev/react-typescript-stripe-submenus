import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

export interface INavbar {}

const Navbar: React.FC<INavbar> = (): React.ReactElement => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

  const displaySubmenu = (e: any) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    openSubmenu(page, { center, bottom });
  };

  const handleSubmenu = (e: any) => {
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };

  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-headers">
          <img src={logo} className="nav-logo" alt="stripe" />
          <button
            type="button"
            className="btn toggle-btn"
            onClick={openSidebar}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <button
              type="button"
              className="link-btn"
              onMouseOver={displaySubmenu}
            >
              products
            </button>
          </li>
          <li>
            <button
              type="button"
              className="link-btn"
              onMouseOver={displaySubmenu}
            >
              developers
            </button>
          </li>
          <li>
            <button
              type="button"
              className="link-btn"
              onMouseOver={displaySubmenu}
            >
              company
            </button>
          </li>
        </ul>
        <button type="button" className="button-70">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
