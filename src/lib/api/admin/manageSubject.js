import instance from "../instance";

const store = (data) => instance.auth.post(`/admin/mapel`, data)
const update = (id, data) => instance.auth.put(`/admin/mapel/${id}`, data)
const deleted =(id) => instance.auth.delete(`/admin/mapel/${id}`)

const apiManageSubject ={
    store,
    update,
    deleted
}

export default apiManageSubject