import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedphoto, setAddedphoto] = useState('');
    const [photolink, setPhotolink] = useState('');
    const [description, setDescription] = useState('');
    const [extrainfo, setExtrainfo] = useState('');

    async function addPhotoByLink (ev){
        ev.preventDefault();
       const {data} = await axios.post('/upload-by-link', {link:photolink});
       setAddedphoto(prev => {
        return [...prev, data]; 
       });
       setPhotolink('');
    };
    return(
        <div>
            {action !== 'new' &&(
                <div className="text-center mt-8">
                <Link className="bg-primary gap-1 inline-flex text-white py-3 px-6 rounded-md" to = {'/account/places/new'} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>ADD NEW PLACE</Link>

            </div>
            )}
            {action === "new" &&(
            <div>
                <form className="text-center">
                    <h2 className="mt-8 text-2xl">Title</h2>
                    <input type="text" placeholder="Try to be as precise and short as possible (anime name)" 
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}/>

                    <h2 className="text-2xl mt-4">Address</h2>
                    <input type="text" placeholder="Address (Google Maps link Prefered"
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}/>

                    <h2 className="text-2xl mt-4">photos</h2>
                    <p className="text-gray-500 text-sm">more = better</p>
                    <div className="flex gap-2">
                    <input type="text" placeholder="Add your photos with a link" 
                            value={photolink}
                            onChange={ev => setPhotolink(ev.target.value)}/>

                    <button onClick={addPhotoByLink} className="px-4 py-2 border bg-transparent rounded-full">Add&nbsp;photo</button>
                    </div>

                    <div className="grid gap-2 grid-cols-3 md:grid-4 lg:grid-cols-6">
                    {addedphoto.length > 0 && addedphoto.map(link => (
                        <div>
                            <img className="rounded-2xl mt-3" src= {"http://localhost:4000/uploads/" + link} alt="" />
                        </div>
                    ))}
                    <label className="border p-8 mt-3 bg-transparent flex items-center justify-center rounded-2xl ">Upload from local
                    <input type="file" className="hidden cursor-pointer"/></label>
                    </div>

                    <h2 className="text-2xl mt-3">Description</h2>
                    <p className="text-gray-500 text-sm">detailed information about the place</p>
                            <textarea value={description}
                            onChange={ev => setDescription(ev.target.value)} className="h-40"/>

                    <h2 className="mt-3 text-2xl">Extra Info</h2>
                    <input type="text" placeholder="any location bookmark (place to stay near the location) or stuff related to the anime"
                            value={extrainfo}
                            onChange={ev => setExtrainfo(ev.target.value)}/>

                    <button className="bg-primary px-10 py-2 rounded-lg mb-4">Save</button>
                </form>
            </div>
            )
            }
        </div>
    );
};