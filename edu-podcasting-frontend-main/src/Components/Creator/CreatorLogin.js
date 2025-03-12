import React, { useState, useEffect } from "react";
import "../Listener/listenerlogin.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import { toast } from "react-toastify";
import { BsArrowClockwise } from "react-icons/bs";

function CreatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      document.getElementById("alertuser").innerHTML =
        "Please enter a valid email";
      return;
    }
    if (password === "") {
      document.getElementById("alertuser").innerHTML = "password is empty";
      return;
    }
    try {
      const result = await axiosInstance.post("/creatorlogin", {
        email,
        password,
      });
      if (result.data.message) {
        if (userCaptchaInput === captchaText) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("creatorid", result.data.id);
          localStorage.setItem("creatorname", result.data.creatorname);
          alert(result.data.message);
          console.log(result.data.id);

          navigate("/creatorhome");
        } else {
          document.getElementById("alertuser").innerHTML =
            "Invalid CAPTCHA. Please enter the correct text.";
        }
      }
    } catch (err) {
      console.log("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        document.getElementById("alertuser").innerHTML =
          err.response.data.message;
      } else {
        document.getElementById("alertuser").innerHTML =
          "An error occurred. Please try again.";
      }
    }
  };
  const forgot = () => {
    navigate("/creator_forgotpassword");
  };
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleCaptchaInputChange = (e) => {
    setUserCaptchaInput(e.target.value);
  };
  const handleReset = () => {
    setEmail("");
    setPassword("");
    setUserCaptchaInput("");
    generateCaptcha();
  };

  useEffect(() => {
    generateCaptcha();
  }, []);
  return (
    <div>
      <div className="listenerlogin_main">
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <h6 className="pt-5 mt-2 text-center">Login</h6>
            <div className="listenerlogin_form">
              <form type="Submit" onSubmit={handleLogin} onReset={handleReset}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="listener_forgot-password" onClick={forgot}>
                    forgot password ?
                  </label>
                </Form.Group>
                <div className="col-6 listenerCaptcha mt-5 mb-3">
                  <div class="captchaborder mt-3">
                    <div class="card-body club_login_captcha">
                      <h5 class="card-title">{captchaText}</h5>
                      <button
                        type="button"
                        id="refreshbutton"
                        className="btn btn-primary"
                        onClick={generateCaptcha}
                      >
                        <BsArrowClockwise />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="club_login_inputs mt-4">
                  <input
                    type="text"
                    placeholder="Enter the Captcha"
                    className="form-control mb-4"
                    value={userCaptchaInput}
                    onChange={handleCaptchaInputChange}
                  />
                </div>
                <div id="alertuser"></div>
                <div>
                  <button type="submit" className="listenerloginbtn mb-2 p-1 ">
                    Log in
                  </button>{" "}
                </div>
                <div>
                  <button
                    type="reset"
                    className="listenercancelbtn p-1 mb-5"
                    variant="secondary"
                  >
                    Cancel
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorLogin;
