import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import img from "../assets/images.jpeg";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav";

export default function Account() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage == undefined) {
    subpage = "profile";
  }

  async function Logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className=" flex flex-wrap justify-center p-6 rounded-md mt-40 gap-4">
          <div>
            <img className="rounded-md" src={img} alt="" />
          </div>
          <div className=" mt-10">
            Logged in as <br />
            <div className="text-2xl ">
              Name : {user?.name} <br />
              Email ID : {user?.email}
              <br />
            </div>
            <button onClick={Logout} className="bg-primary p-2 mt-2 rounded-md">
              Logout
            </button>
          </div>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
