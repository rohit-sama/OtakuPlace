import { Link } from "react-router-dom";

export default function AccountNav() {
  function LinkClasses(type = null) {
    let classes = "py-2 px-4";
    if (type === false) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  return (
    <nav className="w-full flex mt-8 justify-center gap-4">
      <Link className={LinkClasses("profile")} to={"/account"}>
        My Profile
      </Link>
      <Link className={LinkClasses("saved")} to={"/account/saved"}>
        Saved Places
      </Link>
      <Link className={LinkClasses("places")} to={"/account/places"}>
        Your Places
      </Link>
    </nav>
  );
}
