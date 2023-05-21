import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    const {action} = useParams();
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
                    <input type="text" placeholder="Try to be as precise and short as possible" />
                    <h2 className="text-2xl mt-4">Address</h2>
                    <input type="text" placeholder="Address (Google Maps link Prefered"/>
                    <h2 className="text-2xl mt-4">photos</h2>
                    <p className="text-gray-500 text-sm">more = better</p>
                    <div className="flex gap-2">
                    <input type="text" placeholder="Add your photos with a link" />
                    <button className="px-4 py-2 border bg-transparent rounded-full">Add&nbsp;photo</button>
                    </div>
                    <div className="grid grid-cols-3 md:grid-4 lg:grid-cols-6">
                    <button className="p-8 border  bg-transparent  rounded-2xl mt-1">Upload from local</button>
                    </div>
                    <h2 className="text-2xl mt-4">Description</h2>
                    <p className="text-gray-500 text-sm">detailed information about the place</p>
                    <input type="text" placeholder="Try to be as brief as possible" />
                </form>
            </div>
            )
            }
        </div>
    );
};