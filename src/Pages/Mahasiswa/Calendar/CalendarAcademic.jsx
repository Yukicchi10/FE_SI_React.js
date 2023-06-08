import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Layout } from "../Layout/Layout";
import { Typography } from "@mui/material";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";

const localizer = momentLocalizer(moment);

export const CalendarAcademicStudent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await apiMahasiswaClass.calendar().then((res) => {
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
  }, []);

  return (
    <>
      <Layout>
          <Typography variant="h4"> Kalender Akademik</Typography>
        <div style={{ height: "500px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "50px" }}
            views={["month", "agenda"]}
          />
        </div>
      </Layout>
    </>
  );
};
