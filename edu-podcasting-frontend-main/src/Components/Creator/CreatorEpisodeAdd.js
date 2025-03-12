import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axiosInstance from "../../Baseurl";
import './creator.css';

function CreatorEpisodeAdd() {
  const navigate=useNavigate()
  const { id } = useParams();
  var podcastInfo = id.split(',')

  const [episode, setEpisode] = useState({
    episodeTitle: "",
    episodeCount : "",
    podcastId: podcastInfo[0],
    file: ""
  });

  const handleInputChnage = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    setEpisode({
      ...episode,
      [e.target.name]:
        e.target.name === "file"
          ? e.target.files
            ? e.target.files[0]
            : null
          : e.target.value,
    });
    // console.log(CreatorPodcast);
  };

  useEffect(() => {
    if (localStorage.getItem("creatorid") == null) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in episode) {
      if( key != "file"){
        data.append(key, episode[key]);
      }
    }
    console.log(data.get('image'),"data");
    data.append('creatorname',localStorage.getItem("creatorname") );
    data.append('files',episode.file);
    data.append('creatorId',localStorage.getItem('creatorid'));
    
    axiosInstance
      .post("/uploadepisode", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response, "y");
        alert(response.data.msg);
        navigate('/creatorprofile')
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        alert("can't created")
      });
  }
  const handleCancel=()=>{
    navigate("/creatorprofile")
  }
  return (
    <div className="podcast_upload">
      <div className="container">
        <h5 className="text-center mb-5">Add Episodes</h5>
        <div className="row">
          <div className="col">
            <label className="Creator_Name_label" for="">
              Podcast Name
            </label>
            <input
              type="text"
              class="form-control text-light"
              id="Creator_Name"
              placeholder={podcastInfo[1]}
              disabled
              onChange={handleInputChnage}
              required
            ></input>
            <label className="Creator_Name_label" for="">
              Episode Title
            </label>
            <input
            required
              type="text"
              class="form-control"
              id="Creator_Name"
              placeholder="Title"
              name="episodeTitle"
              onChange={handleInputChnage}
            ></input>
            <label className="Creator_Name_label" for="">
              Episode Count
            </label>
            <input
            id="Creator_Name"
              type="text"
              class="form-control"
              placeholder="Title"
              name="episodeCount"
              onChange={handleInputChnage}
              required
            ></input>
            
          </div>
          <div className="col">
            <label className="Creator_Name_label" for="">
              Episode Audio MP3
            </label>
            <input
              type="file"
              class="form-control"
              id="audiofile"
              placeholder=""
              name="file"
              onChange={handleInputChnage}
              required
            ></input>
          </div>
        </div>
        <button className="btn btn-light ms-3 px-5 mt-5" onClick={handleSubmit}>Upload</button>
        <button className="btn btn-secondary ms-3 px-5 mt-5" onClick={handleCancel}>Cancel</button>

      </div>
    </div>
  );
}

export default CreatorEpisodeAdd;
