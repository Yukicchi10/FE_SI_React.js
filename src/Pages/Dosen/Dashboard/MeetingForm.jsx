import React from "react";
import { useParams } from "react-router-dom";
import apiDosenClass from "../../../lib/api/dosen/class";
import Modal from "../../../Component/Modal/ModalBase";
import { GiTeacher } from "react-icons/gi";

export function MeetingForm({ open, onClose, meetingSoon, onSuccess }) {
  const { id } = useParams();

  const onSubmit = async (data) => {
    const body = {
      id_mapel: id,
      pertemuan: meetingSoon,
    };
    try {
      const response = await apiDosenClass.addMeeting(body);
      if(response.data.success){
        onSuccess()
        onClose()
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div data-cy="modal-information" className="bg-white w-96 p-5 rounded">
        <GiTeacher className="mx-auto my-8 text-yellow-500 text-8xl" />
        <p className="text-gray-800 my-2 text-center">
          Apakah anda akan melaksanakan pertemuan ke {meetingSoon}?
        </p>
        <div className="flex gap-4 mt-4 mx-auto">
          <div className="mx-auto">
            <button
              data-cy="modal-delete-cancel-button"
              className="py-2 px-8 mx-2 font-bold rounded-full cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Tidak
            </button>
            <button
              data-cy="activity-item-delete-button"
              type="submit"
              className="!bg-yellow-500 py-2 px-8 mx-2 font-bold rounded-full text-white cursor-pointer hover:bg-red-600"
              onClick={onSubmit}
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
