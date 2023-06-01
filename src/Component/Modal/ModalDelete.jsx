import React from "react";
import Modal from "./ModalBase";
import { AiOutlineWarning } from "react-icons/ai";

export function ModalDelete({ open, onClose, handleDelete }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div data-cy="modal-information" className="bg-white w-96 p-5 rounded">
        <AiOutlineWarning className="mx-auto  my-8 text-red-500 text-8xl" />
        <p className="text-gray-900 my-2 text-center">
          Apakah anda yakin ingin menghapusnya?
        </p>
        <div className="flex gap-4 mt-4 mx-auto">
          <div className="mx-auto">
            <button
              data-cy="modal-delete-cancel-button"
              className="py-2 px-8 mx-2 font-bold rounded-full cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              data-cy="activity-item-delete-button"
              type="submit"
              className="!bg-red-500 py-2 px-8 mx-2 font-bold rounded-full text-white cursor-pointer hover:bg-red-600"
              onClick={handleDelete}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
