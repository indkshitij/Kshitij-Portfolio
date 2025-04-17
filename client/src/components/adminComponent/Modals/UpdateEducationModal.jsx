import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const UpdateEducationModal = ({ closeModal, educationData }) => {
  const { months, updateEducation } = useContext(AppContext);
  const years = Array.from({ length: 50 }, (_, i) => 2000 + i);

  const [education, setEducation] = useState({
    degreeName: "",
    fieldOfStudy: "",
    instituteName: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    isPresent: false,
  });

  useEffect(() => {
    if (educationData) {
      const [startMonth, startYear] = educationData.startDate?.split(" ") || [];
      const [endMonth, endYear] = educationData.endDate?.split(" ") || [];

      setEducation({
        degreeName: educationData.degreeName || "",
        fieldOfStudy: educationData.fieldOfStudy || "",
        instituteName: educationData.instituteName || "",
        description: educationData.description || "",
        startMonth: startMonth || "",
        startYear: startYear || "",
        endMonth: endMonth || "",
        endYear: endYear || "",
        isPresent: educationData.isPresent || false,
      });
    }
  }, [educationData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      degreeName,
      fieldOfStudy,
      instituteName,
      description,
      startMonth,
      startYear,
      endMonth,
      endYear,
      isPresent,
    } = education;

    const startDate = `${startMonth} ${startYear}`;
    const endDate = isPresent ? "" : `${endMonth} ${endYear}`;

    updateEducation(
      educationData._id,
      degreeName,
      fieldOfStudy,
      instituteName,
      description,
      startDate,
      endDate,
      isPresent
    );

    closeModal();
  };

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-xl w-full h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Update Education</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-neutral-400">Degree Name</label>
          <input
            type="text"
            name="degreeName"
            value={education.degreeName}
            onChange={handleChange}
            placeholder="e.g. Bachelor of Technology"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            value={education.fieldOfStudy}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Institute Name</label>
          <input
            type="text"
            name="instituteName"
            value={education.instituteName}
            onChange={handleChange}
            placeholder="e.g. RGPV University"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Description</label>
          <textarea
            name="description"
            value={education.description}
            onChange={handleChange}
            placeholder="Write something about your education"
            className="w-full bg-neutral-800 p-3 rounded-md mt-1 text-sm outline-none"
            rows={3}
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm text-neutral-400">Start Month</label>
            <select
              name="startMonth"
              value={education.startMonth}
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
              value={education.startYear}
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

        {!education.isPresent && (
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-neutral-400">End Month</label>
              <select
                name="endMonth"
                value={education.endMonth}
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
                value={education.endYear}
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
            checked={education.isPresent}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Currently Studying</label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="cursor-pointer text-sm px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer text-sm px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEducationModal;
