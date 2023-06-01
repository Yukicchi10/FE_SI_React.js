
import React from "react";

export default function Modal({ children, open, onClose }) {
  if (!open) return null;

  const handleOnBackDropClick = (e) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  return (
    <div
      id="backdrop"
      data-cy="activity-item-delete-button"
      onClick={handleOnBackDropClick}
      className="bg-black bg-opacity-50 ease-in fixed inset-0 flex items-center justify-center"
    >
      {children}
    </div>
  );
}