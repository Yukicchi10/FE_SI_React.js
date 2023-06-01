import React from "react";
import Modal from "./ModalBase";

export function ModalForm({ open, onClose, children, handleSubmit, isEdit, method }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div data-cy="modal-information" className="bg-white sm:w-[640px] w-[96] p-4 rounded">
        {/* <p className="text-gray-900 my-2">Data</p> */}
        {children}
        <div className="flex gap-2 mt-4 justify-end">
          <button
            data-cy="modal-delete-cancel-button"
            className="py-2 px-8 font-bold rounded cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            data-cy="activity-item-delete-button"
            type="submit"
            className="!bg-blue-500 py-2 px-8 font-bold rounded text-white cursor-pointer hover:bg-red-600"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}
