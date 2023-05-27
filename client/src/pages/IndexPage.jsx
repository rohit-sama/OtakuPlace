import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("/allplaces")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-200 -m-4 mb-20">
    <LandingPage/>
    <div className="text-center">
    <h1 className="mt-20 -mb-20 text-3xl">HOMEPAGE</h1>
    <div className="m-40 flex flex-wrap justify-center gap-20" style={{ maxWidth: "3000px" }}>
    {places.length > 0 &&
      places.map((place) => (
        <Link to={"/places/" + place._id} className="p-4 hover:shadow-2xl shadow-lg border-2 rounded-2xl">
          <div className="cursor-pointer p-3 max-w-xl bg-gray-100 rounded-2xl flex justify-center items-center">
          <div className="w-36 h-36">
            {place.photos.length > 0 && (
              <img
                className="object-cover w-full h-full rounded-2xl"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
          </div>
            <div>
              <h2 className="text-xl m-5 ml-7 break-words">{place.title}</h2>
              <div className="m-2 flex gap-3 justify-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6  h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
              <p className="font-bold">Shared by: {place.ownername} </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
  </div>
  <div className='flex flex-col -mb-20 bg-white '>
    <div className="gap-6 text-2xl mt-10 mb-5">
    FOLLOW ME ON MY SOCIALS
    </div>
    
    <div className="gap-6 flex justify-center  text-2xl">
    
    <a href="https://twitter.com/Rohitstwts" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.instagram.com/rohit_singh_298/" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://github.com/Rohit9804" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/rohit-singh-538a87249/" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://discord.com/" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </div>
  </div>
  </div>
  </div>
  );
}
