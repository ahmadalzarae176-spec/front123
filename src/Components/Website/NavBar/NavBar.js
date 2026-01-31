import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [active, setActive] = useState("");
  const [bounce, setBounce] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "materials", path: "/materials" },
    { name: "Courses", path: "/" },
    { name: "Student", path: "/" },
  ];

  useEffect(() => {
    const current = navLinks.find((link) => location.pathname.includes(link.path));
    if (current) setActive(current.name);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickLogo = () => navigate("/");

  const handleLinkClick = (name, path) => {
    setActive(name);
    setOpen(false);
    navigate(path);
  };

  const handleMenuClick = () => {
    setOpen(!open);
    setBounce(true);
    setTimeout(() => setBounce(false), 300);
  };

  const handleProfileClick = () => {
    if (isMobile) setProfileOpen(true);
    else navigate("/profile");
  };

  const linkStyle = (name) => ({
    cursor: "pointer",
    fontSize: "1rem",
    color: "#333",
    transition: "all 0.3s ease",
    padding: "8px 15px",
    borderRadius: "12px",
    background: active === name ? "linear-gradient(135deg, #a8d0ff, #4dabf7)" : "transparent",
  });

  const sidebarLinkStyle = (name) => ({
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#333",
    transition: "all 0.3s ease",
    padding: "8px 15px",
    borderRadius: "12px",
    background: active === name ? "linear-gradient(135deg, #a8d0ff, #4dabf7)" : "transparent",
  });

  const styles = {
    logo: { cursor: "pointer", fontSize: "1.8rem", fontWeight: "bold", color: "#1e40af" },
    navbar: { position: "fixed", top: 0, left: 0, width: "100%", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 1000 },
    container: { maxWidth: "1200px", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px" },
    navLinks: { listStyle: "none", display: "flex", gap: "15px" },
    menuIcon: { cursor: "pointer", fontSize: "1.8rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.4s ease, background 0.3s, box-shadow 0.3s", transform: open ? "rotate(90deg) scale(1.2)" : bounce ? "scale(1.3)" : "scale(1)", background: hoverIcon ? "linear-gradient(135deg, #c0dbff, #74b9ff)" : "transparent", borderRadius: "50%", padding: "5px", boxShadow: hoverIcon ? "0 4px 12px rgba(0,0,0,0.25)" : "0 2px 6px rgba(0,0,0,0.1)" },
    sidebar: { position: "fixed", top: 0, left: open ? 0 : "-100%", height: "100vh", width: "70%", background: "white", boxShadow: "2px 0 10px rgba(0,0,0,0.2)", transition: "left 0.3s ease-in-out", paddingTop: "80px", zIndex: 1100 },
    sidebarUl: { listStyle: "none", display: "flex", flexDirection: "column", gap: "25px", paddingLeft: "30px" },
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", opacity: open ? 1 : 0, transition: "opacity 0.3s", pointerEvents: open ? "auto" : "none", zIndex: 1000 },
    profileSidebar: { position: "fixed", top: 0, right: profileOpen ? 0 : "-100%", height: "100vh", width: "70%", background: "white", boxShadow: "-2px 0 10px rgba(0,0,0,0.2)", transition: "right 0.3s ease-in-out", paddingTop: "80px", zIndex: 1200 },
    profileOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", opacity: profileOpen ? 1 : 0, transition: "opacity 0.3s", pointerEvents: profileOpen ? "auto" : "none", zIndex: 1100 },
    profileIconMobile: { cursor: "pointer", fontSize: "1.6rem", marginLeft: "15px" },
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <h1 style={styles.logo} onClick={handleClickLogo}>معهد أولي النهى التعليمي</h1>

          {!isMobile && (
            <ul style={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.name} style={linkStyle(link.name)} onClick={() => handleLinkClick(link.name, link.path)}>
                  {link.name}
                </li>
              ))}
              <li style={linkStyle("Profile")} onClick={handleProfileClick}>👤 Profile</li>
            </ul>
          )}

          {isMobile && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={handleMenuClick}
                style={styles.menuIcon}
                onMouseEnter={() => setHoverIcon(true)}
                onMouseLeave={() => setHoverIcon(false)}
              >
                {open ? "✖" : "☰"}
              </div>
              <div style={styles.profileIconMobile} onClick={handleProfileClick}>👤</div>
            </div>
          )}
        </div>
      </nav>

      {isMobile && <div style={styles.overlay} onClick={() => setOpen(false)}></div>}
      {isMobile && (
        <div style={styles.sidebar}>
          <ul style={styles.sidebarUl}>
            {navLinks.map((link) => (
              <li key={link.name} style={sidebarLinkStyle(link.name)} onClick={() => handleLinkClick(link.name, link.path)}>
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isMobile && (
        <>
          <div style={styles.profileOverlay} onClick={() => setProfileOpen(false)}></div>
          <div style={styles.profileSidebar}>
            <ProfileSidebarContent />
          </div>
        </>
      )}
    </>
  );
}

// مكون داخلي لعرض المحتوى داخل sidebar Profile على الموبايل
function ProfileSidebarContent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("No API");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch(() => {
        setUserData({
          name: "لا يوجد اسم",
          email: "انت غير مسجل",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          courses: [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>جاري تحميل البيانات...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Cairo, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img src={userData.avatar} alt="profile" style={{ width: "100px", borderRadius: "50%" }} />
        <div>
          <h3>{userData.name}</h3>
          <p>{userData.email}</p>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>المواد المسجلة:</h4>
        {userData.courses.length === 0 ? (
          <p>لا يوجد</p>
        ) : (
          <ul>
            {userData.courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}














/*import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./navBar.css";
import { Link } from "react-router-dom";
//import { Axios } from "../../../Api/axios";
//import { CAT } from "../../../Api/Api";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);}

   const [show, setShow] = useState(false);

  

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);
 */