import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("places")
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
    <div>
      <AccountNav />

      <div className="text-center mt-8">
        <Link
          className="bg-primary gap-1 inline-flex text-white py-3 px-6 rounded-md"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          ADD NEW PLACE
        </Link>
      </div>
      <div className="p-5 mt-3">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="border cursor-pointer mt-4 p-3 flex gap-4 rounded-2xl bg-gray-200"
            >
              <div className=" shrink-0 flex justify-center items-center ">
                {place.photos.length > 0 && (
                  <img
                    className="rounded-2xl h-[200px] w-[200px] max-h"
                    src={"http://localhost:4000/uploads/" + place.photos[1]}
                    alt=""
                  />
                )}
              </div>
              <div className="grow-0 ">
                <h2 className="text-xl">{place.title} </h2>
                <h2 className="text-l m-4">
                  DESCRIPTION: {place.description} <br />
                </h2>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <h2>Shared by:- {place.ownername}</h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
