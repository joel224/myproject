import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListenerWhishlist() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("listenerid") !== null) {
      navigate("/listenerWhishlist");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <h4>Subscribed Podcasts</h4>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-8"></div>
      </div>
    </div>
  );
}

export default ListenerWhishlist;
