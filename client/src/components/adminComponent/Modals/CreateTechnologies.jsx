import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const CreateTechnologies = ({ closeModel }) => {
  const { handleCreateTechnology } = useContext(AppContext);

  const [technologies, setTechnologies] = useState([
    { name: "", description: "", image: null, preview: null },
  ]);

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedTech = [...technologies];

    if (name === "image") {
      const file = files[0];
      updatedTech[index].image = file;
      updatedTech[index].preview = URL.createObjectURL(file);
    } else {
      updatedTech[index][name] = value;
    }

    setTechnologies(updatedTech);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tech = technologies[0];

    const formData = new FormData();
    formData.append("name", tech.name);
    formData.append("description", tech.description);
    formData.append("image", tech.image);

    handleCreateTechnology(formData);
    closeModel();
  };

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-xl w-full h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Add Technology</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        {technologies.map((tech, index) => (
          <div key={index}>
     
            <div className="mb-4">
              <label className="text-sm text-neutral-400">
                Technology Name
              </label>
              <input
                name="name"
                value={tech.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g. React"
                className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-neutral-400">Description</label>
              <input
                name="description"
                value={tech.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Write something about this technology"
                className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-neutral-400">Upload Logo</label>
              <div className="flex gap-4 items-center mt-1">
                <label
                  htmlFor={`image-${index}`}
                  className="h-28 w-28 cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-dashed border-neutral-500 rounded-lg p-4 flex items-center text-center justify-center text-sm text-white transition"
                >
                  {tech.image ? "Change Logo" : "Click to Upload"}
                  <input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(e) => handleChange(index, e)}
                    className="hidden"
                    required={!tech.image}
                  />
                </label>

                {tech.preview && (
                  <img
                    src={tech.preview}
                    alt="Preview"
                    className="h-28 w-28 object-contain rounded-md border border-neutral-600 shadow-md"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

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
            Save Technology
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTechnologies;
