import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

const UpdateTechnologyModal = ({ closeModel, technology }) => {
  const { updateTechnology } = useContext(AppContext);

  const [techData, setTechData] = useState({
    name: "",
    description: "",
    image: null,
    preview: null,
  });

  useEffect(() => {
    if (technology) {
      setTechData({
        name: technology.name || "",
        description: technology.description || "",
        image: null,
        preview: technology.imageUrl || null, 
      });
    }
  }, [technology]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setTechData({
        ...techData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    } else {
      setTechData({ ...techData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", techData.name);
    formData.append("description", techData.description);
    if (techData.image) {
      formData.append("image", techData.image);
    }

    await updateTechnology(technology._id, formData); 
  };

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-xl w-full h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Update Technology</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        <div className="mb-4">
          <label className="text-sm text-neutral-400">Technology Name</label>
          <input
            name="name"
            value={techData.name}
            onChange={handleChange}
            placeholder="e.g. React"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-neutral-400">Description</label>
          <input
            name="description"
            value={techData.description}
            onChange={handleChange}
            placeholder="Write something about this technology"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-neutral-400">Update Logo</label>
          <div className="flex gap-4 items-center mt-1">
            <label
              htmlFor="update-image"
              className="h-28 w-28 cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-dashed border-neutral-500 rounded-lg p-4 flex items-center text-center justify-center text-sm text-white transition"
            >
              {techData.image ? "Change Logo" : "Click to Upload"}
              <input
                id="update-image"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {techData.preview && (
              <img
                src={techData.preview}
                alt="Preview"
                className="h-28 w-28 object-contain rounded-md border border-neutral-600 shadow-md"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModel}
            className="cursor-pointer text-sm px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer text-sm px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 transition"
          >
            Update Technology
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTechnologyModal;
