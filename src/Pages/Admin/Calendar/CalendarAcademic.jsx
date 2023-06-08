import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Layout } from "../Layout/Layout";
import apiManageCalendar from "../../../lib/api/admin/calendar";
import { Button, Typography } from "@mui/material";
import { CalendarForm } from "./CalendarForm";
import { ModalDelete } from "../../../Component/Modal";

const localizer = momentLocalizer(moment);

export const CalendarAcademic = () => {
  const [events, setEvents] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedData, setSelectedDat] = useState();
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        await apiManageCalendar.index().then((res) => {
          console.log(res.data.data);
          const data = res.data.data.map((v) => {
            return {
              id: v.id,
              title: v.title,
              start: new Date(v.start),
              end: new Date(v.end),
            };
          });
          setEvents(data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [reloadData]);

  const handleEventSelect = (event) => {
    const data = events.filter((v) => v.title === event.title);
    setSelectedDat(data[0]);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    await apiManageCalendar.deleted(selectedData.id);
    setReloadData(!reloadData);
    setOpenDelete(false);
  };

  return (
    <>
      <Layout>
        <div className="flex justify-between mb-4">
          <Typography variant="h4"> Kalender Akademik</Typography>
          <Button
            onClick={() => setOpenForm(true)}
            className="!bg-blue-500 p-2 rounded text-white"
          >
            Tambah
          </Button>
        </div>
        <div style={{ height: "500px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventSelect}
            style={{ margin: "50px" }}
            views={["month", "agenda"]}
          />
        </div>
      </Layout>

      <CalendarForm
        method="add"
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setReloadData(!reloadData);
          setOpenForm(false);
        }}
      />

      <ModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </>
  );
};
