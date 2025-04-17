import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const CreateProject = ({ closeModel }) => {
  const { handleCreateProject } = useContext(AppContext);
  const [project, setProject] = useState({
    name: "",
    description: "",
    projectLink: "",
    githubLink: "",
    inDepthDetail: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProject({ ...project, [name]: files[0] });
    } else {
      setProject({ ...project, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, projectLink, githubLink, inDepthDetail, image } =
      project;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("projectLink", projectLink);
    formData.append("githubLink", githubLink); 
    formData.append("inDepthDetail", inDepthDetail);
    formData.append("image", image);

    await handleCreateProject(formData);
    closeModel();
  };

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-xl w-full h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Add Project</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        <div className="">
          <div className="mb-4">
            <label className="text-sm text-neutral-400">Project Name</label>
            <input
              name="name"
              value={project.name}
              onChange={handleChange}
              placeholder="e.g. Portfolio Website"
              className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-neutral-400">Description</label>
            <textarea
              name="description"
              rows={3}
              value={project.description}
              onChange={handleChange}
              placeholder="Write something about the project"
              className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="text-sm text-neutral-400">Project Link</label>
            <input
              type="url"
              name="projectLink"
              value={project.projectLink}
              onChange={handleChange}
              placeholder="e.g. https://github.com/your-project"
              className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-neutral-400">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              value={project.githubLink}
              onChange={handleChange}
              placeholder="e.g. https://github.com/your-repository"
              className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-neutral-400">In-depth Detail</label>
            <textarea
              name="inDepthDetail"
              rows={4}
              value={project.inDepthDetail}
              onChange={handleChange}
              placeholder="Detailed explanation of the project"
              className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="text-sm text-neutral-400">Upload Image</label>
            <div className="flex gap-4 items-center mt-1">
              <label
                htmlFor="image"
                className="h-36 w-36 cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-dashed border-neutral-500 rounded-lg p-4 flex items-center justify-center text-sm text-white transition"
              >
                {project.image ? "Change Image" : "Click to Upload"}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              {project.image && (
                <img
                  src={URL.createObjectURL(project.image)}
                  alt="Preview"
                  className="h-36 w-36 object-cover rounded-md border border-neutral-600 shadow-md"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
