import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="p-2 flex flex-wrap justify-center gap-20 mt-40" style={{ maxWidth: "3000px" }}>
    {places.length > 0 &&
      places.map((place) => (
        <div className="p-4 hover:shadow-xl border-2 rounded-2xl">
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
        </div>
      ))}
  </div>
  
  );
}
