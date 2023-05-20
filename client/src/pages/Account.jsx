import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import img from "../assets/images.jpeg"
import  axios  from "axios";

export default function Account() { 
  const [redirect, setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if(subpage == undefined) {
      subpage = 'profile';
    }

    async function Logout(){
      await axios.post('/logout');
      setRedirect('/');
      setUser(null);
    }
    if(ready && !user && !redirect) {
        return <Navigate to = {'/login'} />
    }

    

    function LinkClasses (type=null) {
      let classes = 'py-2 px-4';
      if (type === subpage ) {
      classes+= ' bg-primary text-white rounded-full';
    }
    return classes;
    }
    
    if(redirect){
      return <Navigate to = {redirect} />
    }

  return (
    <div>
   <nav className="w-full flex mt-8 justify-center gap-4">
    <Link className={LinkClasses('profile')} to ={'/account'} >My Profile</Link>
    <Link className={LinkClasses('bookings')} to ={'/account/bookings'} >My Bookings</Link>
    <Link className={LinkClasses('places')}  to ={'/account/places'} >My Accomodations</Link>
   </nav>
   {subpage === 'profile' && (
    <div className=" p-6 rounded-md mt-40 flex justify-center gap-4">
         <div><img className="rounded-md" src = {img} alt=""/></div>
         <div className="text-center mt-10">
         Logged in as <br />
         <div className="text-2xl ">
         Name : {user?.name} <br />
         Email ID : {user?.email}<br />
         </div>
         <button onClick={Logout} className="bg-primary p-2 mt-2 rounded-md">Logout</button>
         </div>
    </div>
   )}
   </div>
   
  );
}
