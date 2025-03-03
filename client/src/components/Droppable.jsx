import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="min-h-[150px] border p-4 rounded-md shadow-sm bg-white">
      {children}
    </div>
  );
};

export default Droppable;
