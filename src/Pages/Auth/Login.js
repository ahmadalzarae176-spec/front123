import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../Api/Api";
import LoadingSubmit from "../../Components/Website/Landing/Landing";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import createPlugin from "tailwindcss/plugin";

export default function Login() {
  //States
  const [form, setform] = useState({
    name: "",
    code: "",
  });
  const navigate = useNavigate();
  // Err
  const [err, setErr] = useState("");

  // Ref
  const focus = useRef("");

  //Loading

  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  //    Handle Form Change
  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  //  Handel Focus
  useEffect(() => {
    focus.current.focus();
  },[])

  //  Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        name: form.name,
        code: form.code,
      });
      console.log("Ahmad");
      setLoading(false);
      const token = res.data.token;
      //const role = res.data.user.role;
     // const go = role === "1995" ? "users" : "writer";
      cookie.set("rasheed", token);
      window.location.pathname = `/`;
     // window.location.pathname = `/dashboard/${go}`;
    } catch (err) {
  console.log(err);
  setLoading(false);

  if (err.response) {
    // السيرفر ردّ
    if (err.response.status === 401) {
      setErr("Wrong Name Or code");
    } else {
      setErr("Internal Server Error");
    }
  } else {
    // ما في response (CORS / السيرفر طافي / URL غلط)
    setErr("Server not responding, try again later");
  }
}
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form onSubmit={handleSubmit} className="form">
            <div className="custom-form">
              <h1 className="mb-5">Login Now</h1>
              <Form.Label>Name:</Form.Label>
              <Form.Group className="form-custom">
                <Form.Control
                  ref={focus}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  placeholder="Enter Your Name..."
                  required
                />
                
              </Form.Group>
              <br></br>
              <Form.Label>Code:</Form.Label>
              <Form.Group className="form-custom">
                <Form.Control
                  type="code"
                  name="code"
                  onChange={handleChange}
                  value={form.code}
                  placeholder="Enter Your code..."
                  minLength="6"
                  required
                />
                
              </Form.Group><br></br>
              <button className="btn btn-primary">Login</button>
              {/*<div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://Google-lo.jpg"
                      /*  alt="sign in with google" *//*
                    />
                  </div>
                  <p className="btn-text">
                    <b>sign in with google</b>
                  </p>
                </a>
              </div>*/}
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}










































/*import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import "../Auth/Auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({
    name: "",
    password: "",
  });
  

  const passwordRef = useRef(null);

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  function toggleShowPassword() {
    setShowPassword((s) => !s);
  }

  return (
    <div className="container">
      <div className="row" style={{ height: "100vh" }}>
        <Form className="form">
          <div className="login-page">
            <div className="custom-form">
              <h1 className="mb-5">Login Now</h1>

              {/* Name *//*}
              <div className="input-group password-group">
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  required
                  className="gradient-border-input"
                  placeholder=" " // مهم للـ floating label
                />
                <label htmlFor="name" className="floating-label">
                  Enter Your Name
                </label>
              </div>

              {/* Password *//*}
              <div className="input-group password-group">
                <Form.Control
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  minLength="6"
                  required
                  className="gradient-border-input"
                  placeholder=" " // مهم
                />

                <label htmlFor="password" className="floating-label">
                  Enter Your Code
                </label>

                {/* زر العين *//*}
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <button className="login-submit">Login</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}*/
