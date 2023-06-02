import instance from "../instance";

const store = (data) => instance.auth.post(`/students`, data)
const update = (id, data) => instance.auth.put(`/students/${id}`, data)
const deleted =(id) => instance.auth.delete(`/students/${id}`)

const apiManageStudent ={
    store,
    update,
    deleted
}

export default apiManageStudent