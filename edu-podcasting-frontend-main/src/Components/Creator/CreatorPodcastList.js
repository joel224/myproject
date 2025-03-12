import React, { useState, useEffect } from "react";
import axiosInstance from "../../Baseurl";
import { FaPlus } from "react-icons/fa6";
import './creatorpodcastlist.css';
import { useNavigate } from "react-router-dom";

function CreatorPodcastList({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const navigate=useNavigate()

  const [creatorpodcast, setCreatorpodcast] = useState([]);
  useEffect(() => {
    var podcastEndPoint = data.role == 'creator' ? "/getAllPodcastByCreator" : "/getAllpodcast"
    axiosInstance
      .post(podcastEndPoint, {
        id: localStorage.getItem("creatorid"),
      })
      .then((response) => {
        console.log(response.data.data, "ajeena");
        setCreatorpodcast(response.data.data, "ajeena");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
    console.log(creatorpodcast, "ll");
  }, []);

  const gotoEpisode=(id)=>{
    navigate(`/creatorepisodadd/${id}`)
  }
  return (
    <div className="podcast_list_main">
      <div class="container ">
      <h5 className="text-dark">My podcasts</h5>
        <div class="row">
          {creatorpodcast.length ? (
            creatorpodcast.map((a) => {
              return (
                <div  className="card col-3" id="podcastlist_card">
                  <div class="podcastlist_card_img">
                    <img
                    src={data.url + a.coverimage.filename}
                    class="card-img-top"
                      id="adminclub"
                      alt="..."
                    />
                  </div>
                  <div class="podcastlist_card_content">
                    <h4 class="card-title mt-3 mb-2t">{a.podcastname}</h4>
                    <h6 class="card-text col">{a.creatorname}</h6>
                    <h6 class="card-text">{a.description}</h6>
                    <h6 class="card-text">{a.price}</h6>
                    {data.role === 'creator' ? '' : <button>Subscribe</button>}
                    {data.role === 'creator'?<button onClick={()=>gotoEpisode(a._id + ',' + a.podcastname)} className="episodebtn">Add Episode
                      <FaPlus  />
                    </button>:""}
                  </div>
                  <div>
                  <audio controls className="w-100">
                    <source src={a.audio ? data.url + a.audio.filename : ''} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                </div>
              );
            })
          ) : (
            <div className="no_data">
              <h1>No podcast found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorPodcastList;
