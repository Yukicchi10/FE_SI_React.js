import React from "react";
import Modal from "./ModalBase";
import { Button } from "@mui/material";

export function ModalForm({ open, onClose, children, handleSubmit }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        data-cy="modal-information"
        className="bg-white sm:w-[640px] w-[96] p-4 rounded"
      >
        {children}
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="outlined" onClick={onClose}>
            Batal
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
