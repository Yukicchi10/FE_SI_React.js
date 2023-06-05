import instance from "../instance";

const dashboard = () => instance.auth.get("/admin/dashboard");
const index = () => instance.auth.get("/admin/class");
const view = (id) => instance.auth.get(`/admin/class/${id}`);
const store = (data) => instance.auth.post(`/admin/class`, data);
const update = (id, data) => instance.auth.put(`/admin/class/${id}`, data);
const deleted = (id) => instance.auth.delete(`/admin/class/${id}`);

const apiManageClass = { dashboard, index, view, store, update, deleted };

export default apiManageClass;
