import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const ProfileInfo = () => {
  const {  profileInfo, handleUpdateProfileInfo } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    about: "",
    statistics: [
      { name: "", number: 0 },
      { name: "", number: 0 },
      { name: "", number: 0 },
    ],
    image: null,
    socials: {
      github: "",
      leetcode: "",
      instagram: "",
      linkedin: "",
      email: "",
      linktree: "",
    },
  });


  useEffect(() => {
    if (profileInfo) {
      const formattedStats =
        profileInfo.statistics?.length === 3
          ? profileInfo.statistics.map((stat) => ({
              name: stat.name || "",
              number: stat.number || 0,
            }))
          : [
              { name: "", number: 0 },
              { name: "", number: 0 },
              { name: "", number: 0 },
            ];

      setFormData({
        name: profileInfo.name || "",
        heading: profileInfo.heading || "",
        about: profileInfo.about || "",
        statistics: formattedStats,
        image: profileInfo.image || null,
        socials: {
          github: profileInfo.socials?.github || "",
          leetcode: profileInfo.socials?.leetcode || "",
          instagram: profileInfo.socials?.instagram || "",
          linkedin: profileInfo.socials?.linkedin || "",
          email: profileInfo.socials?.email || "",
          linktree: profileInfo.socials?.linktree || "",
        },
      });
    }
  }, [profileInfo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (["name", "heading", "about"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (name in formData.socials) {
      setFormData((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [name]: value,
        },
      }));
    }
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.statistics];
    newStats[index][field] = field === "number" ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, statistics: newStats }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanStats = formData.statistics.map(({ name, number }) => ({
      name,
      number,
    }));

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("heading", formData.heading);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("statistics", JSON.stringify(cleanStats));

    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    }

    formDataToSend.append("socials", JSON.stringify(formData.socials));

    handleUpdateProfileInfo(formDataToSend);
  };

  return (
    <div className="w-full bg-admin p-5 rounded-md">
      <form onSubmit={handleSubmit} className="w-full mx-auto sm:mx-0">
        <div className="flex items-start justify-between gap-6">
          <div className="w-2/3">
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-neutral-500 text-xs ml-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-neutral-500 text-xs ml-1">Heading</label>
              <textarea
                name="heading"
                rows={2}
                value={formData.heading}
                onChange={handleChange}
                placeholder="Enter heading"
                className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
              />
            </div>
          </div>

          <div className="w-1/3">
            <label className="text-neutral-500 text-xs ml-1">
              Upload Image
            </label>
            <div className="flex gap-4 items-center mt-1">
              <label
                htmlFor="image"
                className="w-44 h-52 cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-dashed border-neutral-500 rounded-lg p-4 flex items-center justify-center text-sm text-white transition"
              >
                {formData.image ? "Change Image" : "Click to Upload"}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              {formData.image && (
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Preview"
                  className="w-44 h-52 object-cover rounded-md border border-neutral-600 shadow-md"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label className="text-neutral-500 text-xs ml-1">About</label>
          <textarea
            name="about"
            rows={4}
            value={formData.about}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.statistics.map((stat, index) => (
            <div key={index} className="mb-4 w-full">
              <label className="text-neutral-500 text-xs ml-1">
                Statistic {index + 1}
              </label>
              <div className="flex gap-2 w-full">
                <input
                  value={stat.name}
                  onChange={(e) =>
                    handleStatChange(index, "name", e.target.value)
                  }
                  placeholder="Stats name"
                  className="bg-neutral-800 w-3/5 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
                />
                <select
                  value={stat.number}
                  onChange={(e) =>
                    handleStatChange(index, "number", e.target.value)
                  }
                  className="w-2/5 bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
                >
                  {Array.from({ length: 101 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full mt-4 mb-4">
          <label className="text-neutral-500 text-lg">Social Media Links</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Object.entries(formData.socials).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1 w-full">
                <label className="text-neutral-500 text-xs ml-1 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter your ${key} profile link`}
                  className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
                />
              </div>
            ))}
          </div>
        </div>

        <input
          type="submit"
          value="Save Profile"
          className="mt-5 text-white bg-orange-500 text-sm min-w-60 px-4 py-2 font-normal rounded-lg hover:bg-opacity-70 duration-300 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default ProfileInfo;
