import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Menu } from "../../context/MenuContext";
import { WindowSize } from "../../context/WindowContext";
import "./bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "./NavLink";

export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  const isOpen = menu.isOpen;

  // User
  const [user, setUser] = useState("");
  const Navigate = useNavigate();

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3 rounded shadow-sm"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map((link, key) => {
          if (link.role && !link.role.includes(user.role)) return null;
          return (
            <NavLink
              key={key}
              to={link.path}
              className="d-flex align-item-center gap-2 side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
                }}
                icon={link.icon}
              />
              <p
                className="m-0"
                style={{
                  display: isOpen ? "block" : "none",
                }}
              >
                {link.name}
              </p>
            </NavLink>
          );
        })}
      </div>
    </>
  );
}
