import instance from "../instance";

const index = () => instance.auth.get("/admin/calendar");
const store = (data) => instance.auth.post(`/admin/calendar`, data);
const update = (id, data) => instance.auth.put(`/admin/calendar/${id}`, data);
const deleted = (id) => instance.auth.delete(`/admin/calendar/${id}`);

const apiManageCalendar = { index, store, update, deleted };

export default apiManageCalendar;
