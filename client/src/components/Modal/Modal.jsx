import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from 'styled-components';

const Modal = ({ setCardData , editData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState({
    id: uuidv4(),
    todo: "",
    description: "",
    taskType: "",
  });

  useEffect(() => {
    if (editData) {
      setData(editData);
      setIsModalOpen(true);
    }
  }, [editData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDropdownSelect = (taskType) => {
    setData({ ...data, taskType });
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.todo.trim() || !data.description.trim() || !data.taskType.trim()) {
      alert("All fields must be filled!");
      return;
    }
    setCardData(data);
    
    toggleModal();
    clearForm();
  };
  
  const clearForm = () => {
    setData({
      id: uuidv4(),
      todo: "",
      description: "",
      taskType: "",
    });
  };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//         event.preventDefault();
//       handleSubmit(event);
//     }
//   };

const StyledWrapper = styled.div`
  .container {
    position: relative;
    padding: 3px;
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    border-radius: 0.9em;
    transition: all 0.4s ease;
  }

  .container::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    border-radius: 0.9em;
    z-index: -10;
    filter: blur(0);
    transition: filter 0.4s ease;
  }

  .container:hover::before {
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    filter: blur(1.2em);
  }
  .container:active::before {
    filter: blur(0.2em);
  }

  .button {
    font-size: 1rem;
    padding: 0.6em 0.8em;
    border-radius: 0.5em;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    box-shadow: 2px 2px 3px #000000b4;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
  }

  .button:hover {
    // background-color: #b029e5;
    box-shadow: 2px 2px 5px #000000b4;
  }
`;

  return (
    <div className="max-w-2xl mx-auto">
     <StyledWrapper>
      <div className="container">
        <button
          className="button"
          type="button"
          onClick={toggleModal}
        >
          {editData ? "EDIT TODO" : "ADD TODO"}
        </button>
      </div>
    </StyledWrapper>

      {isModalOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-full max-w-xl p-4 h-full md:h-auto">
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-semibold text-gray-900">
                {editData ? "Edit Todo" : "Add Todo"}
                </h1>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="pl-6 pr-6 space-y-4">
                <input
                  type="text"
                  name="todo"
                  value={data.todo}
                  onChange={handleInputChange}
                //   onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write Todo"
                />
                
                  <textarea
                    rows="4"
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                    // onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write description there..."
                  ></textarea>

                  <div className="flex justify-start items-center mt-3">
                    <button
                      type="button"
                      className="flex items-center text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 border border-gray-300"
                      onClick={toggleDropdown}
                    >
                      <span className="px-2">
                        {data.taskType || "Select Priority"}
                      </span>
                      <span className="flex items-center justify-center w-6 h-6 border-l border-gray-300">
                        <svg
                          className="w-5 h-5 ml-1 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute mt-2 z-10 bg-white divide-y divide-gray-100  rounded-lg shadow w-44">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-500">
                        <li>
                          <button
                            type="button"
                            onClick={() =>
                              handleDropdownSelect("Critical-Task")
                            }
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-red-400 dark:hover:text-white"
                          >
                            Critical-Task
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleDropdownSelect("Normal-Task")}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-yellow-300 dark:hover:text-white"
                          >
                            Normal-Task
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleDropdownSelect("Urgent-Task")}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-lime-300 dark:hover:text-white"
                          >
                            Urgent-Task
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                
                <div className="flex justify-end">
                <button
                    type="clear"
                    onClick={clearForm}
                    className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-20 px-5 py-2.5 m-4 bg-gradient-to-r from-pink-400 to-purple-700 cursor-pointer hover:bg-[#b029e5]"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-4 bg-gradient-to-r from-pink-400 to-purple-700 cursor-pointer hover:bg-[#b029e5]"
                  >
                    {editData ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
