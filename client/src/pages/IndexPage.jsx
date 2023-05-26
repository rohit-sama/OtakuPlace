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
    <div className="p-5 flex flex-wrap justify-center gap-20 mt-40" style={{ maxWidth: "3000px" }}>
    {places.length > 0 &&
      places.map((place) => (
        <div className="p-4 bg-gray-100 text-center rounded-2xl">
          <div className="border cursor-pointer p-3 rounded-2xl hover:bg-gray-300 bg-gray-200 flex flex-col justify-center items-center">
            <div className="w-32 shrink-0 flex justify-center h-30">
              {place.photos.length > 0 && (
                <img
                  className="rounded-2xl"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div>
              <h2 className="text-xl mt-2 break-words">{place.title}</h2>
              <button className="p-2 bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
  
  );
}
