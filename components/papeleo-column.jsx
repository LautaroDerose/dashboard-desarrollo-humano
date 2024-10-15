'use client'
import { useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { confirmDecreeDoc } from "@/actions/doc-actions/doc-contaduria-actions";

export const PapeleoCell = ({ assignmentId, initialConfirmation }) => {
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmation);

  const handleToggleConfirmation = async () => {
    try {
      await confirmDecreeDoc(assignmentId, isConfirmed);
      setIsConfirmed(!isConfirmed);
    } catch (error) {
      console.error("Error updating document confirmation:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <BsArrowRepeat />
      <button
        onClick={handleToggleConfirmation}
        className={`font-bold p-2 rounded ${isConfirmed ? 'text-green-400' : 'text-red-400'}`}
      >
        {isConfirmed ? 'Disponible' : 'En espera'}
      </button>
    </div>
  );
};