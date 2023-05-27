import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function placeInfo() {
  const url = window.location.href;
  const id = url.split("/")[4];

  const [placesall, setPlacesall] = useState([]);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    axios
      .get("/allplaces")
      .then(({ data }) => {
        setPlacesall(data);
        const matchedPlace = data.find((place) => place._id === id);
        if (matchedPlace) {
          setPlace(matchedPlace);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="m-20 bg-gray-200 p-10 rounded-xl">
      {place && (
        <>
          <div className="text-center font-bold mt-2 mb-10 p-2 m-8 text-3xl">
            {place.title}
          </div>

          <div className="flex">
            {place.photos.map((photo, index) => (
              <div key={index} className="w-1/3 p-4 flex mx-auto  rounded-2xl justify-center mb-4">
                <img
                  className="object-cover shadow-xl w-[300px] h-[300px] rounded-2xl"
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
          </div>

          <h1 className="text-center font-bold mt-10 mb-5 text-3xl">
            Description:{" "}
          </h1>
          <p className="p-10  rounded-xl ">{place.description}</p>
          <h1 className="text-center font-bold mt-10 mb-5 text-3xl">
            ADDRESS
          </h1>
          <p className="p-10 rounded-xl text-xl font-serif"><Link to={place.address}>{place.address}</Link></p>
          <h1 className="text-center font-bold mt-10 mb-5 text-2xl flex justify-center items-center gap-2">
            EXTRA INFO : <p className="p-10 rounded-xl text-xl font-serif">{place.extrainfo}</p>
          </h1>
          
        </>
      )}
    </div>
  );
}
