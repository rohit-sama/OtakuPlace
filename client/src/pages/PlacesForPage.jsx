import axios from "axios";
import { useState } from "react";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedphoto, setAddedphoto] = useState("");
  const [photolink, setPhotolink] = useState("");
  const [description, setDescription] = useState("");
  const [extrainfo, setExtrainfo] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data } = await axios.post("/upload-by-link", { link: photolink });
    setAddedphoto((prev) => {
      return [...prev, data];
    });
    setPhotolink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: datas } = response;
        setAddedphoto((prev) => {
          return [...prev, ...datas];
        });
      });
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedphoto,
      photolink,
      description,
      extrainfo,
    });
  }

  return (
    <div>
      <form onSubmit={addNewPlace} className="text-center">
        <h2 className="mt-8 text-2xl">Title</h2>
        <p className="text-gray-500 text-sm">
          Try to be as precise and short as possible (anime name)
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <h2 className="text-2xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">
          Address (Google Maps link Prefered)
        </p>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        <h2 className="text-2xl mt-4">photos</h2>
        <p className="text-gray-500 text-sm">more = better</p>
        <p className="text-gray-500 text-sm">Add your photos with a link</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={photolink}
            onChange={(ev) => setPhotolink(ev.target.value)}
          />

          <button
            onClick={addPhotoByLink}
            className="px-4 py-2 border bg-transparent rounded-full"
          >
            Add&nbsp;photo
          </button>
        </div>

        <div className="grid gap-2 grid-cols-3 md:grid-4 lg:grid-cols-6">
          {addedphoto.length > 0 &&
            addedphoto.map((link) => (
              <div>
                <img
                  className="rounded-2xl mt-3"
                  src={"http://localhost:4000/uploads/" + link}
                  alt=""
                />
              </div>
            ))}
          <label className="border p-8 mt-3 bg-transparent flex cursor-pointer items-center justify-center rounded-2xl ">
            Upload from local
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
          </label>
        </div>

        <h2 className="text-2xl mt-3">Description</h2>
        <p className="text-gray-500 text-sm">
          detailed information about the place
        </p>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="h-40"
        />

        <h2 className="mt-3 text-2xl">Extra Info</h2>
        <p className="text-gray-500 text-sm">
          any location bookmark (place to stay near the location) or stuff
          related to the anime
        </p>
        <input
          type="text"
          value={extrainfo}
          onChange={(ev) => setExtrainfo(ev.target.value)}
        />

        <button className="bg-primary px-10 py-2 rounded-lg mb-4">Save</button>
      </form>
    </div>
  );
}
