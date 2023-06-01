import instance from "../instance";

const index = () => instance.auth.get('/lecturer')
const store = (data) => instance.auth.post(`/lecturer`, data)
const update = (id, data) => instance.auth.put(`/lecturer/${id}`, data)
const deleted =(id) => instance.auth.delete(`/lecturer/${id}`)

const apiManageLecturer ={
    index,
    store,
    update,
    deleted
}

export default apiManageLecturer