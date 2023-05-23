import { Link } from "react-router-dom"
import { UserContext } from "./UserContext.jsx"
import { useContext } from "react";

export default function Header(){
  const {user} = useContext(UserContext);
    return (
        <header className=' flex justify-between'>
    <a href="/" className="flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
</svg>
<span className='font-bold text-xl' >OtakuPlace</span>
    </a>
    <div className='flex border border-gray-300 rounded-full py-2 px-4 gap-5 shadow-md shadow-gray-300 items-center '>
    <div>Anime Name</div>
    <div className = 'border-l border-gray-300'></div>
    <div>Place Name</div>
    <div className = 'border-l border-gray-300'></div>
    <div>Add Guest</div>
    <button className='bg-primary text-white p-2 rounded-full'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
    </button>
    </div>


    <div className='flex border border-gray-300 rounded-full py-2 px-4 gap-4 shadow-md shadow-gray-300 items-center'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
<Link to={user? "/account":"/login"} className="flex gap-2">
  <div className='bg-gray-400 p-1 rounded-full text-white'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
  </div>
  {!!user && (
      <div>
        {user.name}
      </div>
    )}
</Link>

    </div>
   </header>
    )
}