import instance from "../instance";

const index = () => instance.auth.get("/dosen/calendar");

const apiDosenCalendar = { index };

export default apiDosenCalendar;
