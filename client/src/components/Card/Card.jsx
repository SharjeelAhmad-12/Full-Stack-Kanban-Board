import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ id, todo, description, taskType, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
  };

  const getColors = () => {
    switch (taskType) {
      case "Critical-Task":
        return { bgColor: "bg-red-200", textColor: "text-red-500" };
      case "Normal-Task":
        return { bgColor: "bg-yellow-200", textColor: "text-yellow-400" };
      case "Urgent-Task":
        return { bgColor: "bg-green-200", textColor: "text-green-400" };
      default:
        return { bgColor: "bg-gray-200", textColor: "text-gray-700" };
    }
  };

  const { bgColor, textColor } = getColors();

  return (
    <div ref={setNodeRef} style={style} className={`p-4 rounded-xl bg-[#22272B] shadow-md w-auto group relative ${bgColor}`}  aria-grabbed="true">
      <div className="flex justify-between items-start">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing w-full">
          <h2 className={`text-lg font-semibold ${textColor} break-words`}>
            {todo}
          </h2>
          <p className="text-sm text-gray-700 break-words">{description}</p>
        </div>
        <div className="flex space-x-1 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <EditButton onEdit={onEdit} />
          <DeleteButton onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default Card;

