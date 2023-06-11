import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import { useParams } from "react-router-dom";
import Avatar from "../../../Component/Avatar";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { Button, TextField } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { ModalDelete } from "../../../Component/Modal";
import apiDosenClass from "../../../lib/api/dosen/class";

function DosenDiscussionPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [reloadData, setReloadData] = useState(false);
  const [reply, setReply] = useState("");
  const [selectedData, setSelectedData] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await apiDosenClass
        .detailThread(id)
        .then((res) => setData(res.data.data));
    };
    getData();
  }, [reloadData]);

  const date = new Date(data?.created_at);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString("id-ID", options);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  const handleLike = async (idThread) => {
    const body = {
      id_thread: idThread,
      id_mapel: id,
    };
    await apiDosenClass
      .likeThread(body)
      .then(() => setReloadData(!reloadData));
  };
  const handleSendReply = async () => {
    const body = {
      id_thread: id,
      content: reply,
    };

    try {
      await apiDosenClass.createReplies(body).then(() => {
        setReply("");
        setReloadData(!reloadData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiDosenClass.deleteReplies(selectedData.id).then(() => {
        setReloadData(!reloadData);
        setOpenDelete(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="w-full p-4 mt-4 rounded overflow-hidden shadow-lg">
        <div className="flex gap-2 items-center">
          <Avatar name={data?.name} />
          <div className="flex flex-col">
            <div className="font-bold">{data?.name}</div>
            <div className="text-gray-500 text-sm">{formattedDateTime}</div>
          </div>
        </div>
        <p className="mt-2 text-gray-800">{data?.content}</p>
        <div className="flex justify-between gap-1 items-center">
          <div className="flex items-center gap-2">
            {data?.isLike ? (
              <AiFillLike
                onClick={() => handleLike(data?.id)}
                className="cursor-pointer text-lg text-blue-500"
              />
            ) : (
              <AiOutlineLike
                onClick={() => handleLike(data?.id)}
                className="cursor-pointer text-lg"
              />
            )}
            {data?.likes}

            <AiOutlineComment />

            {data?.replies?.length}
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-4">
        <TextField
          label="Beri Komentar"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-white"
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            className="mt-2"
            disabled={!reply}
            onClick={handleSendReply}
          >
            Kirim
          </Button>
        </div>
      </div>
      <div>
        {data?.replies?.map((row) => {
          const dateC = new Date(row.created_at);

          const optionsC = {
            day: "numeric",
            month: "long",
            year: "numeric",
          };

          const formattedTimeC = dateC.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const formattedDateC = date.toLocaleDateString("id-ID", optionsC);
          const formattedDateTimeC = `${formattedDateC} ${formattedTimeC}`;
          return (
            <div className="flex justify-between items-end w-full px-4 pt-4 mt-4 rounded-lg overflow-hidden bg-gray-200">
              <div>
                <div className="flex gap-2 items-center">
                  <Avatar name={row.name} />
                  <div className="flex flex-col">
                    <div className="font-bold">{row.name}</div>
                    <div className="text-gray-500 text-sm">
                      {formattedDateTimeC}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{row.content}</p>
              </div>
              {row.isMe && (
                <FaTrashAlt
                  onClick={() => {
                    setSelectedData(row);
                    setOpenDelete(true);
                  }}
                  className="text-gray-700 cursor-pointer mb-4"
                />
              )}
            </div>
          );
        })}
      </div>

      <ModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </Layout>
  );
}

export default DosenDiscussionPage
