import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="min-h-[150px] opacity-85 p-4 rounded-xl shadow-sm bg-black">
      {children}
    </div>
  );
};

export default Droppable;
