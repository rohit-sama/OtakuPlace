import { Link, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesForPage";
import AccountNav from "../AccountNav";

export default function PlacesPage() {


  return (
    <div>
        <AccountNav/>
     
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
    
    </div>
  );
}
