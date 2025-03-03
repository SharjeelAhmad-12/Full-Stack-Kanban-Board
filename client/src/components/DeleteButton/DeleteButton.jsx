import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteButton = ({ onDelete }) => {
  return (
    <MdDelete
      size={18} 
      className="text-red-400 cursor-pointer hover:text-red-600"
      onClick={onDelete}
    />
  );
};

export default DeleteButton;
