import React from "react";
import { FaEdit } from "react-icons/fa"; 

const EditButton = ({ onEdit }) => {
  return (
    <button
      type="button"
      // size={20} 
      onClick={onEdit}
      className="text-blue-400 hover:text-blue-700"
    >
      <FaEdit  />
    </button>
  );
};

export default EditButton;
