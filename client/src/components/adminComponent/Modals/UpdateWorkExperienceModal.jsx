import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const UpdateWorkExperienceModal = ({ closeModel, experienceData }) => {
  const { months, updateExperience } = useContext(AppContext);
  const years = Array.from({ length: 50 }, (_, i) => 2000 + i);

  const [experience, setExperience] = useState({
    jobTitle: "",
    companyName: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    isPresent: false,
  });

  useEffect(() => {
    if (experienceData) {
      const [startMonth, startYear] = experienceData.startDate?.split(" ") || ["", ""];
      const [endMonth, endYear] = experienceData.endDate?.split(" ") || ["", ""];
      setExperience({
        jobTitle: experienceData.jobTitle || "",
        companyName: experienceData.companyName || "",
        description: experienceData.description || "",
        startMonth,
        startYear,
        endMonth,
        endYear,
        isPresent: experienceData.isPresent || false,
      });
    }
  }, [experienceData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      jobTitle,
      companyName,
      description,
      startMonth,
      startYear,
      endMonth,
      endYear,
      isPresent,
    } = experience;

    const startDate = `${startMonth} ${startYear}`;
    const endDate = isPresent ? "" : `${endMonth} ${endYear}`;

    await updateExperience(
      experienceData._id,
      jobTitle,
      companyName,
      description,
      startDate,
      endDate,
      isPresent
    );

    closeModel();
  };


  return (
    <div className="bg-neutral-900 text-white p-6 rounded-xl w-full h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Update Work Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div>
          <label className="text-sm text-neutral-400">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={experience.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Software Developer"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={experience.companyName}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Description</label>
          <textarea
            name="description"
            value={experience.description}
            onChange={handleChange}
            placeholder="Describe your role and achievements"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            rows={3}
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm text-neutral-400">Start Month</label>
            <select
              name="startMonth"
              value={experience.startMonth}
              onChange={handleChange}
              className="w-full bg-neutral-800 p-2 rounded-md mt-1 text-sm"
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm text-neutral-400">Start Year</label>
            <select
              name="startYear"
              value={experience.startYear}
              onChange={handleChange}
              className="w-full bg-neutral-800 p-2 rounded-md mt-1 text-sm"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!experience.isPresent && (
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-neutral-400">End Month</label>
              <select
                name="endMonth"
                value={experience.endMonth}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md mt-1 text-sm"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm text-neutral-400">End Year</label>
              <select
                name="endYear"
                value={experience.endYear}
                onChange={handleChange}
                className="w-full bg-neutral-800 p-2 rounded-md mt-1 text-sm"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPresent"
            checked={experience.isPresent}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Currently Working</label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModel}
            className="text-sm px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer text-sm px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorkExperienceModal;
