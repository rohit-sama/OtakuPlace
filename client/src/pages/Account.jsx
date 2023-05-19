import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";


export default function IndexPage() { 
    const {ready,user} = useContext(UserContext);

    if(ready && !user) {
        return <Navigate to = {'/login'} />
    }

  return (
   <div>name = {user?.name}</div>
  );
}
