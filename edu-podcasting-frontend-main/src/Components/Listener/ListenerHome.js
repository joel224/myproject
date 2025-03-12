import React, { useEffect } from "react";
import LandingPage from "../../Pages/Listener/LandingPage";
import { useNavigate } from "react-router-dom";

function ListenerHome({props}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("listenerid") !== null) {
      navigate("/listenerhome");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <LandingPage data={props.role} />
    </div>
  );
}

export default ListenerHome;
