import React, { useState, useContext, useEffect } from "react";
import CreateTechnologies from "./Modals/CreateTechnologies";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import { AppContext } from "../../context/AppContext";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaToolbox } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import UpdateTechnologyModal from "./Modals/UpdateTechnologyModal";

const Technologies = () => {
  const { technologies, deleteTechnology, updateTechnology } = useContext(AppContext);

  const [techModal, setTechModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  const handleUpdateClick = (technology) => {
    setSelectedTechnology(technology);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedTechId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedTechId) {
      deleteTechnology(selectedTechId);
      setShowDeleteModal(false);
      setSelectedTechId(null);
    }
  };

  return (
    <>
      <div className="w-full bg-admin p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-white">Technologies</h1>
          <div
            onClick={() => setTechModal(true)}
            className="cursor-pointer bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Technology
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.length === 0 ? (
            <div className="text-center text-neutral-400 mt-12 col-span-full">
              <FaToolbox className="w-full text-4xl mb-2" />
              <p className="text-lg">No technologies added yet.</p>
            </div>
          ) : (
            technologies.map((tech) => (
              <div
                key={tech._id}
                className="bg-neutral-800 p-4 rounded-lg text-white relative shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-auto aspect-square rounded-lg overflow-hidden border border-orange-500 bg-neutral-700">
                    {tech.imageUrl ? (
                      <img
                        src={tech.imageUrl}
                        alt={tech.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-orange-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-lg font-semibold">{tech.name}</h2>
                      <p className="text-sm text-neutral-400">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleUpdateClick(tech)} 
                    className="cursor-pointer text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-400 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(tech._id)}
                    className="cursor-pointer text-red-500 hover:text-white hover:bg-red-600 border border-red-500 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Delete"
                  >
                    <RiDeleteBinFill size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {techModal && (
        <div
          className="fixed  inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={(e) => {
            e.stopPropagation();
            setTechModal(false);
          }}
        >
          <div
            className="w-[95%] sm:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateTechnologies closeModel={() => setTechModal(false)} />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showUpdateModal && selectedTechnology && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={(e) => {
            e.stopPropagation();
            setShowUpdateModal(false);
          }}
        >
          <div
            className="w-[95%] sm:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateTechnologyModal
              closeModel={() => setShowUpdateModal(false)}
              technology={selectedTechnology}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Technologies;
